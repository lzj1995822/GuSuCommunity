import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menuList: [
            {
                path: "/login",
                meta: { icon: 'chart', title: '登录' },
                component: () => import('@/views/login/Login')
            }, {
                path: "/component",
                meta: { icon: 'bug', title: '测试' },
                component: () => import('@/views/login/Login')
            },
        ]
    }
})
