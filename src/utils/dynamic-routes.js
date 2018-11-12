/**
 * 动态路由相关js（后台配置）
 */
export default {
    /**
     * 将路由component属性转成对应组件对象
     * */
     transfer(routers) {
         routers.forEach(item => {
            if (item.name === 'Home') {
                item.component = () => import(`@/layout/Layout.vue`);
            } else {
                item.component = () => import(`@/views/menu/${item.name}.vue`);
            }
            item.meta.classInfo = item.sysClass;
            if (item.children) {
                this.transfer(item.children);
            }
         });
    },

    /**
     * 页面刷新Vue根实例重新生成，动态路由需要重新添加
     */
    flushHandler(router, store) {
        let menu = sessionStorage.getItem('menu');
        if (menu) {
            menu = JSON.parse(menu);
            this.transfer(menu);
            router.addRoutes(menu);
            store.commit("getMenu",menu);
        }
    }
}
