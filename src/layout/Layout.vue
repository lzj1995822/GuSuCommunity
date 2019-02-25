<template>
    <div class="app-wrapper">
        <div class="header-bg"></div>
        <sidebar class="sidebar-container "></sidebar>
        <div class="main-container">
            <nav-bar></nav-bar>
            <!--<tags-view></tags-view>-->
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
    import Sidebar from './components/SideBar';
    import AppMain from './components/AppMain';
    import NavBar from './components/Navbar';

    export default {
        name: 'layout',
        components: {
            Sidebar,
            AppMain,
            NavBar
        },
        computed: {
        },
        methods: {
        },
        mounted() {
            let screenWidth = window.screen.width;
            let height = Math.ceil(screenWidth/1920*60);
            document.getElementsByClassName("header-bg")[0].style.height = `${height}px`;
            document.getElementsByClassName("sidebar-container")[0].style.top = `${height}px`;
            document.getElementsByClassName("sidebar-container")[0].style.height = `${window.screen.height -height}px`;
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
        background: #fff;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 1;
    }

    .sidebar-container {
        transition: width 0.28s;
        width: 200px !important;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }

    // 主体区域
    .main-container {
        transition: margin-left .28s;
        margin-left: 200px;
    }

    .header-bg {
        width: 100% ;
        background: url("../../static/img/top.png") no-repeat;
        background-size: 100% 100%;
    }
</style>
