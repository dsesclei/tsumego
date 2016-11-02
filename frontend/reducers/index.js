import { combineReducers } from 'redux';
import user from './user';
import problem from './problem';
import error from './error';

const initialState = {
  id: null,
};

export default combineReducers({
  user,
  problem,
  error,
});

