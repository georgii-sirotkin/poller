import React from 'react';
import Home from './Home';
import Poll from './Poll';
import {
  Switch,
  Route
} from "react-router-dom";

export default function Client() {
  return (
      <Switch>
        <Route path="/polls/:token">
          <Poll />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
  )
}