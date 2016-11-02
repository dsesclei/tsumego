import { connect } from 'react-redux';
import { registerRequest } from '../actions';
import Register from '../components/Register';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (username, password, email) => dispatch(registerRequest(username, password, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

