import { combineReducers } from 'redux';
import user from './user';
import problem from './problem';
import error from './error';
import comment from './comment';

const initialState = {
  id: null,
};

export default combineReducers({
  user,
  problem,
  comment,
  error,
});

