import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router';

import Constants from '../constants';
import Page from './Page';

const Home = () => {
  return (
    <Page>
      <div className={css(styles.banner)}>
        <div className={css(styles.title)}>Tsumego Tsar</div>
      </div>
      <div className={css(styles.cardContainer)}>
        <div className={css(styles.card)}>
          <p className={css(styles.cardHeader)}>
            <FontIcon className={css(styles.cardIcon) + ' material-icons'}>warning</FontIcon>
            Identify weaknesses
          </p>
          <p className={css(styles.cardDescription)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc risus ligula, sollicitudin quis mattis quis, porttitor a ligula. Nunc tempor quam quis ullamcorper accumsan. Aenean nec vestibulum purus.</p>
        </div>
        <div className={css(styles.card)}>
          <p className={css(styles.cardHeader)}>
            <FontIcon className={css(styles.cardIcon) + ' material-icons'}>assignment</FontIcon>
            Study smart
          </p>
          <p className={css(styles.cardDescription)}>Fusce non est a sem cursus rhoncus. Integer purus dolor, porttitor vitae tempus eget, sodales vitae mi. Nullam placerat, nisl sed dictum euismod, nisi lacus ullamcorper sem, a accumsan tortor neque finibus arcu. Mauris quis laoreet nisl.</p>
        </div>
        <div className={css(styles.card)}>
          <p className={css(styles.cardHeader)}>
            <FontIcon className={css(styles.cardIcon) + ' material-icons'}>assessment</FontIcon>
            Track your progress
          </p>
          <p className={css(styles.cardDescription)}>Nulla in lorem finibus metus vulputate semper. Etiam id lobortis lectus. Quisque tristique pharetra quam eu sodales. In in justo et turpis lacinia sollicitudin non non felis.</p>
        </div>
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
  title: {
    fontWeight: '900',
    fontSize: 'calc(4vw + 4vh + 2vmin)', // Resizes the font relative to the window. Surprisingly difficult to do
    textShadow: `7px 7px 0px ${Constants.darkPrimaryColor}`,
  },
  description: {
    fontSize: '22px',
    fontWeight: '600',
    letterSpacing: '0.25em',
  },
  cardContainer: {
    paddingLeft: '30px',
    paddingRight: '30px',
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    margin: '10px',
    width: '300px',
    height: '300px', 
  },
  cardHeader: {
    fontSize: '28px',
    fontWeight: '300',
    display: 'flex',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: '7px',
  },
});

export default Home;
