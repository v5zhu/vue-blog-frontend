// expand-row.vue
<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }

</style>
<template>
    <div>
        <Row style="margin-bottom: 5px;">
            <Col span="2" style="text-align: right">
                【文章标题】
            </Col>
            <Col span="20">
                {{row.title}}
            </Col>
        </Row>

        <Row style="margin-bottom: 5px;">
            <Col span="2" style="text-align: right">
                【类型】
            </Col>
            <Col span="20">
                {{row.type|formatType}}
            </Col>
        </Row>

        <Row style="margin-bottom: 5px;">
            <Col span="2" style="text-align: right">
                【分类】
            </Col>
            <Col span="20">
                <span v-for="(cate,index) in row.categoryList"
                      style="margin-right: 3px;padding:2px;">
                    {{cate.name}}
                    <span v-if="index!=row.categoryList.length-1">></span>
                </span>
            </Col>
        </Row>
        <Row style="margin-bottom: 5px;">
            <Col span="2" style="text-align: right">
                【标签】
            </Col>
            <Col span="20">
                <span v-for="tag in row.tagList"
                      style="margin-right: 5px;padding:2px;background-color: rgba(194,180,180,0.41)">
                    {{tag.name}}
                </span>
            </Col>
        </Row>

        <Row style="margin-bottom: 5px;">
            <Col>
                <Steps :current="0" v-if="row.status==='draft'">
                    <Step title="草稿状态" content="待提交审核"></Step>
                    <Step title="等待审核" content="已提交,等待审核,请耐心等待"></Step>
                    <Step title="发布完成" content="审核通过,文章发布完成"></Step>
                </Steps>

                <Steps :current="1" v-else-if="row.status==='audit'">
                    <Step title="草稿状态" content="待提交审核"></Step>
                    <Step title="等待审核" content="已提交,等待审核,请耐心等待"></Step>
                    <Step title="发布完成" content="审核通过,文章发布完成"></Step>
                </Steps>

                <Steps :current="2" v-else-if="row.status==='publish'">
                    <Step title="草稿状态" content="待提交审核"></Step>
                    <Step title="等待审核" content="已提交,等待审核,请耐心等待"></Step>
                    <Step title="发布完成" content="审核通过,文章发布完成"></Step>
                </Steps>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {formatCategories} from 'utils/index';

    export default {
        props: {
            row: Object
        },
        computed: {},
        methods: {},
        filters: {
            formatType(type) {
                if (type == 'original') {
                    return '原创';
                } else if (type == 'translation') {
                    return '翻译';
                } else if (type == 'reshipment') {
                    return '转载';
                } else {
                    return '其他';
                }
            },
            formatCategory(list) {
                return formatCategories(list);
            }
        }
    };
</script>
