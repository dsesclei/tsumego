import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import TextField from 'material-ui/TextField';

import Constants from '../constants';
import Page from './Page';

const SignIn = () => {
  return (
    <Page>
      <div><TextField hintText="Username" /></div>
      <div><TextField hintText="Email" /></div>
      <div><TextField hintText="Password" type="password" /></div>
      <div><TextField hintText="Repeat password" type="password" /></div>
    </Page>
  );
};

const styles = StyleSheet.create({
});

export default SignIn;
