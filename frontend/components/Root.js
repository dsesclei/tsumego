import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Home from './Home';
import SignIn from './SignIn';

const Root = () => {
  return (
    <Router key={new Date()} history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/sign_in" component={SignIn} />
    </Router>
  );
};

export default Root;