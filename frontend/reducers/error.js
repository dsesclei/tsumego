const errorMessageFactory = (message) => {
  let res = {};
  for (let key in message) {
    let item = message[key];
    res[key] = item.join();
  }
  return res;
}

function error(state = null, action) {
  switch (action.type) {
    case 'SIGN_IN_FAILURE':
    case 'REGISTER_FAILURE':
      if (action.message != null ) {
        return errorMessageFactory(action.message);
      }
      break;
    case 'SIGN_IN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return null;
  }
  return state;
}

export default error;

