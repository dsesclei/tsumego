const settings = {
  size: 19,
};

function isValidPoint(point) {
  const [row, col] = point;
  return point.length === 2 && !isNaN(row) && !isNaN(col) && row >= 0 && row < settings.size && col >= 0 && col < settings.size;
}

function getValue(stones, point) {
  return stones[point[0]][point[1]];
}

function setValue(stones, point, value) {
  stones[point[0]][point[1]] = value;
}

function getOrthogonalNeighbors([row, col]) {
  const neighbors = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]];
  return neighbors.filter(isValidPoint);
}

function countLiberties(stones, point, visitedPoints = null) {
  if (!isValidPoint(point)) {
    throw new Error('Invalid point');
  }
  const value = getValue(stones, point);
  if (visitedPoints === null) {
    visitedPoints = [];
    for (let row = 0; row < 19; row++) {
      const points = [];
      for (let col = 0; col < 19; col++) {
        points.push(0);
      }
      visitedPoints.push(points);
    }
  }

  if (getValue(visitedPoints, point) === 1) {
    return 0;
  }

  setValue(visitedPoints, point, 1);

  if (getValue(stones, point) === 0) {
    return 1;
  }

  const liberties = getOrthogonalNeighbors(point)
    .filter(p => getValue(stones, p) !== value * -1)
    .reduce((sum, neighbor) => sum + countLiberties(stones, neighbor, visitedPoints), 0);
  return liberties;
}

// Checks if a play at move by player would capture any stones
function isCapturingMove(stones, move, player) {
  return getOrthogonalNeighbors(move)
    .filter(neighbor => getValue(stones, neighbor) === player * -1)
    .some(neighbor => countLiberties(stones, neighbor) === 0);
}

function isLegalMove(stones, move, playerToMove) {
  if (!isValidPoint(move)) {
    throw new Error('Invalid point');
  }

  stones = stones.map(row => row.slice());

  if (getValue(stones, move) !== 0) {
    return false;
  }

  // Are there enough liberties?
  setValue(stones, move, playerToMove);
  const liberties = countLiberties(stones, move);
  if (liberties > 0) {
    return true;
  }

  // Is it capturing anything?
  if (isCapturingMove(stones, move, playerToMove)) {
    return true;
  }

  // Must be suicide
  return false;
}

function removeGroup(stones, point) {
  if (!isValidPoint(point)) {
    throw new Error('Invalid point');
  }
  const value = getValue(stones, point);
  const points = [point];
  while (points.length > 0) {
    const capturedPoint = points.pop();
    if (getValue(stones, capturedPoint) !== 0) {
      const neighbors = getOrthogonalNeighbors(capturedPoint);
      const capturedNeighbors = neighbors.filter(neighbor => getValue(stones, neighbor) === value);
      points.push(...capturedNeighbors);
      setValue(stones, capturedPoint, 0);
    }
  }

  return stones;
}


function applyMove(stones, move, playerToMove) {
  if (isLegalMove(stones, move, playerToMove)) {
    setValue(stones, move, playerToMove);

    stones = getOrthogonalNeighbors(move)
      .filter(neighbor => getValue(stones, neighbor) === playerToMove * -1)
      .filter(neighbor => countLiberties(stones, neighbor) === 0)
      .reduce((newStones, neighbor) => removeGroup(newStones, neighbor), stones);
  }

  return stones;
}

export { isLegalMove, applyMove };
