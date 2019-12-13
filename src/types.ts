export type CellPosition =
  'UPPERMOST' |
  'UPPERMOST_RIGHT' |
  'UPPERMOST_LEFT' |
  'LOWERMOST' |
  'LOWERMOST_LEFT' |
  'LOWERMOST_RIGHT' |
  'LEFTMOST' |
  'RIGHTMOST' |
  'MIDDLE'
;

type BombsAround = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ICell {
  id: string;
  row: number;
  col: number;
  position: CellPosition;
  has_bomb: boolean;
  bombs_around: BombsAround;
  is_open: boolean;
  flagged: boolean;
  neighbours: [];
}

export interface ITable {
  [row: number]: {
    [col: number]: ICell;
  }
}
