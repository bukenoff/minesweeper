import Vue from 'vue';
import Vuex from 'vuex';
import mines from './modules/mines';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game_over: false,
  },
  mutations: {
    setGameStatus(state: any, status) {
      state.game_over = status;
    },
  },
  actions: {
    startOver({ commit }: any) {
      commit('setGameStatus', false);
      commit('generateTable');
    },
  },
  modules: {
    mines,
  },
});
