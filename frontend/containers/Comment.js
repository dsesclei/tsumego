import { connect } from 'react-redux';
import { fetchProblemComments, postProblemComment } from '../actions';
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

