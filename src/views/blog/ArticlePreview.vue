<template>
    <div class="animated fadeIn" style="margin-top:50px;">
        <Row>
            <Col span="18">
            <div class="post-header">
                <h1 class="post-title" itemprop="name headline">
                    <span>{{article.title}}</span>
                </h1>
                <div class="post-data">
                    <span>发布于</span>
                    <span>{{article.gmtCreate}}</span>
                    浏览
                </div>
            </div>
            <mavon-editor  :ishljs = "true" v-model="article.content">

            </mavon-editor>

            <vue-markdown v-highlight :source="article.content">

            </vue-markdown>
            <!--<div id="post-content" class="post-content" itemprop="articleBody">
                &lt;!&ndash;<p class="post-tags" th:utext="${commons.showTags(article.tags)}"></p>&ndash;&gt;
                &lt;!&ndash;<th:block th:utext="${commons.article(article.content)}"/>&ndash;&gt;
                &lt;!&ndash;<p class="post-info">&ndash;&gt;
                &lt;!&ndash;本站文章除注明转载/出处外，均为本站原创或翻译，转载前请务必署名,转载请标明出处<br/>最后编辑时间为:&ndash;&gt;
                &lt;!&ndash;<th:block th:text="${commons.fmtdate(article.gmtModified, 'yyyy/MM/dd HH:mm')}"/>&ndash;&gt;
                &lt;!&ndash;</p>&ndash;&gt;
                <div>{{article.content}}</div>
            </div>-->
            </Col>
        </Row>
    </div>
</template>


<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>


<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import VueMarkdown from 'vue-markdown' //直接作为一个组件引入

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
                    tags: '',
                    categories: '',
                    hits: '',
                    commentsNum: '',
                    allowComment: true,
                    allowPing: true,
                    allowFeed: true,
                    content: ''
                }
            }
        },
        created() {

        },
        components: {
            VueMarkdown // 声明组件
        },
        mounted() {
            const vue = this;
            var id = this.$route.params.id;
            this.articlePreview(id);
        },
        methods: {
            articlePreview(id) {
                var self = this;
                store.dispatch('ArticlePreview', {id: id}).then(res => { // 拉取user_info
                    var article = res.data;
                    this.article = article;
//                    store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
//                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//                        next({ ...to }) // hack方法 确保addRoutes已完成
//                    })

                }).catch(() => {
                    console.log("请求文章列表失败");
                })
            },
            formatTime(ms) {
                var datetime = formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
                return datetime;
            }
        },

    }
</script>

<style type="text/css">
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