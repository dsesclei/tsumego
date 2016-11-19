import { isLegalMove, applyMove } from '../logic/go';
import Constants from '../constants';

const initialStones = [];
for (let i = 0; i < 19; i++) {
  const row = [];
  for (let j = 0; j < 19; j++) {
    row.push(0);
  }
  initialStones.push(row);
}

const initialState = {
  stones: initialStones,
  responses: {
    start: {},
  },
  moves: [],
  playerToMove: 'black',
  status: Constants.statusAttempting,
};

function placeStone(state, action) {
  if (state.status !== Constants.statusAttempting) {
    return state;
  }
  const stones = state.stones.map(row => row.slice());
  const playerNumber = { black: 1, white: -1 }[state.playerToMove];
  if (!isLegalMove(stones, [action.row, action.col], playerNumber)) {
    return state;
  }
  applyMove(stones, [action.row, action.col], playerNumber);

  const moves = state.moves.slice();
  moves.push(`${action.row},${action.col}`);
  return {
    ...state,
    stones,
    moves,
    playerToMove: { black: 'white', white: 'black' }[state.playerToMove],
    status: Constants.statusResponding,
  };
}

function respond(state) {
  if (state.status !== Constants.statusResponding) {
    return state;
  }
  if (state.moves.length === 0) {
    throw new Error('Should have at least one move');
  }

  let nextStatus = Constants.statusAttempting;
  const stones = state.stones.map(row => row.slice());
  let node = state.responses;
  for (const move of state.moves) {
    if ('responses' in node) {
      node = node.responses;
    }
    if (move in node) {
      node = node[move];
    } else {
      nextStatus = Constants.statusFailed;
      break;
    }
  }

  if ('move' in node) {
    const playerNumber = { black: 1, white: -1 }[state.playerToMove];
    const parts = node.move.split(',');
    const row = parseInt(parts[0], 10);
    const col = parseInt(parts[1], 10);
    applyMove(stones, [row, col], playerNumber);
  }

  if ('success' in node) {
    nextStatus = node.success ? Constants.statusSucceeded : Constants.statusFailed;
  } else if (!('responses' in node)) {
    nextStatus = Constants.statusFailed;
  }

  return {
    ...state,
    stones,
    status: nextStatus,
    playerToMove: { black: 'white', white: 'black' }[state.playerToMove],
  };
}

function fetchProblemSuccess(state, action) {
  return {
    ...state,
    initialStones: JSON.parse(action.problem.board), // Save copy for retry
    stones: JSON.parse(action.problem.board),
    responses: JSON.parse(action.problem.responses),
    moves: [],
    status: Constants.statusAttempting,
    playerToMove: 'black',
  };
}

function retry(state) {
  const stones = state.initialStones.map(row => row.slice());
  return {
    ...state,
    stones,
    moves: [],
    status: Constants.statusAttempting,
    playerToMove: 'black',
  };
}

function problem(state = initialState, action) {
  switch (action.type) {
    case 'PLACE_STONE':
      return placeStone(state, action);
    case 'FETCH_PROBLEM_SUCCESS':
      return fetchProblemSuccess(state, action);
    case 'RESPOND':
      return respond(state);
    case 'RETRY':
      return retry(state);
  }
  return state;
}

export default problem;

