import React from 'react';
import QuestionBuilder from './QuestionBuilder';
import Button from 'react-bootstrap/Button';
import nanoid from 'nanoid';

export default class AddPoll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [this.createNewQuestion()]
    };

    this.addQuestion = this.addQuestion.bind(this);
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

  render() {
    const questions = this.state.questions.map(question => {
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

    return (
        <>
          <h1 className="h2">New Poll</h1>
          <div className="row">
            <div className="col-lg-7">
              {questions}
            </div>
          </div>
          <div>
            <Button variant="outline-primary" onClick={this.addQuestion}>Add question</Button>
          </div>
        </>
    )
  }
}
