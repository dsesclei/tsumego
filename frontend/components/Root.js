import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import { is_authenticated } from '../utils/utils';

import Home from './Home';
import SignIn from '../containers/SignIn';
import Register from '../containers/Register';
import Profile from '../containers/Profile';
import Problem from '../containers/Problem';
import Help from '../components/Help';

function requireAuth(nextState, replace) {
  if (!is_authenticated()) {
    replace({
      pathname: '/sign_in',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const Root = () => (
  // Workaround for bug in hot loader and Router: https://github.com/ReactTraining/react-router/issues/2704#issuecomment-253716411
  <Router key={new Date()} history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/sign_in" component={SignIn} />
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} onEnter={requireAuth} />
    <Route path="/problem" component={Problem} />
    <Route path="/help" component={Help} />
  </Router>
);

export default Root;
