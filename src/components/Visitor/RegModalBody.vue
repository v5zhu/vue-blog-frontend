<template>
    <div>
        <p slot="header" style="color:#f60;text-align:left">
            <Icon type="ios-pulse-strong" size="20"></Icon>
            <span style="font-size:14px;">注册</span>
        </p>
        <div slot="main" style="text-align:center">
            <Form ref="regForm" :model="user" :label-width="70" label-position="right">
                <Row style="padding-left: 20px;">
                    <Col span="14">
                    <Form-item style="margin-left: 60px;" prop="name" label="注册进度"
                               label-position="top">
                        <i-circle
                                :size="100"
                                :trail-width="5"
                                :stroke-width="6"
                                :percent="regProcess"
                                stroke-linecap="square"
                                stroke-color="red">
                            <div class="demo-i-circle-custom">
                            </div>
                        </i-circle>
                    </Form-item>

                    <FormItem
                            label="手机号"
                            prop="loginName"
                            :rules="{required: true, message: '请输入手机号码', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                            <Input type="text" v-model="user.loginName" placeholder="请输入手机号"
                                   @blur="updateProcess()"></Input>
                            </Col>
                            <Col span="4" offset="1">
                            <Button type="ghost" @click="sendVerifyCode">发送验证码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                            label="验证码"
                            prop="verifyCode"
                            :rules="{required: true, message: '请输入验证码', trigger: 'blur'}">
                        <Row>
                            <Col span="8">
                            <Input type="text" v-model="user.verifyCode" placeholder="验证码"
                                   v-on:blur="updateProcess()"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                            label="密码"
                            prop="password"
                            :rules="{required: true, message: '请输入密码', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                            <Input type="text" v-model="user.password" placeholder="请输入密码"
                                   v-on:blur="updateProcess()"></Input>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem
                            label="确认密码"
                            prop="confirmPassword"
                            :rules="{required: true, message: '请再次输入密码', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                            <Input type="text" v-model="user.confirmPassword" placeholder="请再次输入密码"
                                   v-on:blur="updateProcess()"></Input>
                            </Col>
                        </Row>
                    </FormItem>

                    </Col>
                    <Col span="24">
                    </Col>
                </Row>
            </Form>
        </div>
        <div slot="footer" style="text-align: left;padding-left: 90px;">
            <Button type="ghost" size="large" :loading="false" style="min-width: 100px;">注册
            </Button>
        </div>
    </div>
</template>
<script>


    export default {
        name: 'header',
        props: [],
        data() {
            return {
                user: {
                    id: '',
                    loginName: '',
                    password: '',
                    confirmPassword: '',
                    verifyCode: '',
                    email: '',
                    homeUrl: '',

                },
                regProcess: 0
            }
        },
        components: {},
        methods: {
            sendVerifyCode() {

            },
            updateProcess() {
                alert(this.regProcess);
            }
        }
    }
</script>

<style type="text/css" scoped>

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        cursor: pointer;
        /*border-bottom: 2px solid #9affab;*/
    }
</style>
