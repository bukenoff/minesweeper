export type CellPosition =
  'UPPERMOST' |
  'UPPERMOST_RIGHT' |
  'UPPERMOST_LEFT' |
  'LOWERMOST' |
  'LOWERMOST_LEFT' |
  'LOWERMOST_RIGHT' |
  'LEFTMOST' |
  'RIGHTMOST' |
  'MIDDLE';

export enum CellPositions {
  UPPERMOST = 'UPPERMOST',
  UPPERMOST_RIGHT = 'UPPERMOST_RIGHT',
  UPPERMOST_LEFT = 'UPPERMOST_LEFT',
  LOWERMOST = 'LOWERMOST',
  LOWERMOST_LEFT = 'LOWERMOST_LEFT',
  LOWERMOST_RIGHT = 'LOWERMOST_RIGHT',
  LEFTMOST = 'LEFTMOST',
  RIGHTMOST = 'RIGHTMOST',
  MIDDLE = 'MIDDLE',
}

export interface INeighbour {
  row: number;
  col: number;
}

export interface ICell {
  id: string;
  row: number;
  col: number;
  position: CellPosition;
  has_bomb: boolean;
  bombs_around: number;
  is_open: boolean;
  is_flagged: boolean;
  neighbours: INeighbour[];
}

export interface ITable {
  [row: number]: {
    [col: number]: ICell;
  }
}
