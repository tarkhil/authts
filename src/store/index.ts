import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
    userName: null,
}
export type State = typeof state
export default new Vuex.Store({
    state,
    getters: {
	userName: (state) => state.userName,
    },
    mutations: {
	userName( state, name ) {
	    state.userName = name;
	},
    },
  actions: {},
  modules: {}
});
