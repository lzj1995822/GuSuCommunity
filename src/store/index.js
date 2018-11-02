import Vue from 'vue';
import Vuex from 'vuex';
import tagsView from './tagsView';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tagsView
    },
    state: {
        menuList: [
        ]
    },
    mutations: {
        getMenu(state, data) {
            state.menuList = data;
        }
    }
})
