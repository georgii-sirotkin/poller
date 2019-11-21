import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import Config from '../Config';

class Poll extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      poll: null,
      loadingPoll: true,
    };
  }

  componentDidMount() {
    const url = Config.apiUrl + '/admin/polls/' + this.props.match.params.id;

    axios.get(url, {withCredentials: true})
      .then(response => {
        this.setState({
          poll: response.data,
          loadingPoll: false
        });
      })
      .catch(error => {
        alert('Something went wrong');

        this.setState({
          loadingPoll: false
        });
      });
  }

  renderResponses() {
    return this.state.poll.responses.map((response) => {
      return (
        <div key={response.id} className="mt-4">
          <h5>Response #{response.id}</h5>
          {this.renderAnswers(response.answers)}
        </div>
      );
    });
  }

  renderAnswers(answers) {
    return answers.map(answer => {
      return (
        <div key={answer.id} className="mt-3">
          <div><strong>{answer.question.text}</strong></div>
          <div className="lead">{answer.text}</div>
        </div>
      )
    })
  }

  render() {
    if (this.state.loadingPoll) {
      return <div>Loading...</div>
    }

    if (this.state.poll) {
      const poll = this.state.poll;
      const shareableUrl = window.location.protocol + '//' + window.location.host + '/polls/' + poll.access_token;

      return (
        <div className="mb-4">
          <h1>{poll.name}</h1>
          <strong>Shareable link:</strong> {shareableUrl}
          <h3 className="mt-4">Responses:</h3>
          {this.renderResponses()}
        </div>
      )
    }
  }
}

export default withRouter(Poll);

