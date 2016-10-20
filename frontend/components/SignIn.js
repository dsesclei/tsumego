import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import TextField from 'material-ui/TextField';

import Constants from '../constants';
import Page from './Page';
import RaisedButton from 'material-ui/RaisedButton';


const SignIn = () => {
  let usernameEl, passwordEl;
  return (
    <Page>
      <div className={css(styles.container)}>
        <h3>Sign in</h3>
        <form onSubmit={e => e.preventDefault() || console.log(usernameEl.value, passwordEl.value)}>
          <div>
            <TextField name="username" hintText="Username" ref={r => usernameEl = r.getInputNode()} />
          </div>
          <div>
            <TextField name="password" hintText="Password" type="password" ref={r => passwordEl = r.getInputNode()} />
          </div>
          <div className={css(styles.submit)}>
            <RaisedButton primary={true} type="submit" label="Submit" />
          </div>
        </form>
      </div>
    </Page>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '256px',
  },
  submit: {
    marginTop: '15px',
  },
});

export default SignIn;
