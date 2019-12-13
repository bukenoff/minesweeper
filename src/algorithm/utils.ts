import { CellPosition } from '@/types';
import { CELL_POSITIONS as POSITIONS } from '@/constants/cellPostions';

const setCellPosition = (row: number, col: number): CellPosition => {
  if (row === 0 && col === 0) {
    return POSITIONS.UPPERMOST_LEFT;
  }

  if (row === 0 && col === 8) {
    return POSITIONS.UPPERMOST_RIGHT;
  }

  if (row === 8 && col === 0) {
    return POSITIONS.LOWERMOST_LEFT;
  }

  if (row === 8 && col === 8) {
    return POSITIONS.LOWERMOST_RIGHT;
  }

  if (col === 0) {
    return POSITIONS.LEFTMOST;
  }

  if (col === 8) {
    return POSITIONS.RIGHTMOST;
  }

  if (row === 0) {
    return POSITIONS.UPPERMOST;
  }

  if (row === 8) {
    return POSITIONS.LOWERMOST;
  }

  return POSITIONS.MIDDLE;
};


export default {
  setCellPosition,
};
