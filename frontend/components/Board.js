import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  board: {
    display: 'block',
    background: '#fcd700',
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

function drawBorder(rowNum, colNum, cellSize, padding) {
  const style = {
    stroke: '#000',
    fill: 'none',
    strokeWidth: '3px',
  };
  const roundedPadding = padding.toFixed(2);
  const rowLength = (rowNum * cellSize).toFixed(2);
  const colLength = (colNum * cellSize).toFixed(2);
  const leftTopX = roundedPadding;
  const leftTopY = roundedPadding;
  return (
    <rect
      x={leftTopX}
      y={leftTopY}
      width={colLength}
      height={rowLength}
      style={style}
    />
  );
}

function drawLines(rowNum, colNum, cellSize, padding) {
  const rowLength = (rowNum * cellSize);
  const colLength = (colNum * cellSize);
  const leftTopX = padding;
  const leftTopY = padding;
  const rightBottomX = leftTopX + colLength;
  const rightBottomY = leftTopY + rowLength;
  const lineStrings = [];
  // horizontal lines
  for (let i = 1; i < rowNum; i++) {
    const startX = leftTopX.toFixed(2);
    const startY = (leftTopY + (i * cellSize)).toFixed(2);
    const endX = rightBottomX.toFixed(2);
    const endY = startY;
    lineStrings.push(`M${startX},${startY}L${endX},${endY}`);
  }
  // vertical lines
  for (let i = 1; i < colNum; i++) {
    const startX = (leftTopX + (i * cellSize)).toFixed(2);
    const startY = leftTopY.toFixed(2);
    const endX = startX;
    const endY = rightBottomY;
    lineStrings.push(`M${startX},${startY}L${endX},${endY}`);
  }

  return lineStrings.map(lineString => (
    <path
      fill="none"
      stroke="black"
      d={lineString}
      strokeWidth="1"
      key={lineString}
    />
  ));
}

function drawStones(stones, cellSize, padding, playerToMove, onClick) {
  const stoneEls = [];
  for (let row = 0; row < 18; row++) {
    for (let col = 0; col < 18; col++) {
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
        <g key={`${row},${col}}`}>
          <circle
            cx={padding + (cellSize * row)}
            cy={padding + (cellSize * col)}
            r={(cellSize / 2) * 0.9}
            {...attrs}
          />
        </g>
      );
    }
  }

  return stoneEls;
}

const Board = ({ stones, playerToMove, onClick }) => {
  const cellSize = 25;
  const padding = 30;

  const width = 535;
  const height = 535;
  return (
    <svg width={width} height={height} className={css(styles.board)}>
      <defs>
        <filter id="f3" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
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
      {drawBorder(19, 19, cellSize, padding)}
      {drawLines(19, 19, cellSize, padding)}
      {drawStones(stones, cellSize, padding, playerToMove, onClick)}
    </svg>
  );
};

export default Board;
