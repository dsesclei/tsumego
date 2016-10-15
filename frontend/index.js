import ReactDOM from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/Home';
import SignIn from './components/SignIn';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/sign_in" component={SignIn} />
  </Router>
), document.getElementById('entrypoint'));
