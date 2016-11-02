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

const Register = ({ onSubmit }) => {
  let usernameEl, passwordEl, emailEl;
  return (
    <Page>
      <div className={css(styles.container)}>
      <Paper className={css(styles.paper)} zDepth={3} >
        <h3>Register</h3>
        <form onSubmit={e => { e.preventDefault(); onSubmit(usernameEl.getInputNode().value, passwordEl.getInputNode().value, emailEl.getInputNode().value); }}>
          <div>
            <TextField name="username" hintText="Username" floatingLabelText="Username" ref={r => usernameEl = r} />
          </div>
          <div>
            <TextField name="email" hintText="Email" floatingLabelText="Email Address" ref={r => emailEl = r} />
          </div>
          <div>
            <TextField name="password" hintText="Password" floatingLabelText="Password" type="password" ref={r => passwordEl = r} />
          </div>
          <div className={css(styles.submit)}>
            <RaisedButton primary type="submit" label="Submit" />
          </div>
        </form>
      </Paper>
      </div>
    </Page>
  );
};

export default Register;
