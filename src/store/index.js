import Vue from "vue";
import Vuex from "vuex";
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations'
import state from './state'

import VuexPersistence from 'vuex-persist';

// 调试,开发模式开启严格模式，要使用mutations提交
const debug = process.env.NODE_ENV !== 'production'
/**
 *  vuex持续化存储
 */
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: [vuexLocal.plugin]
});
