<template>

    <div class="echarts">
        <Row>
            <Col>
            <div class="clearfix mt-4">
                <h1><b>历史归档</b>
                </h1>
            </div>
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
                store.dispatch('Archives', {year: null, month: null}).then(res => { // 拉取user_info
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