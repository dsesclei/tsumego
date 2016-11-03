export function signInRequest(username, password) {
  return dispatch => {
    dispatch({ type: 'SIGN_IN' });
    fetch('/login/',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }).then(r => r.json().then(json => {
        if (!json.token) {
          dispatch({
            type: 'SIGN_IN_FAILURE',
            message: json,
          });
        } else {
          dispatch({
            type: 'SIGN_IN_SUCCESS',
            id_token: json.token || '',
            username: json.user ? json.user.username : '',
            email: json.user ? json.user.email : '',
          });
        }
      })
    );
  };
}

export function registerRequest(username, password, email) {
  return dispatch => {
    dispatch({ type: 'REGISTER' });
    fetch('/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      }).then(r => r.json().then(json => {
        if (!json.token) {
          dispatch({
            type: 'REGISTER_FAILURE',
            message: json,
          });
        } else {
          dispatch({
            type: 'REGISTER_SUCCESS',
            id_token: json.token || null,
            username: json.username || '',
            email: json.email || '',
          });
        }
      })
    );
  };
}

export function secrectRequest() {
  return dispatch => {
    const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
    fetch('/secrect',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `JWT ${persistedState.user.id_token}` },
        body: JSON.stringify({}),
      }).then(r => r.json().then(json => {
        console.log(json);
      })
    );
  };
}

export function signOutRequest() {
  return dispatch => {
    dispatch({ type: 'SIGN_OUT' });
    fetch('/sign_out');
  };
}

export function fetchProblem() {
  return dispatch => {
    dispatch({ type: 'FETCH_PROBLEM' });
    fetch('/problems',
      {
        method: 'GET',
      }).then(r => r.json().then(json => {
        dispatch({ type: 'FETCH_PROBLEM_SUCCESS', problems: json });
      })
    );
  };
}


export function placeStone(row, col) {
  return { type: 'PLACE_STONE', row, col };
}
