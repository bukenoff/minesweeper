import { INeighbour, RowsNumber, ColsNumber } from '@/types';

export const assignNeighbours = (
  row_index: number,
  col_index: number,
  rows_number: RowsNumber,
  cols_number: ColsNumber,
): INeighbour[] => {
  if (row_index === 0 && col_index === 0) {
    return [
      {
        row: row_index,
        col: col_index + 1,
      },
      {
        row: row_index + 1,
        col: col_index,
      },
      {
        row: row_index + 1,
        col: col_index + 1,
      },
    ];
  }

  if (row_index === 0 && col_index === (cols_number - 1)) {
    return [
      {
        row: row_index,
        col: col_index - 1,
      },
      {
        row: row_index + 1,
        col: col_index,
      },
      {
        row: row_index + 1,
        col: col_index - 1,
      },
    ];
  }

  if (row_index === (rows_number - 1) && col_index === 0) {
    return [
      {
        row: row_index,
        col: col_index + 1,
      },
      {
        row: row_index - 1,
        col: col_index,
      },
      {
        row: row_index - 1,
        col: col_index + 1,
      },
    ];
  }

  if (row_index === (rows_number - 1) && col_index === (cols_number - 1)) {
    return [
      {
        row: row_index,
        col: col_index - 1,
      },
      {
        row: row_index - 1,
        col: col_index,
      },
      {
        row: row_index - 1,
        col: col_index - 1,
      },
    ];
  }

  if (row_index === 0) {
    return [
      {
        row: row_index,
        col: col_index - 1,
      },
      {
        row: row_index,
        col: col_index + 1,
      },
      {
        row: row_index + 1,
        col: col_index,
      },
      {
        row: row_index + 1,
        col: col_index - 1,
      },
      {
        row: row_index + 1,
        col: col_index + 1,
      },
    ];
  }

  if (row_index === (rows_number - 1)) {
    return [
      {
        row: row_index,
        col: col_index - 1,
      },
      {
        row: row_index,
        col: col_index + 1,
      },
      {
        row: row_index - 1,
        col: col_index,
      },
      {
        row: row_index - 1,
        col: col_index - 1,
      },
      {
        row: row_index - 1,
        col: col_index + 1,
      },
    ];
  }

  if (col_index === (cols_number - 1)) {
    return [
      {
        row: row_index,
        col: col_index - 1,
      },
      {
        row: row_index - 1,
        col: col_index,
      },
      {
        row: row_index - 1,
        col: col_index - 1,
      },
      {
        row: row_index + 1,
        col: col_index - 1,
      },
      {
        row: row_index + 1,
        col: col_index,
      },
    ];
  }

  if (col_index === 0) {
    return [
      {
        row: row_index,
        col: col_index + 1,
      },
      {
        row: row_index - 1,
        col: col_index,
      },
      {
        row: row_index - 1,
        col: col_index + 1,
      },
      {
        row: row_index + 1,
        col: col_index + 1,
      },
      {
        row: row_index + 1,
        col: col_index,
      },
    ];
  }

  return [
    {
      row: row_index,
      col: col_index + 1,
    },
    {
      row: row_index,
      col: col_index - 1,
    },
    {
      row: row_index - 1,
      col: col_index + 1,
    },
    {
      row: row_index - 1,
      col: col_index,
    },
    {
      row: row_index - 1,
      col: col_index - 1,
    },
    {
      row: row_index + 1,
      col: col_index - 1,
    },
    {
      row: row_index + 1,
      col: col_index,
    },
    {
      row: row_index + 1,
      col: col_index + 1,
    },
  ];
};
