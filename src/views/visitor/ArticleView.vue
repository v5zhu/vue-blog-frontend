<template>
    <div class="animated fadeIn" style="margin-top:50px;">
        <Row>
            <Col :xs="3" :sm="3" :md="3" :lg="3">
            &nbsp;
            </Col>
            <Col :xs="17" :sm="17" :md="17" :lg="17">
            <div class="post-header" style="">
                <div class="post-title" style="text-align: center;font-size:32px;font-weight: 500;font-family: fantasy;" itemprop="name headline">
                    {{article.title}}
                </div>
                <div class="post-data" style="text-align: right;margin-top: 50px;margin-right: 5px;">
                    <span>发布于：{{article.gmtCreate | formatDate}}</span>
                    浏览量：<span>{{article.hits}}</span>
                </div>

            </div>
            <div class="post-content" id="editor">
                <div v-html="compiledMarkdown"></div>
            </div>
            </Col>
            <Col :xs="4" :sm="4" :md="4" :lg="4">
            </Col>
        </Row>
    </div>

</template>


<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
    .post-header,.post-content{
        border: 1px dotted gray;
    }
    .post-content{
        padding-top: 40px;
        border-top:none !important;
     }
    .post-header{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    .post-content{
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
</style>


<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import VueMarkdown from 'vue-markdown' //直接作为一个组件引入
    import DashChartVisitor from './../charts/DashChartVisitor';

    export default {
        data() {
            return {
                article: {
                    id: '',
                    title: '',
                    cover: '',
                    path: '',
                    type: '',
                    status: '',
                    tags: [],
                    categories: [],
                    hits: '',
                    commentsNum: '',
                    allowComment: true,
                    allowPing: true,
                    allowFeed: true,
                    content: ''
                }
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.article.content, {sanitize: true})
            }
        },
        created() {

        },
        components: {
            VueMarkdown, DashChartVisitor // 声明组件
        },
        mounted() {
            const vue = this;
            var id = this.$route.params.id;
            this.articlePreview(id);
        },
        methods: {
            articlePreview(id) {
                store.dispatch('ArticlePreview', {id: id}).then(res => { // 拉取user_info
                    var article = res.data;
                    this.article = article;
                    this.getAuthorInfo(article.authorId);
                }).catch(() => {
                    console.log("获取文章详情失败");
                })
            },
            getAuthorInfo(authorId) {
                store.dispatch('AuthorInfo', {authorId: authorId}).then(res => { // 拉取user_info
                    var user = res.data;
                    console.log(user)
                }).catch(() => {
                    console.log("获取文章作者信息失败");
                })
            }
        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        }
    }
</script>

<style type="text/css">

    #editor {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }

    #editor div {
        display: inline-block;
        height: 100%;
        width: 100%;
        vertical-align: middle;
        box-sizing: border-box;
        padding: 0 20px;
    }

    code {
        color: #bbe4dd;
        font-size: 1.2em;

    }

    pre {
        padding: 10px;
        border-radius: 3px;
        overflow-x: auto;
        overflow-y: auto;

        vertical-align: middle;
        min-height: 40px;
        max-height: 550px;
        background-color: rgba(14, 16, 15, 0.8);
    }

    h1, h2, h3, h4, h5, h6 {
        margin-top: 20px
    }

    h1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p {
        margin-top: 10px;
    }

    .demo-i-circle-custom h1 {
        color: #3f414d;
        font-size: 10px;
        font-weight: normal;
    }

    .demo-i-circle-custom p {
        color: #657180;
        font-size: 8px;
        margin: 5px 0 2px;
    }

    .demo-i-circle-custom span {
        display: block;
        padding-top: 15px;
        color: #657180;
        font-size: 10px;
    }

    .demo-i-circle-custom span :before {
        content: '';
        display: block;
        width: 50px;
        height: 1px;
        margin: 0 auto;
        background: #e0e3e6;
        position: relative;
        top: -20px;
    }

    ;
    .demo-i-circle-custom span i {
        font-style: normal;
        color: #3f414d;
    }
</style>