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
    flexDirection: 'column',
  },
  problem: {
    marginTop: '30px',
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
    backgroundColor: '#f1f1f1',
  },
  sidebar: {
    height: '505px',
    width: '200px',
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
    fontSize: '16px',
  },
  flexCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '20px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  group: {
    marginBottom: '30px',
  },
});

class Problem extends React.Component {
  componentWillMount() {
    this.props.fetchProblem();
  }

  render() {
    return (
      <Page>
        <div className={css(styles.gamePage)}>
          <div className={css(styles.problem)}>
            <Board stones={this.props.stones} playerToMove={this.props.playerToMove} onClick={this.props.onClick} />
            <div className={css(styles.sidebar, styles.flexCenter)}>
              <div className={css(styles.flexCenter, styles.group)}>
                <div className={css(styles.label)}>Time</div>
                <div>00:00</div>
              </div>
              <div className={css(styles.flexCenter, styles.group)}>
                <div className={css(styles.label)}>Tags</div>
                <div>middle game, joseki</div>
              </div>
              <div>Give Up</div>
              <div>Skip</div>
            </div>
          </div>
          <Comment />
        </div>
      </Page>
    );
  }
}

export default Problem;
