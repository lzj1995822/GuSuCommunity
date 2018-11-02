// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.scss';
import Icon from 'vue-svg-icon/Icon.vue';
import { generate, common } from '@/api';
import store from '@/store'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(store);
Vue.component('icon', Icon);

Vue.prototype.$http = common.http;
Vue.prototype.$genHttp = generate;

console.log("3333333333333")
router.addRoutes(store.state.menuList);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
