<template>
    <div class="animated fadeIn">
        <Form ref="modifyPassForm" :model="modifyPassParam" :label-width="80">
            <Row>
                <Col span="6" class="link-piece">
                <div class="echarts">
                    <ul>
                        <li style="margin: 10px;">
                            <Form-item prop="password" label="原始密码">
                                <Input v-model="modifyPassParam.password" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="newPassword" label="新密码">
                                <Input v-model="modifyPassParam.newPassword" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="confirmPassword" label="确认密码">
                                <Input v-model="modifyPassParam.confirmPassword" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li>
                            <div style="text-align: right;margin: 10px;">
                                <Button type="ghost" @click="modifyPassword">
                                    <Icon type="settings" size="14"></Icon>
                                    设置
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
                modifyPassParam: {
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                }
            }
        },
        mounted() {
        },
        methods: {
            modifyPassword() {
                store.dispatch('ModifyPassword', this.modifyPassParam).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.logout();
                    } else {
                        this.$Message.error('密码设置失败');
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            },
            logout() {
                store.dispatch('LogOut', {token: null}).then(res => {
                    if (res.data.success == true) {
                        Cookies.remove('LOGIN-USER');
                        Cookies.remove('USER-TOKEN');
                        window.location.reload();
                    } else {
                        this.$Message.error('退出失败,请联系管理员');
                    }
                }).catch(err => {
                    this.$Message.error(err);
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
    li{
        list-style-type: none;
    }
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