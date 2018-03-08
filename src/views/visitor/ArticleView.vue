<template>
    <div class="animated fadeIn" style="margin-top:50px;">
        <Row>
            <Col :xs="2" :sm="2" :md="2" :lg="2">
            &nbsp;
            </Col>
            <Col :xs="17" :sm="17" :md="17" :lg="17">
            <div class="post-header" style="">
                <div class="post-title"
                     style="color: orange;text-align: center;font-size:32px;font-weight: 500;font-family: fantasy;"
                     itemprop="name headline">
                    {{article.title}}
                </div>
                <div class="post-data" style="color: #808080;text-align: right;margin-top: 50px;margin-right: 5px;">
                    <span>发布于：{{article.gmtCreate | formatDate}}</span>
                    浏览量：<span>{{article.hits}}</span>
                </div>

            </div>
            <div class="post-content" id="editor">
                <div v-html="compiledMarkdown"></div>
                <div style="max-height:90px; height:90px;margin-top: 50px;position: relative;box-shadow: 0px 2px 20px 2px #ffa5002b;border:1px solid rgba(255,165,0,0.2);border-radius: 3px;">
                    <ul>
                        <li style="float: left;position:absolute;left:50px;bottom:10px">
                            <label style="color:#808080;position: relative;bottom:1px;left:-8px;font-size:16px;">浏览量：{{article.hits}}</label>
                        </li>
                        <li style="float: left;position:absolute;left:150px;bottom:10px">
                            <label style="color:#808080;position: relative;bottom:1px;left:-8px;font-size:16px;">评论数：{{comments.list.length}}</label>
                        </li>
                        <li style="float: left;position:absolute;left:250px;bottom:10px">
                            <label style="color:#808080;position: relative;bottom:1px;left:-8px;font-size:16px;">支持：{{article.commentsNum}}</label>
                        </li>
                        <li style="float: left;position:absolute;left:350px;bottom:10px">
                            <label style="color:#808080;position: relative;bottom:1px;left:-8px;font-size:16px;">反对：{{article.commentsNum}}</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div style="background: url('https://static.segmentfault.com/v-5a9fa408/global/img/ad_bg.svg');max-height:90px; height:90px;margin-top: 50px;">

            </div>
            <div style="position: relative;margin-top:50px;margin-bottom:50px;">
                <Row>
                    <Col span="9">
                    <hr style="height:5px;border:none;border-top:1px dashed rgba(255,165,0,0.5);"/>
                    </Col>
                    <Col span="6">
                    <div style="position: relative;text-align: center;top:-15px;font-size: 20px;font-weight: 500">
                        【共{{comments.list.length}}条评论】
                    </div>
                    </Col>
                    <Col span="9">
                    <hr style="height:5px;border:none;border-top:1px dashed rgba(255,165,0,0.5);"/>
                    </Col>
                </Row>
            </div>
            </Col>
            <Col :xs="4" :sm="4" :md="4" :lg="4">
            </Col>
        </Row>

        <Row style="position: relative;margin-bottom:50px; ">
            <Col :xs="2" :sm="2" :md="2" :lg="2">
            &nbsp;
            </Col>
            <Col :xs="17" :sm="17" :md="17" :lg="17" style="border: 2px solid rgba(265,165,0,0.2);padding: 10px;">
            <div v-for="c in comments.list">

                <div class="staff_list">
                    <div class="staff_avatar">
                        <Avatar src="http://www.jq22.com/demo/AdminEx-141217204554/images/photos/user1.png"
                                size="large"/>
                    </div>
                    <div class="staff_progress">
                        <comment :OneComment="c"></comment>
                    </div>
                </div>
                <hr style="height:5px;margin-top:10px;margin-bottom:10px;border:none;border-top:1px solid rgba(255,165,0,0.2);"/>

            </div>
            </Col>
            <Col :xs="4" :sm="4" :md="4" :lg="4">
            </Col>
        </Row>


        <Form ref="tagForm" :model="article">
            <Row>
                <Col :xs="2" :sm="2" :md="2" :lg="2">
                &nbsp;
                </Col>
                <Col :xs="17" :sm="17" :md="17" :lg="17">
                <Form-item prop="content">
                    <quill-editor ref="myTextEditor"
                                  :content="content"
                                  :options="editorOption"
                                  @change="onEditorChange($event)">
                    </quill-editor>
                </Form-item>
                <Button type="warning" icon="ios-chatbubble-outline" size="large" @click="commitComment">提交评论</Button>
                </Col>
                <Col :xs="4" :sm="4" :md="4" :lg="4">
                </Col>
            </Row>
        </Form>
    </div>

