import React from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";
import axios from 'axios';
import Config from '../Config';

class Polls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polls: null,
      loadingPolls: true,
    };
  }

  componentDidMount() {
    const url = Config.apiUrl + '/admin/polls';

    axios.get(url, {withCredentials: true})
        .then(response => {
          this.setState({
            polls: response.data,
            loadingPolls: false
          });
        })
        .catch(error => {
          alert('Something went wrong');

          this.setState({
            loadingPolls: false
          });
        });
  }

  renderPolls() {
    return this.state.polls.map(poll => {
      const linkText = '#' + poll.id + ' ' + poll.name + ' (' + poll.responses_count + ' responses)';

      return (
        <div key={poll.id}>
          <Link to={`${this.props.match.url}/${poll.id}`} className="lead">
            {linkText}
          </Link>
        </div>
      )
    });
  }

  render() {
    if (this.state.loadingPolls) {
      return <div>Loading...</div>
    }

    if (!this.state.polls) {
      return <div>Failed to load polls.</div>
    }

    if (!this.state.polls.length) {
      return <div>No polls created yet.</div>
    }

    return (
      <>
        {this.renderPolls()}
      </>
    );
  }
}

export default withRouter(Polls);