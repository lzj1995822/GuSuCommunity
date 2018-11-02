<template>
    <div class="login-container">
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="title-container">
                <h3 class="title">登 录</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                  <icon name="user" scale="2.5"></icon>
                </span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                  <icon name="password" scale="2"/>
                </span>
                <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd">
                    <icon name="eye" scale="2"/>
                </span>
            </el-form-item>

            <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>

        </el-form>

    </div>
</template>

<script>
import regex from '@/utils/regex';

export default {
    name: 'login',
    data () {
        return {
            src:"https://www.baidu.com",
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [
                    { required: true, trigger: 'blur', message: "请输入用户名" },
                    { pattern: regex.low_case, trigger: 'blur', message: "请输入小写用户名"}
                ],
                password: [
                    { required: true, trigger: 'blur', message: "请输入用户名" },
                    { pattern: regex.low_case, trigger: 'blur', message: "请输入小写用户名"}
                ]
            },
            passwordType: 'password',
            loading: false,
            showDialog: false
        };
    },
    methods: {
        showPwd () {
            this.passwordType = this.passwordType === 'password' ? '' : 'password';
        },
        handleLogin () {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    let data = [{
                        path: '/home',
                        name: 'Home',
                        meta: {
                            icon: 'form',
                            title: '大标题'
                        },
                        children: [{
                                path: '/12',
                                name: 'HelloWorld',
                                meta: {
                                    icon: 'form',
                                    title: '标题1'
                                },
                            }, {
                                path: '/login',
                                name: 'Login',
                                meta: {
                                    icon: 'form',
                                    title: '标题1'
                                },
                            }]
                    }];
                    this.$store.commit("getMenu",data);
                    this.transfer(data);
                    this.$router.addRoutes(data);
                    console.log(this.$router);
                    this.loading = true;
                    this.$router.push('/home');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        initRouters() {
            this.$http('GET', 'routers/getAllByPermission', false).then(data => {
            })
        },
        transfer(routers) {
            routers.forEach(item => {
                if (item.name == 'Home') {
                    item.component = () => import('@/layout/Layout');
                } else {
                    item.component = () => import(`@/views/menu/${item.name}.vue`);
                }
                if (item.children) {
                    this.transfer(item.children);
                }
            });
        }
    },
    created () {
        // window.addEventListener('hashchange', this.afterQRScan)
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
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }
        .el-form-item {
            border: 1px solid rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #2d3a4b;
    $light_gray: #889aa4;

    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: $bg;
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 430px;
            height: 400px;
            padding: 35px 35px 15px 35px;
            margin: 160px auto;
            background-color: rgba(255,255,255,1);
            border-radius: 5px;
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
                font-size: 26px;
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
</style>
