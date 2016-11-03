import { connect } from 'react-redux';
import { placeStone, fetchProblem } from '../actions';
import Problem from '../components/Problem';

const mapStateToProps = (state) => {
  return state.problem;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProblem: () => dispatch(fetchProblem()),
    onClick: (row, col) => dispatch(placeStone(row, col)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Problem);

