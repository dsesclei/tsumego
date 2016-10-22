import { combineReducers } from 'redux';

const initialState = {
  id: null,
}

function user(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      if (action.success === true) {
        return { id: action.id, username: action.username };
      }
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}

export default combineReducers({
  user,
});

