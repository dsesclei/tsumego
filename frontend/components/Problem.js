import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Page from './Page';
import Board from './Board';

const styles = StyleSheet.create({
  gamePage: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Problem = () => (
  <Page>
    <div className={css(styles.gamePage)}>
      <Board />
    </div>
  </Page>
);

export default Problem;
