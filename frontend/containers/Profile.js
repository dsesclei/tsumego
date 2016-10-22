import { connect } from 'react-redux';
import { signOutRequest } from '../actions';
import Profile from '../components/Profile';

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //onTabChange: (slideIndex) => dispatch(changeProfileTab(slideIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);