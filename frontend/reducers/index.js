import { combineReducers } from 'redux';
import user from './user';
import problem from './problem';

export default combineReducers({
  user,
  problem,
});

