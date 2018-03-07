<template>

    <div class="echarts">
        <Row>
            <Col>
            <div class="clearfix">
                <h4 style="text-align: center;font-family: serif;">标签云</h4>
            </div>
            <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>

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
        border: 1px solid rgba(255,165,0,0.2);
        background: #f6faff;
        box-shadow: 0px 2px 18px 4px #ffa5002b;
        color: #808080;
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