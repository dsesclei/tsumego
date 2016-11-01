const initialState = {
  id: null,
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'SIGN_IN':
      if (action.success === true) {
        return { id: action.id, username: action.username };
      }
      break;
    case 'SIGN_OUT':
      return initialState;
  }
  return state;
}

export default user;
