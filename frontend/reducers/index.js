import { combineReducers } from 'redux';

const initialState = {
  id: null,
};

// function auth(state = {
//     isFetching: false,
//     isAuthenticated: localStorage.getItem('reduxState').id_token ? true : false
//   }, action) {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//       return Object.assign({}, state, {
//         isFetching: true,
//         isAuthenticated: false,
//         user: action.creds
//       })
//     case LOGIN_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         isAuthenticated: true,
//         errorMessage: ''
//       })
//     case LOGIN_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false,
//         isAuthenticated: false,
//         errorMessage: action.message
//       })
//     case LOGOUT_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         isAuthenticated: false
//       })
//     default:
//       return state
//   }
// }

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
});

