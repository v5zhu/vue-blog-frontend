<template>
    <div>
        <p slot="header" style="color:#f60;text-align:left">
            <Icon type="ios-pulse-strong" size="20"></Icon>
            <span style="font-size:14px;">注册</span>
        </p>
        <div slot="main" style="text-align:center;margin-top: 50px;">
            <Form ref="regForm" :model="user" :rules="userRegRule" :label-width="70" label-position="right">
                <Row style="padding-left: 20px;">
                    <Col span="21">
                        <Tabs>
                            <TabPane label="手机验证》" icon="iphone">
                                <FormItem
                                        label="手机号"
                                        prop="phone" style="margin-top: 30px;">
                                    <Row>
                                        <Col span="15">
                                            <Input type="text" v-model="user.phone" placeholder="请输入手机号"></Input>
                                        </Col>
                                        <Col span="4" offset="1">
                                            <Button type="ghost" :disabled="sendBtnDisabled" @click="sendVerifyCode">
                                                {{sendBtnContent}}
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem
                                        label="验证码"
                                        prop="verifyCode">
                                    <Row>
                                        <Col span="8">
                                            <Input type="text" v-model="user.verifyCode" placeholder="验证码"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </TabPane>
                            <TabPane label="设置密码》" icon="ios-locked-outline">
                                <FormItem
                                        label="密码"
                                        prop="password" style="margin-top: 30px;">
                                    <Row>
                                        <Col span="15">
                                            <Input type="text" v-model="user.password" placeholder="请输入密码"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem
                                        label="确认密码"
                                        prop="confirmPassword">
                                    <Row>
                                        <Col span="15">
                                            <Input type="text" v-model="user.confirmPassword"
                                                   placeholder="请再次输入密码"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </TabPane>
                            <TabPane label="设置网名" icon="social-github">
                                <FormItem
                                        label="昵称"
                                        prop="nickname" style="margin-top: 30px;">
                                    <Row>
                                        <Col span="15">
                                            <Input type="text" v-model="user.nickname" placeholder="请输入昵称"></Input>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem>
                                    <div style="text-align: left;">
                                        <Button @click="register('regForm')" type="ghost" size="large" :loading="false"
                                                style="min-width: 100px;">注册
                                        </Button>
                                    </div>
                                </FormItem>
                            </TabPane>
                        </Tabs>
                        <p title="立即登录" style="width:120px;margin:15px 20px;color: blue;cursor: pointer;"
                           @click="showLoginModalFunction">已有账号，前往登录》</p>
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
                    id: '',
                    phone: null,
                    password: '',
                    confirmPassword: '',
                    verifyCode: '',
                    nickname: '',
                    homeUrl: ''
                },
                userRegRule: {
                    phone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {type: 'string', min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'}
                    ],
                    verifyCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {type: 'string', min: 6, max: 6, message: '请输入6位手机验证码', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {type: 'string', min: 6, max: 32, message: '请输入6-32位长度密码', trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {type: 'string', min: 6, max: 32, message: '请输入6-32位长度确认密码', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '取个好听的昵称吧', trigger: 'blur'},
                        {type: 'string', min: 1, max: 16, message: '请输入1-16位长度昵称', trigger: 'blur'}
                    ]
                },
                sendInterval: 60,
                sendBtnContent: '发送验证码',
                sendBtnDisabled: false
            }
        },
        components: {},
        methods: {
            sendVerifyCode() {
                if (!this.user.phone) {
                    this.$Message.error({
                        content: '请输入手机号',
                        duration: 5,
                        closable: true
                    });
                    return;
                }
                var that = this;
                store.dispatch('SendPhoneCode', {phoneNumber: this.user.phone}).then(res => { // 拉取user_info
                    var resp = res.data;
                    var timer = setInterval(function () {
                        var finished = that.setTime();
                        if (finished) {
                            clearInterval(timer);
                        }
                    }, 1000);
                }).catch(error => {
                    this.$Message.error({
                        content: error.data.error,
                        duration: 5,
                        closable: true
                    });
                })
            },
            setTime() {
                var that = this;
                if (that.sendInterval == 0) {
                    this.sendBtnDisabled = false;
                    that.sendBtnContent = '发送验证码';
                    that.sendInterval = 60;
                    return true;
                } else {
                    this.sendBtnDisabled = true;

                    that.sendBtnContent = '重新发送(' + (that.sendInterval--) + ')';
                    return false;
                }
            },
            showLoginModalFunction() {
                this.$emit('showLoginModalFunction')
            },
            register(refName) {
                this.$refs[refName].validate((valid) => {
                    if (valid) {
                        store.dispatch('Register', this.user).then(res => { // 拉取user_info
                            var resp = res.data;
                            this.$Message.success('注册成功!');
                            window.location.reload();
                        }).catch(error => {
                            this.$Message.error({
                                content: error.data.error,
                                duration: 5,
                                closable: true
                            });
                        })
                    } else {
                        this.$Message.error('请检查未填写正确的信息再提交');
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
