<template>

    <div class="echarts">
        <Row>
            <Col>
                <div class="clearfix">
                    <h5 style="text-align: center;">{{articleAuthor.nickname}}</h5>
                </div>
                <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>
                <div>
                    <ul>
                        <li style="margin: 10px;">邮箱：{{articleAuthor.email}}</li>
                        <li style="margin: 10px;">主页：{{articleAuthor.homeUrl}}</li>
                        <li v-if="articleAuthor.loginStatus==0" style="margin: 10px;">离线：{{articleAuthor.lastLoginTime |
                            formatDate}}
                        </li>
                        <li v-else style="margin: 10px;">当前在线</li>
                    </ul>
                </div>
            </Col>
        </Row>
    </div>

</template>

<style scoped>
    li {
        list-style-type: none;
    }

    .echarts {
        margin-top: 45px;
        border-radius: 4px;
        height: 150px;
        width: 100%;
        border: 1px solid rgba(255, 165, 0, 0.2);
        background: #f6faff;
        box-shadow: 0px 2px 18px 4px #ffa5002b;
        color: black;
    }


</style>

<script>
    import {formatTime} from 'utils/index';
    import {mapGetters} from 'vuex';

    export default {
        mounted() {
            // var id = this.$route.params.id;
            // this.getAuthorInfo(1);
        },
        data() {
            return {
                user: {
                    id: '',
                    loginName: '',
                    email: '',
                    homeUrl: '',
                    nickname: '',
                    gmtCreate: '',
                    gmtModified: '',
                    lastLoginTime: '',
                    roles: []
                },
            }
        },
        computed: {
            ...mapGetters([
                'articleAuthor'
            ])
        },
        methods: {}
        ,
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        }
    }
</script>