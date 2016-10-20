const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

function login() {
  return { type: LOGIN_SUCCESS };
}

function loginAsync() {
  return dispatch => {
    fetch('/login')
      .then(response => {
        console.log(response);
      });
  }
}