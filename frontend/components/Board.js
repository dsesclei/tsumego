import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  board: {
    display: 'block',
    background: "url('/static/image/board.png')",
  },
  container: {
    width: '256px',
  },
  submit: {
    marginTop: '15px',
  },
  hiddenStone: {
    opacity: 0,
    ':hover': {
      opacity: 0.6,
      transition: 'opacity .15s ease-in-out .0s',
      cursor: 'pointer',
    },
  },
});

function drawLines(rowNum, colNum, cellSize, padding) {
  const lines = [];

  // Horizontal lines
  for (let i = 0; i < rowNum; i++) {
    const y = padding + (i * cellSize);
    lines.push(
      <line
        key={`row:${i}`}
        x1={padding}
        x2={padding + ((colNum - 1) * cellSize)}
        y1={y}
        y2={y}
        stroke="black"
        strokeWidth="1"
      />
    );
  }

  // Vertical lines
  for (let i = 0; i < colNum; i++) {
    const x = padding + (i * cellSize);
    lines.push(
      <line
        key={`col:${i}`}
        x1={x}
        x2={x}
        y1={padding}
        y2={padding + ((rowNum - 1) * cellSize)}
        stroke="black"
        strokeWidth="1"
      />
    );
  }

  return lines;
}

function drawStones(stones, cellSize, padding, playerToMove, onClick) {
  const stoneEls = [];
  for (let row = 0; row < 19; row++) {
    for (let col = 0; col < 19; col++) {
      const value = stones[row][col];
      const attrs = {};
      switch (value) {
        case 0:
          attrs.className = css(styles.hiddenStone);
          attrs.onClick = () => onClick(row, col);
          attrs.fill = `url(#${playerToMove})`;
          break;
        case 1:
          attrs.fill = 'url(#black)';
          break;
        case -1:
          attrs.fill = 'url(#white)';
          break;
      }

      stoneEls.push(
        <circle
          key={`${row},${col}`}
          cx={padding + (cellSize * col)}
          cy={padding + (cellSize * row)}
          r={(cellSize / 2) * 0.9}
          {...attrs}
        />
      );
    }
  }

  return stoneEls;
}

// Only written for 19x19 size
function drawStarPoints(cellSize, padding) {
  const points = [
    [3, 3],
    [3, 9],
    [3, 15],
    [9, 3],
    [9, 9],
    [9, 15],
    [15, 3],
    [15, 9],
    [15, 15],
  ];

  return points.map(point => (
    <circle
      key={point.toString()}
      cx={padding + (cellSize * point[1])}
      cy={padding + (cellSize * point[0])}
      r={3}
    />
  ));
}

const Board = ({ stones, playerToMove, onClick }) => {
  const cellSize = 25;
  const padding = 30;

  const width = padding + (cellSize * 19);
  const height = padding + (cellSize * 19);
  return (
    <svg width={width} height={height} className={css(styles.board)}>
      <defs>
        <pattern id="white" width={cellSize} height={cellSize}>
          <image
            xlinkHref="/static/image/white.png"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          />
        </pattern>
        <pattern id="black" width={cellSize} height={cellSize}>
          <image
            xlinkHref="/static/image/black.png"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          />
        </pattern>
      </defs>
      {drawLines(19, 19, cellSize, padding)}
      {drawStarPoints(cellSize, padding)}
      {drawStones(stones, cellSize, padding, playerToMove, onClick)}
    </svg>
  );
};

export default Board;
