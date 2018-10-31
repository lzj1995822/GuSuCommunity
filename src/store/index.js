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
            {
                path: "/login",
                meta: { icon: 'chart', title: '登录' },
                component: () => import('@/views/Login'),
                children: [
                    {
                        path: "/login",
                        meta: { icon: 'chart', title: '登录' },
                        component: () => import('@/views/Login'),
                    }
                ]
            }, {
                path: "/component",
                meta: { icon: 'bug', title: '测试' },
                component: () => import('@/views/Login')
            },
        ]
    }
})
