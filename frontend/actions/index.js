export function signInRequest(username, password) {
  return dispatch => {
    dispatch({ type: 'SIGN_IN' });
    fetch('/api-token-auth/', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ username, password }) }).then(response => response.json().then(json => {
       /* For Iteration one */
       if (!json.token) {
         alert('username: 1, password: 1')
       }
       /* END */ 
       dispatch({
        type: 'SIGN_IN',
        id_token: json.token ? json.token : null,
        username: json.user ? json.user.username  : null,
        email: json.token ? json.user.email : null,
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

export function placeStone(row, col) {
  return { type: 'PLACE_STONE', row, col };
}
