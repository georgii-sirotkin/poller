import React from 'react';
import Client from './client/Client';
import Login from './admin/Login';
import Admin from './admin/Admin';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Client />
        </Route>
      </Switch>
    </Router>
  );
}
