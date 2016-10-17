import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Constants from '../constants';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Header = () => {
  return (
    <div className={css(styles.header)}>
      <FlatButton
        containerElement={<Link to="/sign_in" />}
        label="Sign in"
        className={css(styles.signIn)}
        />
      <RaisedButton
        containerElement={<Link to="/register" />}
        primary={true}
        label="Register"
        />
    </div>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingRight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '50px',
    backgroundColor: Constants.darkPrimaryColor,
  },
  signIn: {
    color: '#ffffff',
    marginRight: '10px',
  },
});

export default Header;
