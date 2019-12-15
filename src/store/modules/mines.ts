import { createFinalTable } from '@/algorithm/createTable';
import { IMinesState } from '@/types';

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
