<template>
    <div>
        <p slot="header" style="color:#f60;text-align:left">
            <Icon type="log-in" size="20"></Icon>
            <span style="font-size:14px;">登录</span>
        </p>
        <div slot="main" style="text-align:center;margin-top: 50px;">
            <Form ref="loginForm" :model="user" :rules="userLoginRule" :label-width="70" label-position="right">
                <Row style="padding-left: 20px;">
                    <Col span="21">
                    <Tabs>
                        <TabPane label="身份验证》" icon="person">
                            <FormItem
                                    label="手机号"
                                    prop="loginName" style="margin-top: 30px;">
                                <Row>
                                    <Col span="15">
                                    <Input type="text" v-model="user.loginName" placeholder="请输入手机号"></Input>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                    label="密码"
                                    prop="password" style="margin-top: 30px;">
                                <Row>
                                    <Col span="15">
                                    <Input type="password" v-model="user.password" placeholder="请输入密码"></Input>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <div style="text-align: left;">
                                    <Button @click="login('loginForm')" type="ghost" size="large" :loading="false"
                                            style="min-width: 100px;">登录
                                    </Button>

                                    <p title="点击注册账号" style="width:60px;margin-top: 15px;color: blue;cursor: pointer;"
                                       @click="showRegModalFunction">没有账号？</p>
                                </div>
                            </FormItem>
                        </TabPane>
                    </Tabs>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
</template>
<script>
    import store from 'store/';
    import Cookies from 'js-cookie';

    export default {
        name: 'header',
        props: [],
        data() {
            return {
                user: {
                    loginName: '',
                    password: ''
                },
                userLoginRule: {
                    loginName: [
                        {required: true, message: '登录账号不能为空', trigger: 'blur'},
                        {type: 'string', min: 6, max: 18, message: '请输入6~18位账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {type: 'string', min: 6, max: 32, message: '密码长度6~32位', trigger: 'blur'}
                    ]
                }
            }
        },
        components: {},
        methods: {
            sendVerifyCode() {

            },
            showRegModalFunction() {
                this.$emit('showRegModalFunction')
            },
            login(refName) {
                this.$refs[refName].validate((valid) => {
                    if (valid) {
                        store.dispatch('Login', this.user).then(res => { // 拉取user_info
                            var resp = res.data;
                            if (resp.success == true) {
                                this.$Message.success('登录成功!');
                                var user = resp.payload;
                                Cookies.set('USER-INFO', user);
                                window.location.reload();
                            } else {
                                this.$Message.error('登录失败:' + resp.msg);
                            }
                        }).catch(res => {
                            this.$Message.error(res.data.msg);
                        })
                    } else {
                        this.$Message.error('请检查后在登录');
                    }
                })
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