import { Router, Route, hashHistory } from 'react-router';

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
          hashHistory.push('/')
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
          hashHistory.push('/')
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
    //fetch('/sign_out');
    hashHistory.push('/')
  };
}

export function fetchProblem() {
  return dispatch => {
    dispatch({ type: 'FETCH_PROBLEM' });
    fetch('/problems/next',
      {
        method: 'GET',
      }).then(r => r.json().then(json => {
        dispatch({ type: 'FETCH_PROBLEM_SUCCESS', problem: json });
        
        dispatch({ type: 'FETCH_PROBLEM_COMMENTS' });        
        fetch('/problems/' + json.pk + '/comments',
        {
          method: 'GET',
        }).then(r => r.json().then(json => {
          dispatch({ type: 'FETCH_PROBLEM_COMMENTS_SUCCESS', comments: json });
        })
        );

      })
    );
  };
}

// This method is not being used right now.
export function fetchProblemComments(pk=0) {
  debugger;
  return dispatch => {
    dispatch({ type: 'FETCH_PROBLEM_COMMENTS' });
    const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
    const id = pk || (persistedState && persistedState.problem && persistedState.problem.id);
    fetch('/problems/' + id + '/comments',
      {
        method: 'GET',
      }).then(r => r.json().then(json => {
        dispatch({ type: 'FETCH_PROBLEM_COMMENTS_SUCCESS', comments: json });
      })
    );
  };
}

export function postProblemComment(commentText) {
  return dispatch => {
    dispatch({ type: 'POST_PROBLEM_COMMENT' });
    const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
    const id = persistedState && persistedState.problem && persistedState.problem.id;
    fetch('/problems/' + id + '/comments',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `JWT ${persistedState.user.id_token}` },
        body: JSON.stringify({
          content: commentText,
        }),
      }).then(r => r.json().then(json => {
        dispatch({ type: 'POST_PROBLEM_COMMENTS_SUCCESS', comment: json });
      })
    );
  };
  // return dispatch => {
  //   dispatch({ type: 'FETCH_PROBLEM' });
  //   fetch('/problems',
  //     {
  //       method: 'GET',
  //     }).then(r => r.json().then(json => {
  //       dispatch({ type: 'FETCH_PROBLEM_SUCCESS', problems: json });
  //     })
  //   );
  // };
}

export function voteComment(commentId, vote) {
  return dispatch => {
    dispatch({ type: 'VOTE_COMMENT' });
    const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
    fetch('/comments/' + commentId + '/vote',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `JWT ${persistedState.user.id_token}` },
        body: JSON.stringify({
          value: vote == 1 ? '1' : '-1',
        }),
      }).then(r => r.json().then(json => {
        if (json.status == 'success') {
          dispatch({ type: 'VOTE_COMMENT_SUCCESS', vote: json });
        }
      })
    );
  };
}

export function postAttempt(successful, duration) {
  return dispatch => {
    dispatch({ type: 'POST_ATTEMPT' });
    const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};
    const id = persistedState && persistedState.problem && persistedState.problem.id;
    fetch('/problems/' + id + '/attempts',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `JWT ${persistedState.user.id_token}` },
        body: JSON.stringify({
          successful,
          duration
        }),
      }).then(r => r.json().then(json => {
          dispatch({ type: 'POST_ATTEMPT_SUCCESS', vote: json });
      })
    );
  };
}

export function placeStone(row, col) {
  return { type: 'PLACE_STONE', row, col };
}
