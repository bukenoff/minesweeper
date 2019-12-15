import { createFinalTable } from '@/algorithm/createTable';
import { IMinesState, ITable } from '@/types';

const state: IMinesState = {
  mines_table: createFinalTable(),
  rows_count: 9,
  cols_count: 9,
  bombs_count: 9,
};

// getters
const getters = {
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

// actions
const actions = {
  openCell({ commit }: any, cell_position: { row: number, col: number }) {
    const { row, col } = cell_position;

    commit('openCell', {
      row,
      col,
    });
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

// mutations
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
        }, 100 * i);
      });

      return null;
    };

    openRecursively(state.mines_table, row, col);
  },

  toggleFlagCell(state: IMinesState, cell_position: { row: number, col: number }) {
    const { row, col } = cell_position;
    state.mines_table[row][col].is_flagged = !state.mines_table[row][col].is_flagged;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
