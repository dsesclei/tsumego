import { combineReducers } from 'redux';
import user from './user';
import problem from './problem';

const initialState = {
  id: null,
};

export default combineReducers({
  user,
  problem,
});

