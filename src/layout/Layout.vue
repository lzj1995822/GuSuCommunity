<template>
    <div class="app-wrapper">
        <div class="header-bg"></div>
        <sidebar class="sidebar-container"></sidebar>
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
            let headerHeight = this.$screen() * 156;
            let menuHeight = this.$screen() * 53;
            document.getElementsByClassName("header-bg")[0].style.height = `${Math.ceil(headerHeight)}px`;
            document.getElementsByClassName('sidebar-container')[0].style.height = `${Math.ceil(menuHeight)}px`;
            document.getElementsByClassName('main-container')[0].style.minHeight = `${Math.ceil(document.body.clientHeight - headerHeight - menuHeight)}px`;
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
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }

    // 主体区域
    .main-container {
        /*width: 90%;*/
        /*height: 80%;*/
        /*margin: 35px auto;*/
        transition: margin-left .28s;
        box-shadow: gray 1px 1px 2px;
        background: url("../../static/img/bg.png") no-repeat;
        /*overflow: hidden;*/
    }

    .header-bg {
        width: 100% ;
        background: url("../../static/img/top.png") no-repeat;
        background-size: 100% 100%;
    }
    html, body {
        /*overflow: hidden;*/
    }
</style>
