import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Constants from '../constants';


const Board = ({  }) => {
  let defaultAttr = {
    color: '#665544',
    fill: 'none',
    d: 'M54.25,71.75L369.25,71.75',
    strokeWidth: '1px',
    style: {
      '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0);'
    }
  }
  return (
    <svg height={400} width={400} className={css(styles.board)}>
      <path fill={defaultAttr.fill} stroke={defaultAttr.color} d={defaultAttr.d} strokeWidth={defaultAttr.strokeWidth} style={defaultAttr.style}></path>
    </svg>
  );
};

const styles = StyleSheet.create({
  board: {
    background: '#fcd700',
  },
  container: {
    width: '256px',
  },
  submit: {
    marginTop: '15px',
  },
});

export default Board;
