import React from 'react';
import axios from 'axios';
import LoadingPage from '../common/LoadingPage';
import Polls from './Polls';
import Poll from './Poll';
import AddPoll from './AddPoll';
import Config from '../Config';
import {
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
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

    this.logOut = this.logOut.bind(this);
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

  logOut() {
    const url = Config.apiUrl + '/auth/logout';
    axios.get(url, {withCredentials: true});

    this.setState({
      isLoggedIn: false,
      user: null
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <LoadingPage />
    }

    if (!this.state.isLoggedIn) {
      return (
        <Redirect
            to='/login'
        />
      )
    }

    return (
      <>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <Link to={`${this.props.match.url}`} className="navbar-brand col-sm-3 col-md-2 mr-0">Dashboard</Link>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <button className="nav-link btn btn-link" onClick={this.logOut}>Sign out</button>
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <NavLink to={`${this.props.match.url}/polls`} className="nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                      Polls
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={`${this.props.match.url}/create-poll`} className="nav-link">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                      New Poll
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Switch>
                <Route path={`${this.props.match.path}/create-poll`}>
                  <AddPoll />
                </Route>
                <Route path={`${this.props.match.path}/polls/:id`}>
                  <Poll />
                </Route>
                <Route path={`${this.props.match.path}/polls`}>
                  <Polls />
                </Route>
              </Switch>
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Admin);