// expand-row.vue
<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }

</style>
<template>
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
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
