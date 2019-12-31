export type BombsNumber = 9 | 40 | 99;

export type ColsNumber = 9 | 16 | 30;

export type RowsNumber = 9 | 16 | 30;

export interface INeighbour {
  row: number;
  col: number;
}

export interface ICell {
  id: string;
  row: number;
  col: number;
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

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface IMinesState {
  mines_table: ITable;
  rows_count: RowsNumber;
  cols_count: ColsNumber;
  bombs_count: BombsNumber;
  cells_open: number;
  flags_count: number;
}

export interface IConfig {
  rows: RowsNumber;
  cols: ColsNumber;
  bombs?: BombsNumber;
  difficulty?: Difficulty;
}
