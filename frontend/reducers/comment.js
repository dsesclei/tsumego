const initialState = [];

function comment(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROBLEM_COMMENTS':
      return initialState;
    case 'FETCH_PROBLEM_COMMENTS_SUCCESS':
      return action.comments;
    case 'POST_PROBLEM_COMMENTS_SUCCESS':
      return [action.comment, ...state];
  }
  return state;
}

export default comment;

