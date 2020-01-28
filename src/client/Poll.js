import React from 'react';
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import LoadingPage from '../common/LoadingPage';
import Config from '../Config';
import AnswerInput from "../common/AnswerInput";

class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: null,
      loadingPoll: true,
      answers: null,
      savingResponse: false,
      savedResponse: false,
    };

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.saveResponse = this.saveResponse.bind(this);
  }

  componentDidMount() {
    const token = this.props.match.params.token;
    const url = Config.apiUrl + '/polls/' + token;

    axios.get(url)
      .then(response => {
        const poll = response.data;
        const answers = poll.questions.map(question => this.createAnswerFor(question));

        this.setState({
          poll: poll,
          answers: answers,
          loadingPoll: false
        });
      })
      .catch(error => {
        this.setState({
          loadingPoll: false
        });
      });
  }

  createAnswerFor(question) {
    const answer = {
      question_id: question.id,
    };

    const questionType = question.specialized_question_type;

    if (questionType === 'freeResponse') {
      answer.value = '';
    }

    if (questionType === 'multipleChoice') {
      answer.other = '';

      if (question.specialized_question.only_one_answer_allowed) {
        answer.value = '';
      } else {
        answer.value = [];
      }
    }

    return answer;
  }

  handleAnswerChange(changedAnswer) {
    const answers = this.state.answers.map(answer => answer.question_id === changedAnswer.question_id ? changedAnswer : answer);
    this.setState({
      answers
    });
  }

  saveResponse(e) {
    e.preventDefault();

    this.setState({
      savingResponse: true
    });

    const url = Config.apiUrl + '/responses';
    const data = {
      poll_access_token: this.state.poll.access_token,
      answers: this.state.answers
    };

    axios.post(url, data)
      .then(response => {
        this.setState({
          savingResponse: false,
          savedResponse: true
        });
      })
      .catch(error => {
        alert('Something went wrong');
        this.setState({
          savingResponse: false,
        });
      });
  }

  getPageContent() {
    if (!this.state.poll) {
      return <h1>Poll not found</h1>
    }

    if (this.state.savedResponse) {
      return (
        <>
          <h1>{this.state.poll.name}</h1>
          <Alert variant="success" className="mt-4">
            Your response was saved!
          </Alert>
        </>
      );
    }

    return (
      <>
        <h1>{this.state.poll.name}</h1>
        <Form onSubmit={this.saveResponse}>
          {this.renderAnswerInputs()}
          <hr className="mt-5 mb-4" />
          <div className="text-right mb-4">
            <Button
              variant="primary"
              type="submit"
              disabled={this.state.savingResponse}>
              Save response
            </Button>
          </div>
        </Form>
      </>
    );
  }

  renderAnswerInputs() {
    return this.state.answers.map((answer, index) => {
      const question = this.state.poll.questions[index];

      return (
          <div key={question.id} className="mt-4">
            <h5>{question.text}</h5>
            <AnswerInput
                answer={answer}
                question={question}
                onAnswerChange={this.handleAnswerChange} />
          </div>
      );
    });
  }

  render() {
    if (this.state.loadingPoll) {
      return <LoadingPage />
    }

    return (
      <Container className="mt-5">
        <Row>
          <Col xl={{span: 10, offset: 1}}>
            <Row>
              <Col xl={{span: 6, offset: 3}}>
                {this.getPageContent()}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Poll);