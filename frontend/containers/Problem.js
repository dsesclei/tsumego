import { connect } from 'react-redux';
import { placeStone, fetchProblem, fetchRating, skip, retry } from '../actions';
import Problem from '../components/Problem';

const mapStateToProps = (state) => {
  return state.problem;
};

const mapDispatchToProps = (dispatch) => {
  return {
    retry: () => dispatch(retry()),
    skip: () => dispatch(skip()),
    fetchRating: () => dispatch(fetchRating()),
    fetchProblem: () => dispatch(fetchProblem()),
    onClick: (row, col) => dispatch(placeStone(row, col)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Problem);
