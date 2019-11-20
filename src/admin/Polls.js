import React from 'react';
import axios from 'axios';
import {
  Link,
  withRouter,
  Route
} from "react-router-dom";
import Config from '../Config';
import Poll from './Poll';

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
    if (this.state.loadingPolls) {
      return <div>Loading...</div>
    }

    if (!this.state.polls) {
      return <div>Failed to load polls.</div>
    }

    if (!this.state.polls.length) {
      return <div>No polls created yet.</div>
    }

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
    const path = this.props.match.path;

    return (
      <>
        <Route exact path={path}>
          {this.renderPolls()}
        </Route>
        <Route path={`${path}/:id`}>
          <Poll />
        </Route>
      </>
    );
  }
}

export default withRouter(Polls);