</template>


<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import VueMarkdown from 'vue-markdown' //直接作为一个组件引入
    import DashChartVisitor from './../charts/DashChartVisitor';
    import Comment from './Comment';
    import {quillEditor} from 'vue-quill-editor';
    import h2m from 'h2m';


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
                },
                comments: {
                    isFirstPage: undefined,
                    isLastPage: undefined,
                    pageNum: 1,
                    pageSize: 10,
                    pages: undefined,
                    total: undefined,
                    list: [],
                    prePage: undefined,
                    nextPage: undefined
                },
                commentParams: {
                    pageNum: 1,
                    pageSize: 6
                },
                content: '<h2>在此输入评论内容...</h2>',
                editorOption: {
                    // something config
                }
            }
        },
        computed: {
            compiledMarkdown: function () {
                var rendererMD = new marked.Renderer();
                marked.setOptions({
                    renderer: rendererMD,
                    gfm: true,
                    tables: true,
                    breaks: true,
                    pedantic: false,
                    sanitize: true,
                    smartLists: true,
                    smartypants: true
                });
                marked.setOptions({
                    highlight: function (code) {
                        return hljs.highlightAuto(code).value;
                    }
                });

                return marked(this.article.content);
            }

        },
        created() {

        },
        components: {
            VueMarkdown, DashChartVisitor, quillEditor, Comment // 声明组件
        },
        mounted() {

            var id = this.$route.params.id;
            this.articlePreview(id);
            this.getArticleComments(id);
        },
        methods: {
            articlePreview(id) {
                store.dispatch('ArticlePreview', {id: id}).then(res => { // 拉取user_info
                    var article = res.data;
                    this.article = article;
                }).catch(() => {
                    console.log("获取文章详情失败");
                })
            },
            getArticleComments(articleId) {
                store.dispatch('ArticleComments', {
                    articleId: articleId,
                    pageNum: this.commentParams.pageNum,
                    pageSize: this.commentParams.pageSize
                }).then(res => { // 拉取user_info
                    var comments = res.data;
                    this.comments = comments;
                }).catch(() => {
                    console.log("获取文章详情失败");
                })
            },
            commitComment() {
                var marktext = h2m(this.content);
                store.dispatch('CommitComment', {
                    articleId: this.article.id,
                    content: marktext
                }).then(res => { // 拉取user_info
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('发表评论成功');
                        this.getArticleComments(this.article.id);
                    } else {
                        this.$Message.error(data.msg);
                    }
                }).catch(() => {
                    console.log("提交评论失败");
                })
            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({editor, html, text}) {
                this.content = html
            }
        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        }
    }
</script>

<style scoped>
    .staff_list {
        border-radius: 4px;
        margin-top: 0;
        display: flex;
        align-items: center
    }

    .staff_progress {
        margin-left: 10px;
        width: 90%
    }

    .expand-row {
        margin-bottom: 16px;
    }

    .post-header, .post-content {
        border: 1px solid rgba(255, 165, 0, 0.2);
        box-shadow: 0px 2px 18px 2px #ffa5002b;
    }

    .post-content {
        padding-top: 40px;
        border-top: none !important;
    }

    .post-header {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .post-content {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
</style>
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
        /*color: #808080;*/
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
        background-color: #f6faff;
        box-shadow: inset 0px 2px 18px 1px #ffa5002b;
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

    .demo-i-circle-custom span i {
        font-style: normal;
        color: #3f414d;
    }
</style>