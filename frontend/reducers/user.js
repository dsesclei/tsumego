const initialState = {
  id_token: null,
  rating: 0,
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      if (action.id_token != null ) {
        return { username: action.username, id_token: action.id_token, email: action.email };
      }
      break;
    case 'REGISTER_SUCCESS':
      if (action.id_token != null ) {
        return { username: action.username, id_token: action.id_token, email: action.email };
      }
      break;
    case 'SIGN_IN_FAILURE':
    case 'REGISTER_FAILURE':
    case 'SIGN_OUT':
      return initialState;
    case 'FETCH_RATING_SUCCESS':
      return { ...state, rating: action.rating };
  }
  return state;
}

export default user;

