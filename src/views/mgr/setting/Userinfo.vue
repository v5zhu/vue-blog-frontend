<template>
    <div class="animated fadeIn">
        <Form ref="userModifyForm" :model="loginUser" :label-width="80">
            <Row>
                <Col span="6" class="link-piece">
                <div class="echarts">
                    <ul>
                        <li style="margin: 10px;">
                            <Form-item prop="loginName" label="登录账号">
                                <Input v-model="loginUser.loginName" type="text" disabled>
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="email" label="邮箱">
                                <Input v-model="loginUser.email" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="homeUrl" label="网址">
                                <Input v-model="loginUser.homeUrl" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="nickname" label="昵称">
                                <Input v-model="loginUser.nickname" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="gmtCreate" label="注册时间">
                                <Icon type="ios-clock-outline"></Icon>
                                {{loginUser.gmtCreate|formatDate}}</p>
                            </Form-item>
                        </li>
                        <li>
                            <div style="text-align: right;margin: 10px;">
                                <Button type="ghost" @click="modifyUser">
                                    <Icon type="ios-checkmark" size="14"></Icon>
                                    保存
                                </Button>
                            </div>
                        </li>
                    </ul>
                </div>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
    import store from 'store/';
    import Cookies from 'js-cookie';
    import {formatTime} from 'utils/index';

    export default {
        components: {},
        name: 'dashboard',
        data() {
            return {
                loginUser: {
                    loginName: '',
                    email: '',
                    homeUrl: '',
                    nickname: ''
                }
            }
        },
        mounted() {
            var jsonString = Cookies.get('USER-INFO');
            if (jsonString) {
                this.loginUser = JSON.parse(jsonString);
            }
        },
        methods: {
            modifyUser() {
                store.dispatch('ModifyUser', this.loginUser).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        var user = data.payload;
                        Cookies.set('USER-INFO', user);
                        this.$Message.success('保存成功');
                    } else {
                        this.$Message.error('保存失败');
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            }
        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        }
    }
</script>


<style type="text/css" scoped>
    .link-piece {
        margin: 10px 25px;
    }

    .echarts {
        border-radius: 4px;
        width: 100%;
        border: 1px solid rgba(255, 165, 0, 0.2);
        background: #f6faff;
        box-shadow: 0px 2px 18px 4px #ffa5002b;
        color: black;
    }

    .time {
        font-size: 14px;
        font-weight: bold;
    }

    .content {
        padding-left: 5px;
    }

    .dashboard_feature {
        text-align: center;
    }

    .demo-carousel {
        height: 600px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #506b9e;
    }

    .demo-carousel img {
        height: 100%;
        width: 100%;
    }

    h3, h4, h5 {
        margin: 12px;
    }

    h3 {
        margin-bottom: 20px;
    }

    p {
        margin: 12px;
    }

    .row-margin-top {
        margin-top: 30px;
    }
</style>