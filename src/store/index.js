import Vue from 'vue';
import Vuex from 'vuex';
import tagsView from './tagsView';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        tagsView
    },
    state: {
        menuList: [],
        classInfo: {}
    },
    mutations: {
        getMenu(state, data) {
            state.menuList = data;
        },
        getClassInfo(state, data) {
            state.classInfo = data;
        }
    }
})
