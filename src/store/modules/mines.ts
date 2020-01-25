/* eslint-disable no-unused-expressions */
import { ActionContext } from 'vuex';
import { createTable } from '@/algorithm/createTable';
import {
  IRootState,
  IMinesState,
  ITable,
  IConfig,
} from '@/types';
import { areAllCellsOpen } from '@/utils/areAllCellsOpen';

const state: IMinesState = {
  mines_table: createTable({ rows: 9, cols: 9, bombs: 9 }),
  rows_count: 9,
  cols_count: 9,
  bombs_count: 9,
  cells_open: 0,
  flags_count: 9,
};

const getters = {
  // purpose of rows and cols getters
  // is to be able to render contents of table
  // by having array of indexes,
  // this way we won't have to mess around with Object.values/keys
  rows: (state: IMinesState) => (
    [...new Array(state.rows_count)].map((val, i) => i)
  ),

  cols: (state: IMinesState) => (
    [...new Array(state.cols_count)].map((val, i) => i)
  ),

  mines_table: (state: IMinesState) => (
    state.mines_table
  ),
};

const actions = {
  openCell(
    { commit }: ActionContext<IMinesState, IRootState>,
    cell_position: { row: number, col: number },
  ) {
    const { row, col } = cell_position;
    const this_cell = state.mines_table[row][col];
    const {
      rows_count,
      cols_count,
      bombs_count,
    } = state;

    if (this_cell.has_bomb) {
      commit('setGameOver', true, { root: true });
      commit('setGameResult', 'loss', { root: true });
      commit('openCell', {
        row,
        col,
      });
      return null;
    }

    commit('openCell', {
      row,
      col,
    });

    if (areAllCellsOpen(state.cells_open, rows_count, cols_count, bombs_count)) {
      commit('setGameOver', true, { root: true });
      commit('setGameResult', 'win', { root: true });
    }

    return null;
  },

  openEmptyCell(
    { commit }: ActionContext<IMinesState, IRootState>,
    cell_position: { row: number, col: number },
  ) {
    const { row, col } = cell_position;
    const {
      rows_count,
      cols_count,
      bombs_count,
    } = state;

    commit('openEmptyCell', {
      row,
      col,
    });

    if (areAllCellsOpen(state.cells_open, rows_count, cols_count, bombs_count)) {
      commit('setGameOver', true, { root: true });
      commit('setGameResult', 'win', { root: true });
    }
  },

  toggleFlagCell(
    { commit }: ActionContext<IMinesState, IRootState>,
    cell_position: { row: number, col: number },
  ) {
    const { row, col } = cell_position;

    commit('toggleFlagCell', {
      row,
      col,
    });
  },
};

const mutations = {
  openCell(state: IMinesState, cell_position: { row: number, col: number }) {
    const { row, col } = cell_position;

    state.mines_table[row][col].is_open = true;
    state.cells_open += 1;
  },

  openEmptyCell(state: IMinesState, cell_position: { row: number, col: number }) {
    const { row, col } = cell_position;

    const openRecursively = (table: ITable, row: number, col: number): null => {
      // stop recursion if cell is open
      if (table[row][col].is_open) {
        return null;
      }

      // stop recursion if cell contains bombs around it
      if (table[row][col].bombs_around) {
        state.cells_open += 1;
        table[row][col].is_open = true;
        return null;
      }

      table[row][col].is_open = true;
      state.cells_open += 1;

      const { neighbours } = table[row][col];
      // recursive case
      neighbours.forEach((n, i) => {
        setTimeout(() => {
          openRecursively(table, n.row, n.col);
        }, 50 * i);
      });

      return null;
    };

    openRecursively(state.mines_table, row, col);
  },

  toggleFlagCell(state: IMinesState, cell_position: { row: number, col: number }) {
    const { row, col } = cell_position;
    const this_cell = state.mines_table[row][col];

    if (state.flags_count === 0) {
      return null;
    }

    this_cell.is_flagged = !this_cell.is_flagged;


    this_cell.is_flagged
      ? state.flags_count -= 1
      : state.flags_count += 1;
  },

  generateTable(state: IMinesState, config: IConfig) {
    state.mines_table = createTable(config);
    const { difficulty } = config;

    if (difficulty === 'easy') {
      state.cols_count = 9;
      state.rows_count = 9;
      state.bombs_count = 9;
    }

    if (difficulty === 'normal') {
      state.cols_count = 16;
      state.rows_count = 16;
      state.bombs_count = 40;
    }

    if (difficulty === 'hard') {
      state.cols_count = 30;
      state.rows_count = 16;
      state.bombs_count = 99;
    }
  },

  resetOpenCellsCount(state: IMinesState) {
    state.cells_open = 0;
  },

  resetFlagsCount(state: IMinesState) {
    state.flags_count = state.bombs_count;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
