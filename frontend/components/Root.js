import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Home from './Home';
import SignIn from '../containers/SignIn';
import Register from '../containers/Register';
import Profile from '../containers/Profile';
import Problem from '../containers/Problem';

const Root = () => (
  // Workaround for bug in hot loader and Router: https://github.com/ReactTraining/react-router/issues/2704#issuecomment-253716411
  <Router key={new Date()} history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/sign_in" component={SignIn} />
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} />
    <Route path="/Problem" component={Problem} />
  </Router>
);

export default Root;
