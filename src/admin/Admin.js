import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingPage from '../common/LoadingPage';
import Login from './Login';
import Dashboard from './Dashboard';
import Config from '../Config';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const match = useRouteMatch();

  useEffect(() => {
    const url = Config.apiUrl + '/auth/me';

    axios.get(url, { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });

  }, []);

  function handleLogIn(user) {
    setUser(user);
  }

  function handleLogOut() {
    setUser(null);
  }

  if (isLoading) {
    return <LoadingPage />
  }

  const isLoggedIn = !!user;

  return (
    <Switch>
      <Route path={`${match.url}/login`}>
        <Login onLogIn={handleLogIn} isLoggedIn={isLoggedIn} />
      </Route>
      <Route path={`${match.url}/dashboard`}>
        <Dashboard onLogOut={handleLogOut} isLoggedIn={isLoggedIn} />
      </Route>
    </Switch>
  );
}
