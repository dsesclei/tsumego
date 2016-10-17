import ReactDOM from 'react-dom';
import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import Root from './components/Root';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render((
  <AppContainer>
    <Root />
  </AppContainer>
), document.getElementById('entrypoint'));

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root').default;
    ReactDOM.render((
      <AppContainer>
        <NextRoot />
      </AppContainer>
    ), document.getElementById('entrypoint')
    );
  });
}
