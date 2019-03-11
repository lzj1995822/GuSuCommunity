<template>
    <section>
        <el-menu text-color="#fff" active-text-color="#ffd04b" mode="horizontal" background-color="#00000000" router  unique-opened  class="el-menu-personal">
            <div v-for="item in routes" :key="item.name" class="first_menu">
                <!-- 有子菜单 -->
                <!--<el-submenu :index="item.path" v-if="item.children&&item.children.length">-->
                    <!--<template slot="title">-->
                        <!--&lt;!&ndash;<icon :name="item.meta.icon" scale="1.5"></icon>&ndash;&gt;-->
                        <!--<span slot="title">{{item.meta && item.meta.title}}</span>-->
                    <!--</template>-->
                    <!--&lt;!&ndash;<el-menu-item :index="item.path+'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<icon :name="subItem.meta.icon" scale="1.5"></icon>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;<span slot="title">{{subItem.meta && subItem.meta.title}}</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</el-menu-item>&ndash;&gt;-->
                <!--</el-submenu>-->
                <!-- 没有子菜单 -->
                <el-menu-item :index="item.path">
                    <!--<icon :name="item.meta.icon" scale="1.5"></icon>-->
                    <div slot="title">{{item.meta && item.meta.title}}</div>
                </el-menu-item>
            </div>
        </el-menu>
    </section>
</template>
<script>
    export default {
        name: 'sidebar',
        data() {
            return {
            }
        },
        computed: {
            routes() {
                return this.$store.state.menuList;
            }
        },
        watch: {
            '$route.name' : function () {
                let matched = this.$route.matched;
                this.$store.commit("getClassInfo", matched[matched.length-1].meta.classInfo);
            }
        },
        methods: {
        },
        mounted() {
        }
    }
</script>
<style>
    .scrollbar_view {
        height: 100%;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
    .el-menu-personal {
        background-image: url("../../../static/img/menu.png");
        background-size: cover;
        height: inherit;
        text-align: center;
    }
    svg {
        margin: 0;
    }
    .el-submenu__title {
        width: calc(100vw/1920*235) !important;
        height: calc(100vw/1920*53) !important;
        font-size: calc(100vw/1920*22) !important;
        line-height: calc(100vw/1920*52) !important;
    }
    .first_menu {
        width: calc(100vw/1920*235);
        height: calc(100vw/1920*52);
        background: url("../../../static/img/menubg.png");
        background-size: 100% 100%;
        display: inline-block;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
        color: #303133;
    }
    .el-breadcrumb__separator {
        color: #303133;
    }
    .el-menu--horizontal li.el-menu-item {
        padding-left: 15% !important;
        width: calc(100vw/1920*235);
        font-size: calc(100vw/1920*24) !important;
        height: 100%;
        /*border-bottom: rgba(255, 255, 255, .8) 1px solid;*/
    }
    i.el-submenu__icon-arrow {
        display: none;
    }
    .el-menu-item, .el-submenu__title {
        line-height: calc(100vw/1920*54) !important;
    }
</style>

