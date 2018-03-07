<template>

    <div class="echarts">
        <Row>
            <Col>
            <div class="clearfix mt-4">
                <h1><b>作者信息</b>
                </h1>
            </div>
            <div>
                <div>
                    <p>用户名:{{user.loginName}}</p>
                </div>
                <div>
                    <p>邮箱:{{user.email}}</p>
                </div>
                <div>
                    <p>上次在线:{{user.lastLoginTime | formatDate}}</p>
                </div>
                <div>
                    <p>角色类型:{{user.roles}}</p>
                </div>
            </div>
            </Col>
        </Row>
    </div>

</template>

<style scoped>
    .echarts {
        margin-top: 30px;
        border-radius: 4px;
        height: 150px;
        width: 100%;
        border: 1px solid #49586e;
        background: #49586e;
        box-shadow: 0 2px 0 #495864;
        color: white;
    }


</style>

<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';

    export default {
        mounted() {
            var id = this.$route.params.id;
            this.getAuthorInfo(1);
        },
        data() {
            return {
                user: {
                    id: '',
                    loginName: '',
                    email: '',
                    homeUrl: '',
                    screenName: '',
                    gmtCreate: '',
                    gmtModified: '',
                    lastLoginTime: '',
                    roles: []
                },
            }
        }
        ,
        methods: {
            getAuthorInfo(authorId) {
                store.dispatch('AuthorInfo', {authorId: authorId}).then(res => { // 拉取user_info
                    var user = res.data;
                    this.user = user;
                    console.log(this.user);
                }).catch(() => {
                    console.log("获取文章作者信息失败");
                })
            }
        }
        ,
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        }
    }
</script>