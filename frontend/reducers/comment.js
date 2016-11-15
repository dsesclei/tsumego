const initialState = [];

function comment(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROBLEM_COMMENTS':
      return initialState;
    case 'FETCH_PROBLEM_COMMENTS_SUCCESS':
      return action.comments;
    case 'POST_PROBLEM_COMMENTS_SUCCESS':
      return [action.comment, ...state];
    case 'VOTE_COMMENT_SUCCESS':
      return state.map(comm => {
        return comm.pk == action.vote.commentId ? {...comm, score: action.vote.score} : comm;
      })
  }
  return state;
}

export default comment;

