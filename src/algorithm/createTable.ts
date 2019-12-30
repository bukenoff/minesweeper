/* eslint-disable no-unused-expressions */
import { ITable, IConfig } from '@/types';
import utils from './utils';
import { generateRandomIndexes } from './generateRandomIndexes';
import { assignNeighbours } from './assignNeighbours';

export const createInitialTable = ({
  rows,
  cols,
  bombs,
}: IConfig): ITable => {
  const table: ITable = {};

  [...new Array(rows)].forEach((und_r, row_index) => {
    table[row_index] = {};

    [...new Array(cols)].forEach((und_c, col_index) => {
      table[row_index][col_index] = {
        id: `${row_index}${col_index}`,
        has_bomb: false,
        row: row_index,
        col: col_index,
        position: utils.setCellPosition(row_index, col_index, rows, cols),
        is_open: false,
        bombs_around: 0,
        is_flagged: false,
        neighbours: assignNeighbours(row_index, col_index, rows, cols),
      };
    });
  });

  return table;
};

const assignBombs = (
  table: ITable,
  { rows, cols, bombs }: IConfig,
): void => {
  const random_indexes = generateRandomIndexes({ rows, cols, bombs });

  random_indexes.forEach((index) => {
    const [row, col] = index.split('-').map(str => +str);

    const { neighbours } = table[row][col];
    neighbours.forEach((n) => {
      table[n.row][n.col].bombs_around += 1;
    });

    table[row][col].has_bomb = true;
  });
};

export const createFinalTable = ({
  rows,
  cols,
  bombs,
}: IConfig): ITable => {
  const table = createInitialTable({ rows, cols, bombs });
  assignBombs(table, { rows, cols, bombs });

  return table;
};
