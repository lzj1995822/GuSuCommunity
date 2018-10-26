<template>
    <div class="app-wrapper">
        <div class="drawer-bg"></div>
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <!--<tags-view></tags-view>-->
            <!--<app-main></app-main>-->
        </div>
    </div>
</template>

<script>
    import Sidebar from './components/SideBar'

    export default {
        name: 'layout',
        components: {
            Sidebar
        },
        computed: {
        },
        methods: {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>
