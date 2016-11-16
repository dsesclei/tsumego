import { isLegalMove, applyMove } from '../logic/go';

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
    start: {
      '0,0': {
        response: '1,1',
        '0,3': {
          response: '0,4',
          '2,4': {
            success: true,
          },
        },
      },
    },
  },
  moves: ['start'],
  playerToMove: 'black',
  isWaitingForResponse: false,
};

function placeStone(state, action) {
  if (state.isWaitingForResponse) {
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
    isWaiting: true,
  };
}

function respond(state) {
  const stones = state.stones.map(row => row.slice());

  let response = state.responses;
  for (const move of state.moves) {
    if (move in response) {
      response = response[move];
    } else {
      console.log('off path');
      return state;
    }
  }

  if ('success' in response) {
    if (response.success) {
      console.log('success');
    } else {
      console.log('failure');
    }
  } else {
    const playerNumber = { black: 1, white: -1 }[state.playerToMove];
    const parts = response.move.split(',');
    const row = parseInt(parts[0], 10);
    const col = parseInt(parts[1], 10);
    applyMove(stones, [row, col], playerNumber);
  }

  return {
    ...state,
    stones,
    playerToMove: { black: 'white', white: 'black' }[state.playerToMove],
    isWaiting: false,
  };
}

function fetchProblemSuccess(state, action) {
  return {
    ...state,
    responses: {
      start: {
        '0,0': {
          move: '0,1',
          '0,3': {
            move: '0,4',
            '2,4': {
              success: true,
            },
          },
        },
      },
    },
    stones: JSON.parse(action.problem.board),
    moves: ['start'],
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
  }
  return state;
}

export default problem;

