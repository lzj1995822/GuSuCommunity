<template>
    <div id="app">
        <img src="./assets/logo.png">
        <el-form class="login_form" :model="loginForm" ref="loginForm" status-icon :rules="rules">
            <p class="title">嘉展科技有限公司</p>
            <el-form-item prop="code">
                <el-input v-model.trim="loginForm.userName" auto-complete="off">
                    <i class="fa fa-user" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model.trim="loginForm.userPassword" type="password" @keyup.native.enter="login">
                    <i class="fa fa-lock" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-button class="login-btn" type="primary" @click="login">登录</el-button>
        </el-form>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            loginForm: {},
            rules: {
                userName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                userPassword: [{required: true, message: '请输入密码', trigger: 'blur'}]
            }
        };
    },
    methods: {
        login () {
            this.$http('POST', '/token/login', this.loginForm, true).then(data => {
                sessionStorage.setItem('token', data.token);
            });
            // this.$genHttp.getUserInfos('1');
            // this.$genHttp.putUserInfos('1', {name: 'name', password: 'password'});
            // this.$genHttp.deleteUserInfos('1');
            // this.$genHttp.postUserInfos({name: 'name', password: 'password'});
        }
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
    margin-top: 60px;
  }
</style>
