import { combineReducers } from 'redux';
import user from './user';
import problem from './problem';

const initialState = {
  id: null,
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      if (action.id_token != null ) {
        return { username: action.username, id_token: action.id_token, email: action.email };
      }
      break;
    case 'SIGN_OUT':
      return initialState;
  }
  return state;
}

export default combineReducers({
  user,
  problem,
});

