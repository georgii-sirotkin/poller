import React from 'react';
import axios from 'axios';
import LoadingPage from '../common/LoadingPage';
import Login from './Login';
import Dashboard from './Dashboard';
import Config from '../Config';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isLoaded: false,
      user: null
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    const url = Config.apiUrl + '/auth/me';

    axios.get(url, {withCredentials: true})
      .then(response => {
        this.setState({
          isLoggedIn: true,
          isLoaded: true,
          user: response.data
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true
        });
      });
  }

  handleLogIn(user) {
    this.setState({
      user: user,
      isLoggedIn: true
    })
  }

  handleLogOut() {
    this.setState({
      isLoggedIn: false,
      user: null
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <LoadingPage />
    }

    return (
      <Switch>
        <Route path={`${this.props.match.url}/login`}>
          <Login onLogIn={this.handleLogIn} isLoggedIn={this.state.isLoggedIn} />
        </Route>
        <Route path={`${this.props.match.url}/dashboard`}>
          <Dashboard onLogOut={this.handleLogOut} isLoggedIn={this.state.isLoggedIn} />
        </Route>
      </Switch>
    )
  }
}

export default withRouter(Admin);