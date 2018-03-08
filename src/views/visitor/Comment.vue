<template>
    <div v-html="compiledComment">
    </div>
</template>
<script>
    export default {
        name: 'header',
        props: ['OneComment'],
        components: {},
        computed: {
            compiledComment: function (param) {
                return marked(param.OneComment.content, {sanitize: false})
            }
        },
        methods: {}
    }
</script>

<style type="text/css" scoped>

    .dropdown-itemp {
        text-align: left;
        font-size: 15px;
        padding: 10px;
    }

    .header-item .ivu-dropdown-item {
        padding: 15px;
    }

    .header-item {
        width: 100px;
    }

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        cursor: pointer;
        /*border-bottom: 2px solid #9affab;*/
    }
</style>
