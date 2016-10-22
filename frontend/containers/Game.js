import { connect } from 'react-redux';
import { signOutRequest } from '../actions';
import Game from '../components/Game';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //onTabChange: (slideIndex) => dispatch(changeProfileTab(slideIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);