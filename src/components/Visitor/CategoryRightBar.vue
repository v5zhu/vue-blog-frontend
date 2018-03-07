<template>

    <div class="echarts">
        <Row>
            <Col>
            <div class="clearfix mt-4">
                <h1><b>分类</b>
                </h1>
            </div>
            <div style="padding: 5px;">
                <div v-for="(item,index) in categories" style="margin: 2px;float: left">
                    <Button type="primary" size="small" @click="filterCategories(item.name)">{{item.name}}</Button>
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