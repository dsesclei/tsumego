export function signInRequest(username, password) {
  return dispatch => {
    dispatch({ type: 'SIGN_IN' });
    fetch('/sign_in', { method: 'POST', body: JSON.stringify({ username, password }) }).then(response => response.json().then(json => {
      dispatch({
        type: 'SIGN_IN',
        success: json.success,
        id: json.id,
        username: json.username,
      });
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
