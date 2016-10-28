import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';

import reducers from './reducers';
import Root from './components/Root';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render((
  <AppContainer>
    <Provider store={store}>
      <Root />
    </Provider>
  </AppContainer>
), document.getElementById('entrypoint'));

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    /* eslint-disable global-require */
    const NextRoot = require('./components/Root').default;
    /* eslint-enable global-require */

    ReactDOM.render((
      <AppContainer>
        <Provider store={store}>
          <NextRoot />
        </Provider>
      </AppContainer>
    ), document.getElementById('entrypoint')
    );
  });
}
