import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import Page from './Page';

const styles = StyleSheet.create({
  container: {
    margin: '20px',
    //width: '256px',
  },
  submit: {
    marginTop: '15px',
  },
  paper: {
    width: '556px',
    margin: '20px',
    padding: '20px',
    textAlign: 'center',
  }
});

const SignIn = ({ onSubmit, secrect }) => {
  let usernameEl;
  let passwordEl;
  return (
    <Page>
      <div className={css(styles.container)}>
      <Paper className={css(styles.paper)} zDepth={3} >
        <h3>Sign in</h3>
        <form onSubmit={e => { e.preventDefault(); onSubmit(usernameEl.getInputNode().value, passwordEl.getInputNode().value); }}>
          <div>
            <TextField name="username" hintText="Username" floatingLabelText="Username" ref={r => usernameEl = r} />
          </div>
          <div>
            <TextField name="password" hintText="Password" floatingLabelText="Password" type="password" ref={r => passwordEl = r} />
          </div>
          <div className={css(styles.submit)}>
            <RaisedButton primary type="submit" label="Submit" />
          </div>
        </form>
        <button onClick={() => {secrect()}}>secrect</button>
      </Paper>
      </div>
    </Page>
  );
};

export default SignIn;
