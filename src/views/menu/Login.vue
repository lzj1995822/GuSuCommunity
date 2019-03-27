<template>
    <div class="login-container">
        <el-form class="login-form" inline autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" >
            <el-form-item prop="code" label="登录名" style="margin-right: 5%;" >
                <!--<span class="svg-container svg-container_login">
                  <icon name="user" scale="2.5"></icon>
                </span>-->
                <el-input name="code" size="small" type="text" v-model="loginForm.code" autoComplete="on" placeholder="code"></el-input>
            </el-form-item>

            <el-form-item prop="password" label="密码" style="margin-right: 5%" >
                <!--<span class="svg-container">
                  <icon name="password" scale="2"/>
                </span>-->
                <el-input name="password" size="small" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd">
                    <icon name="eye" scale="2"/>
                </span>
            </el-form-item>
            <el-form-item>
                <el-button  size="small"  :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
import regex from '@/utils/regex';
import DynamicRoutes from '@/utils/dynamic-routes';
import cache from "../../utils/cache";

export default {
    name: 'login',
    data () {
        return {
            src:"https://www.baidu.com",
            loginForm: {
                code: '',
                password: ''
            },
            loginRules: {
                code: [
                    { required: true, trigger: 'blur', message: "请输入用户名" },
                    { pattern: regex.low_case, trigger: 'blur', message: "请输入小写用户名"}
                ],
                password: [
                    { required: true, trigger: 'blur', message: "请输入用户名" },
                    { pattern: /^[0-9]+$/ , trigger: 'blur', message: "请输入小写用户名"}
                ]
            },
            passwordType: 'password',
            loading: false,
            showDialog: false,
        };
    },
    methods: {
        showPwd () {
            this.passwordType = this.passwordType === 'password' ? '' : 'password';
        },
        handleLogin () {
            this.loading = true;
            this.$http('POST', `/identity/principal/login`, this.loginForm).then(data => {
                let token = data.split("$")[0];
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', this.loginForm.code);
                return data.split("$")[1];
            }).then((userId) => {
                this.$http('GET',`/identity/principal/${userId}id`,false).then(data => {
                    sessionStorage.setItem('userInfo',JSON.stringify(data));
                });
                this.$http('GET', `/identity/roleMenu/menu`, false).then(data => {
                    sessionStorage.setItem("menu",JSON.stringify(data));
                    this.$store.commit("getMenu",data);
                    DynamicRoutes.transfer(data);
                    this.$router.addRoutes(data);
                    this.$router.push({path: '/index/homeMap'});
                    this.loading = false;
                });
            });
        }
    },
    created () {
        // window.addEventListener('hashchange', this.afterQRScan)
    },
    mounted(){

    },
    destroyed () {
        // window.removeEventListener('hashchange', this.afterQRScan)
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #889aa4;

    /* reset element-ui css */
    .login-container {
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $dark_gray: #2d3a4b;
    $light_gray: #889aa4;

    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        //<!--background-color: $bg;-->
        background-image: url("../../../static/img/login.png");
        background-size: cover;
        .login-form {
            position: absolute;
            left: calc(100vw/1980*400);
            right: 0;
            width: 50%;
            height: 5%;
            /*padding: 35px 35px 15px 35px;*/
            margin-top: calc(100vw/1980*820) ;
            text-align: left;

        }
        .el-form-item__label {
            color: #6e2f0b !important
        }
        .el-input__inner {
            border-color:  #6e2f0b !important;
            border-radius: 0px;
        }
        .el-button {
            background: #6e2f0b !important;
            border: none;
            color: #fff;
            font-weight: 600;
        }
        i {
            font-size: 12px !important;
        }
        .tips {
            font-size: 14px;
            color: darkgray;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title-container {
            position: relative;
            .title {
                font-size: 24px;
                font-weight: 400;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: left;
                font-weight: bold;
            }
            .set-language {
                color: #fff;
                position: absolute;
                top: 5px;
                right: 0px;
            }
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
        .thirdparty-button {
            position: absolute;
            right: 35px;
            bottom: 28px;
        }
    }
    svg {
        -webkit-margin-before: 4px;
    }
</style>
