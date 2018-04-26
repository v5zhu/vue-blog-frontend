<template>

    <div class="echarts">
        <Row>
            <Col>
                <div class="clearfix">
                    <h5 style="text-align: center;">历史归档</h5>
                </div>
                <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>

                <div v-for="archive in archives">
                    <div style="margin: 5px;">
                        <a :href="'/archives/filter/time/' + archive.year + '/' + archive.month" target="_blank">{{archive.date}}(共{{archive.count}}篇)</a>
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
        border: 1px solid rgba(255, 165, 0, 0.2);
        background: #f6faff;
        box-shadow: 0px 2px 18px 4px #ffa5002b;
        color: black;
    }


</style>

<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import {mapGetters} from 'vuex';

    export default {
        mounted() {

        },
        data() {
            return {
                archives: [],
            }
        },
        computed: {
            ...mapGetters([
                'articleAuthor'
            ])
        },
        watch: {
            articleAuthor: function () {
                this.getArchives(this.articleAuthor.id);
            }
        },
        methods: {
            getArchives(userId, year, month, category, tag) {
                store.dispatch('Archives', {
                    userId: userId,
                    year: year,
                    month: month,
                    category: category,
                    tag: tag
                }).then(res => { // 拉取user_info
                    var archives = res.data.payload;
                    this.archives = archives;
                }).catch(err => {
                    this.$Message.error({
                        content:err.data.error,
                        duration:5,
                        closable:true
                    })
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