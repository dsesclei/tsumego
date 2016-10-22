import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

import Constants from '../constants';
import Page from './Page';
import TextField from 'material-ui/TextField';

const Profile = () => {
  return (
    <Page>
      <div className={css(styles.banner)}>
        <img src="/static/image/portrait_sample.png" className={css(styles.portrait)} />
      </div>
    </Page>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: '400px',
    backgroundColor: Constants.primaryColor,
    textTransform: 'uppercase',
    fontFamily: 'Raleway',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
  portrait: {
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    padding: '4px',
    border: '1px solid #ddd',
  }
});

export default Profile;
