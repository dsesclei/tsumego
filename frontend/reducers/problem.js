import { applyMove } from '../logic/go';

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
    '0,0': {
      '1,1': {
        '3,2': { success: true },
      },
    },
    '0,1': {
      '0,0': {
        '1,2': {},
      },
    },
  },
  moves: [],
  playerToMove: 'black',
};

function placeStone(state, action) {
  const stones = state.stones.map(row => row.slice());
  const playerNumber = { black: 1, white: -1 }[state.playerToMove];
  applyMove(stones, [action.row, action.col], playerNumber);

  const moves = state.moves.slice();
  moves.push({ row: action.row, col: action.col });
  return {
    stones,
    moves,
    playerToMove: { black: 'white', white: 'black' }[state.playerToMove],
  };
}

function problem(state = initialState, action) {
  switch (action.type) {
    case 'PLACE_STONE':
      return placeStone(state, action);
  }
  return state;
}

export default problem;

