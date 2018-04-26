<template>

    <div class="echarts">
        <Row>
            <Col>
            <div class="clearfix">
                <h5 style="text-align: center;">标签云</h5>
            </div>
            <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>

            <div style="padding: 5px;height:auto;">
                <div v-for="(item,index) in tags" style="margin:2px;float: left;">
                    <Button size="small" :type="getButtonType()"
                            @click="filterTags(item.name)">
                        {{item.name}}({{item.articleNumbers}})
                    </Button>
                </div>
            </div>
            </Col>
        </Row>
    </div>

</template>

<style scoped>
    .demo-badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
    }

    .echarts {
        margin-top: 30px;
        border-radius: 4px;
        height: auto;
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
            // var id = this.$route.params.id;
            // this.tagList();
        },
        data() {
            return {
                tags: [],
                buttonTypes: [
                    'primary',
                    'ghost',
                    'info',
                    'success',
                    'warning',
                    'error',
                    'dashed'
                ]
            }
        },
        computed: {
            ...mapGetters([
                'articleAuthor'
            ])
        },
        watch: {
            articleAuthor: function () {
                this.filterTagList(this.articleAuthor.id);
            }
        },
        methods: {
            filterTagList(userId) {
                store.dispatch('FilterTagList', {userId:userId}).then(res => { // 拉取user_info
                    var tags = res.data.payload;
                    this.tags = tags;
                }).catch(err=> {
                    this.$Message.error({
                        content:err.data.error,
                        duration:5,
                        closable:true
                    })
                })
            },
            filterTags(tag) {
                window.open('/archives/filter/tag/' + tag);
            },
            getButtonType() {
                var num = Math.floor(Math.random() * 10);
                var index = num % 7;
                return this.buttonTypes[index];
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