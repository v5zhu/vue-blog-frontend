<template>

    <div class="echarts">
        <Row>
            <Col>
            <div class="clearfix">
                <h4 style="text-align: center;font-family: serif;">历史归档</h4>
            </div>
            <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>

            <div v-for="archive in archives">
                <div style="margin: 5px;">
                    <a @click="filterArchives(archive.year,archive.month)">{{archive.date}}({{archive.count}})</a>
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
        border: 1px solid rgba(255,165,0,0.2);
        background: #f6faff;
        box-shadow: 0px 2px 18px 4px #ffa5002b;
        color: black;
    }


</style>

<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';

    export default {
        mounted() {
            var id = this.$route.params.id;
            this.getArchives();
        },
        data() {
            return {
                archives: [],
            }
        }
        ,
        methods: {
            getArchives() {
                store.dispatch('Archives', {year: null, month: null,category:'',tag:''}).then(res => { // 拉取user_info
                    var archives = res.data;
                    this.archives = archives;
                }).catch(() => {
                    console.log("获取文章历史归档信息失败");
                })
            },
            filterArchives(year, month) {
                this.$router.push({path: '/archives/' + year + '/' + month});
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