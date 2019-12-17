/* eslint-disable no-unused-expressions */
import { createFinalTable } from '@/algorithm/createTable';
import { IMinesState, ITable } from '@/types';

const state: IMinesState = {
  mines_table: createFinalTable(),
  rows_count: 9,
  cols_count: 9,
  bombs_count: 9,
  mines_open: 0,
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
  openCell({ commit }: any, cell_position: { row: number, col: number }) {
    const { row, col } = cell_position;
    const this_cell = state.mines_table[row][col];

    if (this_cell.has_bomb) {
      commit('setGameStatus', true, { root: true });
    }

    commit('openCell', {
      row,
      col,
    });

    commit('incrementMinesOpen');

    return null;
  },

  openEmptyCell({ commit }: any, cell_position: { row: number, col: number }) {
    const { row, col } = cell_position;

    commit('openEmptyCell', {
      row,
      col,
    });
  },

  toggleFlagCell({ commit }: any, cell_position: any) {
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
        table[row][col].is_open = true;
        return null;
      }

      table[row][col].is_open = true;

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

    this_cell.is_flagged = !this_cell.is_flagged;

    this_cell.is_flagged
      ? state.flags_count += 1
      : state.flags_count -= 1;
  },

  incrementMinesOpen(state: IMinesState) {
    state.mines_open += 1;
  },

  generateTable(state: IMinesState) {
    state.mines_table = createFinalTable();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
