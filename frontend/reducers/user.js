const initialState = {
  id_token: null,
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      if (action.id_token != null ) {
        return { username: action.username, id_token: action.id_token, email: action.email };
      }
      break;
    case 'REGISTER':
      if (action.id_token != null ) {
        return { username: action.username, id_token: action.id_token, email: action.email };
      }
      break;
    case 'SIGN_OUT':
      return initialState;
  }
  return state;
}

export default user;

