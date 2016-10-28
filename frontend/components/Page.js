import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Constants from '../constants';
import Header from '../containers/Header';
import Footer from './Footer';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Constants.primaryColor,
    primary2Color: Constants.darkPrimaryColor,
  },
});

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    alignItems: 'center',
  },
});

const Page = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div className={css(styles.app)}>
      <Header />
      <div className={css(styles.content)}>
        {children}
      </div>
      <Footer />
    </div>
  </MuiThemeProvider>
);

export default Page;
