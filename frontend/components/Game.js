import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

import Constants from '../constants';
import Page from './Page';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Board from './Board'


const Game = ({ username, problems = [{title:'title1'}] }) => {
  return (
    <Page>
      <div className={css(styles.banner)}>
        <Board />
      </div>
    </Page>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    backgroundColor: Constants.primaryColor,
    fontFamily: 'Raleway',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap', 
  },
});

export default Game;
