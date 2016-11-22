import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';
import Constants from '../constants';
import { fetchProblem, fetchRating } from '../actions';

const logger = createLogger();

function getPersistedState() {
  return localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
}

const store = createStore(reducer, getPersistedState(), applyMiddleware(thunk, logger));

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

// ---------
// Problem
// ---------

function reportAttempt(id, successful, duration) {
  const persistedState = getPersistedState();
  fetch(`/problems/${id}/attempts`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `JWT ${persistedState.user.id_token}` },
      body: JSON.stringify({
        successful,
        duration,
      }),
    },
  ).then(r => r.json()).then(json => {
    store.dispatch({ type: 'REPORT_ATTEMPT_SUCCESS' });
    store.dispatch(fetchRating());
  });
}

store.subscribe(() => {
  const problem = store.getState().problem;
  const { id, hasReportedAttempt, status } = problem;

  if (!hasReportedAttempt && (status === Constants.statusSucceeded || status === Constants.statusFailed)) {
    reportAttempt(id, status === Constants.statusSucceeded, Math.floor(Math.random() * 10));
    store.dispatch({ type: 'REPORT_ATTEMPT' });
  }
});

export default store;