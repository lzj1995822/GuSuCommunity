<template>
    <section>
        <el-menu text-color="#fff" active-text-color="#ffd04b" mode="horizontal" background-color="#00000000" router  unique-opened  class="el-menu-personal">
            <span v-for="item in routes" :key="item.name" class="first_menu">
                <!-- 有子菜单 -->
                <el-submenu :index="item.path" v-if="item.children&&item.children.length">
                    <template slot="title">
                        <icon :name="item.meta.icon" scale="1.5"></icon>
                        <span slot="title">{{item.meta && item.meta.title}}</span>
                    </template>
                    <el-menu-item :index="item.path+'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
                        <icon :name="subItem.meta.icon" scale="1.5"></icon>
                        <span slot="title">{{subItem.meta && subItem.meta.title}}</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 没有子菜单 -->
                <el-menu-item :index="item.path" v-else>
                    <icon :name="item.meta.icon" scale="1.5"></icon>
                    <span slot="title">{{item.meta && item.meta.title}}</span>
                </el-menu-item>
            </span>
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
            document.getElementsByClassName('el-submenu__title').forEach(item => {
                item.style.height = `${Math.ceil(this.$screen() * 53)}px`;
                item.style.width = `${Math.ceil(this.$screen() * 235)}px`;
            })
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
        background-color: #825f37 !important;
        font-size: calc(100vw/1920*16) !important;
        /*border-bottom: rgba(255, 255, 255, .8) 1px solid;*/
    }
</style>

