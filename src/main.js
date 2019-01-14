// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.scss';
import Icon from 'vue-svg-icon/Icon.vue';
import { generate, common, getRouter } from '@/api';
import store from '@/store';
import DynamicRoutes from '@/utils/dynamic-routes';

Vue.config.productionTip = false;

Vue.use(ElementUI, {size: 'mini'});
Vue.use(store);
Vue.component('icon', Icon);

Vue.prototype.$http = common.http;
Vue.prototype.$genHttp = generate;
Vue.prototype.$copy = (target) => Object.assign({}, target);
getRouter(router);

DynamicRoutes.flushHandler(router, store);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
