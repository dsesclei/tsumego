import { connect } from 'react-redux';
import { postProblemComment, voteComment } from '../actions';
import Comment from '../components/Comment';

const mapStateToProps = (state) => {
  return {
    problem: state.problem && state.problem.id,
    comments: state.comment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postProblemComment: (commentText) => dispatch(postProblemComment(commentText)),
    onVote: (commentId, vote) => dispatch(voteComment(commentId, vote)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

