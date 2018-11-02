import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/layout/components/NotFound';
import Login from '@/views/menu/Login';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/404',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
});
