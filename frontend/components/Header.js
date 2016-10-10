import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Constants from '../constants';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const Header = () => {
  return (
    <div className={css(styles.header)}>
      <FlatButton label="Sign in" style={{ color: '#ffffff' }} />    
      <RaisedButton primary={true} label="Register" />    
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
  button: {
    marginRight: '10px',
  },
});

export default Header;
