import { connect } from 'react-redux';
import { signOutRequest, changeProfileTab } from '../actions';
import Profile from '../components/Profile';

const mapStateToProps = (state) => {
  return {
    slideIndex: state.slideIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTabChange: (slideIndex) => dispatch(changeProfileTab(slideIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

