<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu background-color="#363C42" text-color="#fff" active-text-color="#ffd04b" router  unique-opened>
            <div v-for="item in routes" :key="item.name">
                <!-- 有子菜单 -->
                <el-submenu :index="item.path" v-if="item.children&&item.children.length">
                    <template slot="title">
                        <icon :name="item.meta.icon" scale="2.5"/>
                        <span slot="title">{{item.meta && item.meta.title}}</span>
                    </template>
                    <el-menu-item :index="item.path+'/'+subItem.path" v-for="subItem in item.children" :key="subItem.name">
                        <icon :name="item.meta.icon" scale="2.5"/>
                        <span slot="title">{{subItem.meta && subItem.meta.title}}</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 没有子菜单 -->
                <el-menu-item :index="item.path" v-else>
                    <i :class="item.meta&&item.meta.icon || 'el-icon-success'"></i>
                    <span slot="title">{{item.meta&&item.meta.title}}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </el-scrollbar>
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
        methods: {

        }
    }
</script>

