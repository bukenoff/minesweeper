/* eslint-disable no-unused-expressions */
import { ITable, ICell } from '@/types';
import utils from './utils';
import { generateRandomIndexes } from './generateRandomIndexes';
import { assignNeighbours } from './assignNeighbours';

export const createInitialTable = (
  rows: number = 9,
  cols: number = 9,
  bombs: number = 9,
): ITable => {
  const table: ITable = {};

  [...new Array(rows)].forEach((row, row_index) => {
    table[row_index] = {};

    [...new Array(cols)].forEach((col, col_index) => {
      table[row_index][col_index] = {
        id: `${row_index}${col_index}`,
        has_bomb: false,
        row: row_index,
        col: col_index,
        position: utils.setCellPosition(row_index, col_index),
        is_open: false,
        bombs_around: 0,
        is_flagged: false,
        neighbours: assignNeighbours(row_index, col_index),
      };
    });
  });

  return table;
};

const assignBombs = (table: ITable): void => {
  const random_indexes = generateRandomIndexes(9, 9, 9);

  random_indexes.forEach((index) => {
    const [row, col] = index.split('').map(str => +str);

    const { neighbours } = table[row][col];
    neighbours.forEach((n) => {
      table[n.row][n.col].bombs_around += 1;
    });

    table[row][col].has_bomb = true;
  });
};

export const createFinalTable = (): ITable => {
  const table = createInitialTable(9, 9, 9);
  assignBombs(table);

  return table;
};
