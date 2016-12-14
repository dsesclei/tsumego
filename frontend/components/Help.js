import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import FontIcon from 'material-ui/FontIcon';

import Constants from '../constants';
import Page from './Page';

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: '100px',
    backgroundColor: Constants.primaryColor,
    textTransform: 'uppercase',
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
  },
  title: {
    fontWeight: '900',
    fontSize: '3em',//'calc(3vw + 3vh + 2vmin)', // Resizes the font relative to the window. Surprisingly difficult to do
    textShadow: `7px 7px 0px ${Constants.darkPrimaryColor}`,
  },
  questionContainer: {
    margin: '2em',

  },
  question: {
    fontSize: '16px',
    fontWeight: '500',
  },
  answer: {
    fontSize: '14px',
    fontWeight: '300',
  },

});

const Help = () => (
  <Page>
      <div className={css(styles.banner)}>
        <div className={css(styles.title)}>frequently asked questions / rules</div>
        </div>
      <div className={css(styles.questionContainer)}>
        <div className={css(styles.question)}>1. What is Go?</div>
        <div className={css(styles.answer)}>
          <p>Go is a strategy board game originating in China circa 3,500 BC. The game is designed for two players, but with the advent of computers you can master your skills individually!</p>
          </div>
          <div className={css(styles.question)}>2. How is the game played?</div>
          <div className={css(styles.answer)}>
            <p>Basically, each player places a piece during their turn alternating turns making only one move each turn by placing their colored stone (typically black & white) on an intersection of the (typically 19 x 19) Go board. The player with the black stones begins the game and each player alternate turns, trying to gain territory and take territory from their opponent (by surrounding their tiles with yours). Therefore, the goal of the game is to occupy more spaces on the board.</p>
            </div>
          <div className={css(styles.answer)}>
            <p>Too learn more about the specifics of gameplay (based of traditional Chinese rules), check these resources out:
https://www.cs.cmu.edu/~wjh/go/rules/Chinese.html</p>
            </div>
          <div className={css(styles.question)}>3. What is Tsumego?</div>
          <div className={css(styles.answer)}>
            <p>Tsumego is a type of problem for the boardgame Go, which mirrors potential situations a player may encounter in a real full-length Go game. These problems help players learn through experience, how to identify and make the correct decisions in "life-and-death" circumstances. By automating the opponents moves, you can solve your way through each problemset to quite literally move your way through the ranks!</p>
            </div>
            <div className={css(styles.question)}>4. How can I increase my ranking so I know I'm improving?</div>
            <div className={css(styles.answer)}>
              <p>By solving problems well, your ranking will be updated not only based on your current ranking, but also on the difficulty ranking and time it toook to complete that problem.</p>
              </div>
      </div>
  </Page>
);

export default Help;
