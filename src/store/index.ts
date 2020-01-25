import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import mines from './modules/mines';
import { IConfig, IRootState } from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    game_over: false,
    game_result: 'unset',
    difficulty: 'unset',
  },
  actions: {
    startOver(
      { commit }: ActionContext<IRootState, IRootState>,
      config: IConfig,
    ) {
      commit('setGameOver', false);
      commit('setGameResult', 'unset');
      commit('setDifficulty', config.difficulty);
      commit('mines/generateTable', config);
      commit('mines/resetOpenCellsCount');
      commit('mines/resetFlagsCount');
    },
  },
  mutations: {
    setGameOver(state: IRootState, status) {
      state.game_over = status;
    },

    setGameResult(state: IRootState, result) {
      state.game_result = result;
    },

    setDifficulty(state: IRootState, difficulty) {
      state.difficulty = difficulty;
    },
  },
  modules: {
    mines,
  },
});
