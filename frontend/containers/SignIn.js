import { connect } from 'react-redux';
import { signInRequest } from '../actions';
import SignIn from '../components/SignIn';

const mapStateToProps = (state) => {
  return {
        errorMessages: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (username, password) => dispatch(signInRequest(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

