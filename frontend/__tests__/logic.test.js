import * as go from '../logic/go';

describe('isValidPoint', () => {
  it('returns true for valid points', () => {
    expect(go.isValidPoint([0, 0])).toBe(true);
    expect(go.isValidPoint([18, 0])).toBe(true);
    expect(go.isValidPoint([18, 18])).toBe(true);
    expect(go.isValidPoint([5, 5])).toBe(true);
  });

  it('returns false for invalid points', () => {
    expect(go.isValidPoint([-1, 0])).toBe(false);
    expect(go.isValidPoint([19, 0])).toBe(false);
    expect(go.isValidPoint([18, 'a'])).toBe(false);
    expect(go.isValidPoint([5])).toBe(false);
  });
});

describe('getOrthogonalNeighbors', () => {
  it('returns the neighbors of a point', () => {
    expect(go.getOrthogonalNeighbors([5, 5])).toEqual([
      [6, 5],
      [4, 5],
      [5, 6],
      [5, 4],
    ]);
  });

  it('only includes two points when given a corner', () => { 
    expect(go.getOrthogonalNeighbors([0, 0]).length).toBe(2);
  });
});

const stones = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

describe('isLegalMove', () => {
  it('returns false when suicide', () => { 
    expect(go.isLegalMove(stones, [0, 0], -1)).toBe(false);
    expect(go.isLegalMove(stones, [3, 18], -1)).toBe(false);
    expect(go.isLegalMove(stones, [5, 15], -1)).toBe(false);
    expect(go.isLegalMove(stones, [0, 18], -1)).toBe(true);
  });

  it('returns false when point is already taken', () => {
    expect(go.isLegalMove(stones, [0, 1], -1)).toBe(true);
  });
});
