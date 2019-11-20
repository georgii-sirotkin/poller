import React from 'react';
import QuestionBuilder from './QuestionBuilder';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import nanoid from 'nanoid';
import Config from '../Config';
import axios from 'axios';

export default class AddPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      questions: [this.createNewQuestion()],
      createdPoll: null,
      savingPoll: false
    };

    this.addQuestion = this.addQuestion.bind(this);
    this.handlePollNameChange = this.handlePollNameChange.bind(this);
    this.createPoll = this.createPoll.bind(this);
  }

  createNewQuestion() {
    const question = {
      id: nanoid(),
      type: 'radio',
      text: ''
    };

    question.data = this.getInitialDataForQuestion(question);
    return question;
  }

  handlePollNameChange(e) {
    this.setState({name: e.target.value});
  }

  handleQuestionTextChange(id, text) {
    const questions = this.state.questions.map(question => (question.id === id) ? {...question, text} : question);
    this.setState({questions});
  }

  handleQuestionTypeChange(id, type) {
    const questions = this.state.questions.map(question => {
      if (question.id !== id) {
        return question;
      }

      const changedQuestion = {...question, type};
      changedQuestion.data = this.getInitialDataForQuestion(changedQuestion);
      return changedQuestion;
    });

    this.setState({questions});
  }

  handleQuestionDataChange(id, data) {
    const questions = this.state.questions.map(question => (question.id === id) ? {...question, data} : question);
    this.setState({questions});
  }

  getInitialDataForQuestion(question) {
    if (question.type === 'radio' || question.type === 'checkbox') {
      if (question.data && question.data.options) {
        return question.data;
      }

      return {
        options: [{
          id: nanoid(),
          text: 'Option 1'
        }]
      }
    }

    return {};
  }

  addQuestion() {
    this.setState({
      questions: this.state.questions.concat(this.createNewQuestion())
    });
  }

  removeQuestion(id) {
    const questions = this.state.questions.filter(question => question.id !== id);
    this.setState({questions});
  }

  createPoll(e) {
    e.preventDefault();
    this.setState({
      savingPoll: true
    });

    const url = Config.apiUrl + '/admin/polls';
    const data = {
      name: this.state.name,
      questions: this.state.questions
    };

    axios.post(url, data, {withCredentials: true})
        .then(response => {
          this.setState({
            createdPoll: response.data,
            savingPoll: false
          });
        })
        .catch(error => {
          this.setState({
            savingPoll: false
          });

          if (error.response.status === 422) {
            alert('Invalid data');
            return;
          }

          if (error.response.status === 401) {
            alert('Session expired');
            window.location.reload(false);
            return;
          }

          alert('Something went wrong');
        })
  }

  getPageContent() {
    if (this.state.createdPoll) {
      const url = window.location.protocol + '//' + window.location.host + '/polls/' + this.state.createdPoll.access_token;

      return (
          <Alert variant="success" className="mt-4">
            Poll was successfully created! Shareable link: {url}<br />
          </Alert>
      );
    }

    return (
      <Form onSubmit={this.createPoll}>
        <div className="row">
          <div className="col-lg-7">
            <div className="mt-3 mb-4">
              <Form.Control
                  size="lg"
                  type="text"
                  value={this.state.name}
                  onChange={this.handlePollNameChange}
                  placeholder="Poll name"
                  required />
            </div>
            {this.renderQuestions()}
            <div>
              <Button variant="outline-primary" onClick={this.addQuestion}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus align-text-top"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add question</Button>
            </div>
            <hr className="mt-5 mb-4" />
            <div className="text-right mb-3">
              <Button type="submit" variant="outline-primary" size="lg" disabled={this.state.savingPoll}>
                Save poll
              </Button>
            </div>
          </div>
        </div>
      </Form>
    )
  }

  renderQuestions() {
    return this.state.questions.map(question => {
      return (
          <QuestionBuilder
              question={question}
              key={question.id}
              onTextChange={(e) => this.handleQuestionTextChange(question.id, e.target.value)}
              onTypeChange={(e) => this.handleQuestionTypeChange(question.id, e.target.value)}
              onDataChange={(data) => this.handleQuestionDataChange(question.id, data)}
              onRemove={() => this.removeQuestion(question.id)}/>
      );
    });
  }

  render() {
    return (
      <>
        <h1 className="h2">New Poll</h1>
        {this.getPageContent()}
      </>
    )
  }
}
