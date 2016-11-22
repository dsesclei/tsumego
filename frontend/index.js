import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';

import store from './stores';
import Root from './components/Root';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
