import { connect } from 'react-redux';
import { signInRequest, secrectRequest } from '../actions';
import SignIn from '../components/SignIn';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (username, password) => dispatch(signInRequest(username, password)),
    secrect: () => dispatch(secrectRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

