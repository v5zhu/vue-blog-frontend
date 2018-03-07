<template>

    <div class="echarts">
        <Row>
            <Col>
            <div class="clearfix">
                <h4 style="text-align: center;font-family: serif;">文章分类</h4>
            </div>
            <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>

            <div style="padding: 5px;">
                <div v-for="(item,index) in categories" style="margin: 2px;float: left">
                    <Button type="info" size="small" @click="filterCategories(item.name)">{{item.name}}</Button>
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
            this.categoryList();
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
                ]
            }
        },
        methods: {
            categoryList() {
                store.dispatch('CategoryList', {}).then(res => { // 拉取user_info
                    var categories = res.data;
                    this.categories = categories;
                }).catch(() => {
                    console.log("获取文章作者信息失败");
                })
            },
            filterCategories(categoryName) {
                this.$router.push({path: '/category/' + categoryName});
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