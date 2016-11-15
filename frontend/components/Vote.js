import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

const styles = StyleSheet.create({
  // container: {
  //   position: 'relative',
  // },
  arrowUp: {
    cursor: 'pointer',
  },
  arrowDown: {
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Vote = ({ commentId, score, onVote, selected }) => {
  return (
    <div className={css(styles.container)} >
      <ArrowUp 
        onClick={()=> {onVote(commentId, 1)}} 
        className={css(styles.arrowUp)}
        />
      <p>{score}</p>
      <ArrowDown 
        onClick={()=> {onVote(commentId, -1)}} 
        className={css(styles.arrowDown)}
        />
    </div>
  );
};

export default Vote;
