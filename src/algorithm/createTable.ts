import { ITable, ICell } from '@/types';
import utils from './utils';
import { generateRandomIndexes } from './generateRandomIndexes';

export const createInitialTable = (
  rows: number = 9,
  cols: number = 9,
  bombs: number = 9,
) => {
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
        flagged: false,
        neighbours: [],
      };
    });
  });

  return table;
};

const assignBombs = (table: ITable) => {
  const random_indexes = generateRandomIndexes(9, 9, 9);

  random_indexes.forEach((index) => {
    const [row, col] = index.split('').map(str => +str);

    table[row][col].has_bomb = true;
  });
};

export const createFinalTable = () => {
  const table = createInitialTable(9, 9, 9);
  assignBombs(table);

  return table;
};
