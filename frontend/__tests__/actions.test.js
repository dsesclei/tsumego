import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions';
import fetchMock from 'fetch-mock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key],
    setItem: (key, value) => store[key] = value.toString(),
    clear: store = {},
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

localStorage.setItem('reduxState', JSON.stringify({
  user: {
    id_token: 'faketoken',
  },
}));

afterEach(() => fetchMock.restore());

describe('retry', () => {
  it('should have a type of "RETRY"', () => {
    expect(actions.retry().type).toEqual('RETRY');
  });
});

describe('reportAttempt', () => {
  it('should have a type of "REPORT_ATTEMPT"', () => {
    expect(actions.reportAttempt().type).toEqual('REPORT_ATTEMPT');
  });
});

describe('fetchRating', () => {
  beforeEach(() => {
    fetchMock.get('/rating', { rating: 3131 });
  });

  it('dispatches the correct actions', () => {
    const expectedActions = [
      { type: 'FETCH_RATING' },
      { type: 'FETCH_RATING_SUCCESS' },
    ];

    const store = mockStore();
    store.dispatch(actions.fetchRating()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('parses the rating from the response', () => {
    const store = mockStore();
    store.dispatch(actions.fetchRating()).then(() => {
      expect(store.user.rating.toEqual(3131));
    });
  });
});

describe('fetchProblem', () => {
  it('dispatches the correct action and parses the problem from the response', () => {
    fetchMock.get('/rating', { rating: 3131 });
    fetchMock.get('/problems/next', {
      board: [],
      responses: {},
    });

    const expectedActions = [
      { type: 'FETCH_PROBLEM' },
      { type: 'FETCH_PROBLEM_SUCCESS' },
    ];

    const store = mockStore();
    store.dispatch(actions.fetchProblem()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('placeStone', () => {
  // RESPOND is set on an interval, so should appear later
  it('dispatches PLACE_STONE, but not RESPOND', () => {
    const expectedActions = [
      { type: 'PLACE_STONE' },
    ];

    const store = mockStore();
    store.dispatch(actions.placeStone());
    expect(store.getActions()).toEqual(expectedActions);
  });
});