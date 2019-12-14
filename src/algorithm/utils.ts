import { CellPosition, CellPositions } from '@/types';

const setCellPosition = (row: number, col: number): CellPosition => {
  if (row === 0 && col === 0) {
    return CellPositions.UPPERMOST_LEFT;
  }

  if (row === 0 && col === 8) {
    return CellPositions.UPPERMOST_RIGHT;
  }

  if (row === 8 && col === 0) {
    return CellPositions.LOWERMOST_LEFT;
  }

  if (row === 8 && col === 8) {
    return CellPositions.LOWERMOST_RIGHT;
  }

  if (col === 0) {
    return CellPositions.LEFTMOST;
  }

  if (col === 8) {
    return CellPositions.RIGHTMOST;
  }

  if (row === 0) {
    return CellPositions.UPPERMOST;
  }

  if (row === 8) {
    return CellPositions.LOWERMOST;
  }

  return CellPositions.MIDDLE;
};


export default {
  setCellPosition,
};
