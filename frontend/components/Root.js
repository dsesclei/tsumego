import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Home from './Home';
import SignIn from '../containers/SignIn';
import Profile from '../containers/Profile';

const Root = () => {
  return (
    // Workaround for bug in hot loader and Router: https://github.com/ReactTraining/react-router/issues/2704#issuecomment-253716411
    <Router key={new Date()} history={hashHistory}>
      <Route path="/" component={Home} />
      <Route path="/sign_in" component={SignIn} />
      <Route path="/profile" component={Profile} />
    </Router>
  );
};

export default Root;
