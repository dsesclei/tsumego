import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Constants from '../constants';

const getStoneKey = (x, y) => {
  return (x + 1) * 100 + y;
}

const getBoardWidth = ({ rowNum, cellSize, padding }) => {
  return (rowNum * cellSize + padding * 2).toFixed(2);
}

const getBoardHeight = ({ colNum, cellSize, padding }) => {
  return (colNum * cellSize + padding * 2).toFixed(2);
}

const border = ({ rowNum, colNum, cellSize, padding }) => {
  let style = {
    stroke: '#000',
    fill: 'none',
    strokeWidth: '3',
  };
  padding = padding.toFixed(2);
  let rowLength = (rowNum * cellSize).toFixed(2);
  let colLength = (colNum * cellSize).toFixed(2);
  let leftTopX = padding;
  let leftTopY = padding;
  return (
    <rect 
      x={leftTopX} 
      y={leftTopY} 
      width={colLength} 
      height={rowLength} 
      style={style} />
  );
}

const line = ({ rowNum, colNum, cellSize, padding }) => {
  let rowLength = (rowNum * cellSize);
  let colLength = (colNum * cellSize);
  let leftTopX = padding;
  let leftTopY = padding;
  let rightBottomX = leftTopX + colLength;
  let rightBottomY = leftTopY + rowLength;
  let lines = [];
  // horizontal lines 
  for (let i = 1 ; i < rowNum; i++) {
    let startX = (leftTopX).toFixed(2);
    let startY = (leftTopY+i*cellSize).toFixed(2);
    let endX = (rightBottomX).toFixed(2);
    let endY = startY;
    lines.push(`M${startX},${startY}L${endX},${endY}`);
  };
  // vertical lines 
  for (let i = 1 ; i < colNum; i++) {
    let startX = (leftTopX+i*cellSize).toFixed(2);
    let startY = (leftTopY).toFixed(2);
    let endX = startX;
    let endY = rightBottomY;
    lines.push(`M${startX},${startY}L${endX},${endY}`);
  };
  let paths = lines.map(lineString =>
          <path 
            fill="none" 
            stroke="black" 
            d={lineString} 
            strokeWidth="1" 
            key={lineString} />
        );
  return (
    paths
  );
}

const sayClick = (row, col) => {
  console.log(`Click at ${row},${col}`);
}

const stone = ({ stones, rowNum, colNum, cellSize, padding, playerColor }) => {
  let leftTopX = padding;
  let leftTopY = padding;
  let points = [];
  let radius = ((cellSize / 2) * 0.9).toFixed(2);
  let stoneCache = {};
  for (let stone of stones) {
    let key = getStoneKey(stone.x,stone.y);
    stoneCache[key] = stone;
  }
  
  for (let i = 0; i <= colNum; i++) {
    for (let j = 0; j <= rowNum; j++) {
      let key = getStoneKey(i,j);
      points.push({
        x: j,
        y: i,
        cx: (leftTopX + i * cellSize).toFixed(2),
        cy: (leftTopY + j * cellSize).toFixed(2), 
        color: (key in stoneCache) ? stoneCache[key].color : playerColor == 'white' ? 'white' : 'black',  
        hidden: (key in stoneCache) ? false : true,
      });
    }
  }
  console.log(points);
  let circles = points.map(point=>
          <circle 
            cx={point.cx} 
            cy={point.cy}
            r={radius} 
            stroke={point.color} 
            strokeWidth="1" 
            fill={point.color} 
            onClick={() => {
              if (point.hidden)
                sayClick(point.x, point.y);
            }}
            className={point.hidden ? css(styles.hiddenStone) : null}
            key={getStoneKey(point.x,point.y)} />
        );
  return (
    circles
  );
} 

const Board = ({ stones = [], rowStart = 0, rowEnd = 18, colStart = 0, colEnd = 18 }) => {
  let cellSize = 25;
  let padding = 30;
  rowEnd = getRandomInt(0,19);// FOR FUN
  colEnd = getRandomInt(0,19);// FOR FUN
  let playerColor = rowEnd % 2 == 0 ? 'black' : 'white'; // FOR FUN
  let rowNum = Math.abs(rowEnd - rowStart) + 1;
  let colNum = Math.abs(colEnd - colStart) + 1;
  stones = (stones.length && stones) || generateRandomStones({ rowNum, colNum }); // FOR FUN
  let boardWidth = getBoardWidth({rowNum, cellSize, padding});
  let boardHeight = getBoardHeight({colNum, cellSize, padding});
  return (
    <svg height={boardWidth} width={boardHeight} className={css(styles.board)}>
      {border({ rowNum, colNum, cellSize, padding })}
      {line({ rowNum, colNum, cellSize, padding })}
      {stone({ stones, rowNum, colNum, cellSize, padding, playerColor })}
    </svg>
  );
};

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
    }
  }
});

export default Board;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateRandomStones = ({ rowNum, colNum }) => {
  let num = getRandomInt(1, (rowNum * colNum) * getRandomInt(1,10) / 10.0);
  let stones = [];
  let cache = {};
  for (let i = 0; i < num; i++) {
    let cx = getRandomInt(0,colNum+1);
    let cy = getRandomInt(0,rowNum+1);
    let key = cx + "," + cy;
    if (key in cache) continue;
    stones.push({
      x:cx,
      y:cy,
      color:getRandomInt(0,2) == 1 ? "black" : "white",
    });
    cache[key] = '1';
  }
  console.log(stones);
  return stones;
}