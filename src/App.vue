<template>
    <div id="app">
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
  /* 开始过渡阶段,动画出去阶段 */
  .fade-enter-active,.fade-leave-active{
      transition: all 0.5s ease-out;
  }
  /* 进入开始 */
  .fade-enter{
      transform: rotateY(90deg);
      opacity: 0;
  }
  /* 出去终点 */
  .fade-leave-active{
      transform: rotateY(-90deg);
      opacity: 0;
  }
  .el-input--small .el-input__inner {
      height: 32px;
      line-height: 46px;
  }
</style>
