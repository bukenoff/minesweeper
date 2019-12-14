import { createFinalTable } from '@/algorithm/createTable';

const state: any = {
  mines_table: createFinalTable(),
  rows_count: 9,
  cells_count: 9,
};

// getters
const getters = {
  rows: (state: any) => (
    [...new Array(state.rows_count)].map((val, i) => i)
  ),

  cells: (state: any) => (
    [...new Array(state.cells_count)].map((val, i) => i)
  ),

  mines_table: (state: any) => (
    state.mines_table
  ),
};

// actions
const actions = {
  openCell({ commit }: any, cell_position: any) {
    commit('openCell', {
      row: cell_position.row,
      col: cell_position.col,
    });
  },
  toggleFlagCell({ commit }: any, cell_position: any) {
    commit('toggleFlagCell', {
      row: cell_position.row,
      col: cell_position.col,
    });
  },
};

// mutations
const mutations = {
  openCell(state: any, cell_position: any) {
    const { row, col } = cell_position;
    state.mines_table[row][col].is_open = true;
  },

  toggleFlagCell(state: any, cell_position: any) {
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
