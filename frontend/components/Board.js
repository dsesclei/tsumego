import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getStoneKey(x, y) {
  return ((x + 1) * 100) + y;
}

function getBoardWidth(rowNum, cellSize, padding) {
  return ((rowNum * cellSize) + (padding * 2)).toFixed(2);
}

function getBoardHeight(colNum, cellSize, padding) {
  return ((colNum * cellSize) + (padding * 2)).toFixed(2);
}

function generateRandomStones(rowNum, colNum) {
  const num = getRandomInt(1, ((rowNum * colNum) * getRandomInt(1, 10)) / 10.0);
  const stones = [];
  const cache = {};
  for (let i = 0; i < num; i++) {
    const cx = getRandomInt(0, colNum + 1);
    const cy = getRandomInt(0, rowNum + 1);
    const key = `${cx},${cy}`;
    if (!(key in cache)) {
      stones.push({
        x: cx,
        y: cy,
        color: getRandomInt(0, 2) === 1 ? 'black' : 'white',
      });
      cache[key] = '1';
    }
  }
  return stones;
}

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
    opacity: '0',
    ':hover': {
      opacity: '0.6',
      transition: 'opacity .15s ease-in-out .0s',
      cursor: 'pointer',
    },
  },
});

const Border = ({ rowNum, colNum, cellSize, padding }) => {
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
};

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

function sayClick(row, col) {
  console.log(`Click at ${row},${col}`);
}

function drawStones(stones, rowNum, colNum, cellSize, padding, playerColor) {
  const leftTopX = padding;
  const leftTopY = padding;
  const points = [];
  const radius = ((cellSize / 2) * 0.9).toFixed(2);
  const stoneCache = {};
  for (const stone of stones) {
    const key = getStoneKey(stone.x, stone.y);
    stoneCache[key] = stone;
  }

  for (let i = 0; i <= colNum; i++) {
    for (let j = 0; j <= rowNum; j++) {
      const key = getStoneKey(i, j);
      let color;
      if (key in stoneCache) {
        color = stoneCache[key].color;
      } else if (playerColor === 'white') {
        color = 'white';
      } else {
        color = 'black';
      }

      points.push({
        color,
        x: j,
        y: i,
        cx: (leftTopX + (i * cellSize)).toFixed(2),
        cy: (leftTopY + (j * cellSize)).toFixed(2),
        hidden: !(key in stoneCache),
      });
    }
  }

  return points.map(point => (
    <circle
      cx={point.cx}
      cy={point.cy}
      r={radius}
      stroke="black"
      strokeWidth="1px"
      fill={point.color}
      onClick={() => point.hidden && sayClick(point.x, point.y)}
      className={css(point.hidden && styles.hiddenStone)}
      key={getStoneKey(point.x, point.y)}
    />
  ));
}

const Board = ({ stones = [], rowStart = 0, rowEnd = 18, colStart = 0, colEnd = 18 }) => {
  const cellSize = 25;
  const padding = 30;
  rowEnd = getRandomInt(0, 19);// FOR FUN
  colEnd = getRandomInt(0, 19);// FOR FUN
  const playerColor = rowEnd % 2 === 0 ? 'black' : 'white'; // FOR FUN
  const rowNum = Math.abs(rowEnd - rowStart) + 1;
  const colNum = Math.abs(colEnd - colStart) + 1;
  stones = (stones.length && stones) || generateRandomStones(rowNum, colNum); // FOR FUN
  const boardWidth = getBoardWidth(rowNum, cellSize, padding);
  const boardHeight = getBoardHeight(colNum, cellSize, padding);
  return (
    <svg height={boardWidth} width={boardHeight} className={css(styles.board)}>
      <Border rowNum={rowNum} colNum={colNum} cellSize={cellSize} padding={padding} />
      {drawLines(rowNum, colNum, cellSize, padding)}
      {drawStones(stones, rowNum, colNum, cellSize, padding, playerColor)}
    </svg>
  );
};

export default Board;
