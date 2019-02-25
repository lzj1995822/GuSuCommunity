<template>
    <div id="app">
        <div class="header-bg"></div>
        <router-view></router-view>

    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
        };
    },
    components: {
    },
    methods: {
    }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
  .el-input--small .el-input__inner {
      height: 32px;
      line-height: 46px;
  }
    .el-select {
        width: 178px !important;
    }
    .header-bg {
        width: 100% ;
        height: 87px;
        background: url("../static/img/top.png") no-repeat;
        background-size: 100% 100%;
    }
</style>
