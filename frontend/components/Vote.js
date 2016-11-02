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

const Vote = ({ commentId, voteNumber, onUpVote, onDownVote, selected }) => {
  return (
    <div className={css(styles.container)} >
      <ArrowUp 
        onClick={()=> {onUpVote(commentId)}} 
        className={css(styles.arrowUp)}
        />
      <p>{voteNumber || '232'}</p>
      <ArrowDown 
        onClick={()=> {onDownVote(commentId)}} 
        className={css(styles.arrowDown)}
        />
    </div>
  );
};

export default Vote;
