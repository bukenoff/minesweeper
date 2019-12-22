import Vue from 'vue';
import Vuex from 'vuex';
import mines from './modules/mines';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game_over: false,
    game_result: 'unset',
  },
  actions: {
    startOver({ commit }: any) {
      commit('setGameOver', false);
      commit('setGameResult', 'unset');
      commit('mines/generateTable');
      commit('mines/resetOpenCellsCount');
    },
  },
  mutations: {
    setGameOver(state: any, status) {
      state.game_over = status;
    },

    setGameResult(state: any, result) {
      state.game_result = result;
    },
  },
  modules: {
    mines,
  },
});
