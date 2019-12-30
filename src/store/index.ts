import Vue from 'vue';
import Vuex from 'vuex';
import mines from './modules/mines';
import { IConfig } from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game_over: false,
    game_result: 'unset',
    difficulty: 'unset',
  },
  actions: {
    startOver({ commit }: any, config: IConfig) {
      commit('setGameOver', false);
      commit('setGameResult', 'unset');
      commit('setDifficulty', config.difficulty);
      commit('mines/generateTable', config);
      commit('mines/resetOpenCellsCount');
      commit('mines/resetFlagsCount');
    },
  },
  mutations: {
    setGameOver(state: any, status) {
      state.game_over = status;
    },

    setGameResult(state: any, result) {
      state.game_result = result;
    },

    setDifficulty(state: any, difficulty) {
      state.difficulty = difficulty;
    },
  },
  modules: {
    mines,
  },
});
