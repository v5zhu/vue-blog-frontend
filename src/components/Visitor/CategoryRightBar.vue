<template>

    <div class="echarts">
        <Row>
            <Col>
                <div class="clearfix">
                    <h5 style="text-align: center;">文章分类</h5>
                </div>
                <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>

                <div style="padding: 5px;height:auto;">
                    <div v-for="(item,index) in categories" style="margin:2px;">
                        <p>
                            <a :href="'/archives/filter/category/'+item.name+'?userId='+articleAuthor.id"
                               target="_blank">{{item.name}}({{item.articleNumbers}})</a>
                        </p>
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
            // this.categoryList();
        },
        data() {
            return {
                categories: [],
                buttonTypes: [
                    'primary',
                    'ghost',
                    'info',
                    'success',
                    'warning',
                    'error'
                ],
            }
        },
        computed: {
            ...mapGetters([
                'articleAuthor'
            ])
        },
        watch: {
            articleAuthor: function () {
                //articleAuthor发生变化时会执行该函数
                this.getAuthorCategoryList(this.articleAuthor.id);
            }
        },
        methods: {
            getAuthorCategoryList(userId) {
                store.dispatch('FilterCategoryList', {userId: userId}).then(res => { // 拉取user_info
                    var categories = res.data.payload;
                    this.categories = categories;
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
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