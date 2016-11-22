import { connect } from 'react-redux';
import { signOutRequest } from '../actions';
import Header from '../components/Header';

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.user.id_token != null,
    username: state.user.username,
    rating: state.user.rating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignOut: () => dispatch(signOutRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

