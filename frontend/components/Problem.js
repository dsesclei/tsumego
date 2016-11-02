import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Page from './Page';
import Board from './Board';
import Comment from './Comment';

const styles = StyleSheet.create({
  gamePage: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const Problem = ({ stones, playerToMove, onClick }) => (
  <Page>
    <div className={css(styles.gamePage)}>
      <Board stones={stones} playerToMove={playerToMove} onClick={onClick} />
      <Comment />
    </div>
  </Page>
);

export default Problem;
