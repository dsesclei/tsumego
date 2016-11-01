export function signInRequest(username, password) {
  return dispatch => {
    dispatch({ type: 'SIGN_IN' });
    fetch('/api-token-auth/', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ username, password }) }).then(response => response.json().then(json => {
       dispatch({
        type: 'SIGN_IN',
        success: json.token ? true : false,
        id_token: json.token ? json.token : null,
      }); 
    }));
  };
}

export function secrectRequest() {
  return dispatch => {
    const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}    
    fetch('/secrect', { method: 'POST', headers: { 'Content-Type':'application/json', 'Authorization': 'JWT ' + persistedState.user.id_token }, body: JSON.stringify({ }) }).then(response => response.json().then(json => {
     console.log(json);
    }));
  };
}

export function signOutRequest() {
  return dispatch => {
    dispatch({ type: 'SIGN_OUT' });
    fetch('/sign_out');
  };
}