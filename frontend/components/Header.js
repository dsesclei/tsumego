import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Constants from '../constants';

const styles = StyleSheet.create({
  header: {
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50px',
    backgroundColor: Constants.darkPrimaryColor,
  },
  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '10px',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '30px',
  },
  logo: {
    height: '50px',
    marginRight: '10px',
  },
  inlineLink: {
    fontWeight: 'bold',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
  },
  signIn: {
    color: '#ffffff',
    marginRight: '10px',
  },
});

const Header = ({ isSignedIn, username, onSignOut }) => {
  const SignedOut = (
    <div className={css(styles.header)}>
      <FlatButton
        containerElement={<Link to="/sign_in" />}
        label="Sign in"
        className={css(styles.signIn)}
      />
      <RaisedButton
        primary
        containerElement={<Link to="/register" />}
        label="Register"
      />
    </div>
  );

  const SignedIn = (
    <div className={css(styles.header)}>
      Hello {username}!
      <FlatButton
        label="Sign out"
        onClick={onSignOut}
        className={css(styles.signIn)}
      />
    </div>
  );

  const Logo = (
    <Link to={isSignedIn ? '/problem' : '/'} className={css(styles.inlineLink)}>
      <img src={'/static/image/tsumego_logo.png'} className={css(styles.logo)} />
      <p> TSUMEGO TSAR </p>
    </Link>
  );

  return (
    <div className={css(styles.header)}>
      <div className={css(styles.flexStart)}>
        {Logo}
      </div>
      <div className={css(styles.flexEnd)}>
        {isSignedIn ? SignedIn : SignedOut}
      </div>
    </div>
  );
};

export default Header;
