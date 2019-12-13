import Vue from 'vue';
import Vuex from 'vuex';
import mines from './modules/mines';

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    mines,
  },
});
