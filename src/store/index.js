import Vue from "vue";
import Vuex from "vuex";
import viewer from "./modules/viewer.js"
import position from "./modules/position.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    viewer,
    position
  }
});
