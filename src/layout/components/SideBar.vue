<template>
    <section>
        <el-menu text-color="#fff" active-text-color="#ffd04b" mode="horizontal" background-color="#222" router  unique-opened  class="el-menu-personal">
            <span v-for="item in routes" :key="item.name" style="width: 155px;display: inline-block">
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
        background-image: url("../../../static/img/left.png");
        background-size: cover;
        height: inherit;
        text-align: center;
    }
    svg {
        margin: 0;
    }
    .el-submenu__title {
        line-height: 52px;
    }
</style>

