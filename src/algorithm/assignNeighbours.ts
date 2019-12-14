import { INeighbour } from '@/types';

// this is some overly complicated piece of shit
// should think about refactoring that somehow
// anyway, how's your saturday going so far?
export const assignNeighbours = (row_index: number, col_index: number): INeighbour[] => {
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

  if (row_index === 0 && col_index === 8) {
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

  if (row_index === 8 && col_index === 0) {
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

  if (row_index === 8 && col_index === 8) {
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

  if (row_index === 8) {
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

  if (col_index === 8) {
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
