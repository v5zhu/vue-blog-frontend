<template>
    <div>
        <div style="color: #808080;min-height:20px;position: relative;top:-8px;">
            <div class="staff_avatar" style="position: relative;top:30px;left:-50px;">
                <Avatar src="http://www.jq22.com/demo/AdminEx-141217204554/images/photos/user1.png"
                        size="large" style="line-height: 0px"/>
            </div>
            <div>{{CommentChild.author.nickname}}@{{CommentChild.parent}}</div>
        </div>
        <div style="min-height:20px;" v-html="compiledComment">
        </div>
        <div style="color: #bbbbbb;min-height:20px;">{{CommentChild.gmtCreate | formatDate}}&nbsp;&nbsp;&nbsp;&nbsp;
            <a @click="showReply">回复</a>
        </div>

        <Form ref="replyForm" :model="comment" v-show="isShowReply">
            <Row>
                <Col>
                <Form-item prop="comment">
                    <quill-editor ref="myTextEditor" v-model="comment.content"
                                  :options="editorOption"
                                  @change="onEditorChange($event)">
                    </quill-editor>
                </Form-item>
                <Button type="ghost" size="small" @click="cancelReply('replyForm')">取消
                </Button>
                <Button type="warning" icon="ios-chatbubble-outline" size="small" @click="reply('replyForm')">回复
                </Button>
                </Col>
            </Row>
        </Form>

        <div style="min-height:20px;margin-left: 30px;" v-for="ch in CommentChild.children">
            <hr style="height:5px;margin-top:10px;margin-bottom:10px;border:none;border-top:1px solid rgba(255,165,0,0.2);"/>
            <comment-reply style="margin-top: -10px;" :CommentChild="ch" @loadArticleInfo="loadArticleInfo"
                           @loadArticleCommentList="loadArticleCommentList"></comment-reply>
        </div>
    </div>

</template>
<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import CommentReply from './CommentReply';
    import {quillEditor} from 'vue-quill-editor';
    import h2m from 'h2m';
    import hljs from 'highlight.js/lib/highlight';

    export default {
        name: 'comment-reply',
        props: ['CommentChild'],
        components: {CommentReply, quillEditor},
        data() {
            return {
                comment: {
                    content: '',
                    parent: '',
                    type: ''
                },
                isShowReply: false,
                editorOption: {
                    placeholder: "输入回复内容..."
                }
            }
        },
        computed: {
            compiledComment: function (param) {
                return marked(param.CommentChild.content, {sanitize: false})
            }
        },
        methods: {
            showReply() {
                this.isShowReply = true;
            },
            cancelReply(refName) {
                this.isShowReply = false;
                this.comment = {};
            },
            reply(refName) {
                this.comment.parent = this.CommentChild.id;
                this.comment.type = 'reply';
                store.dispatch('CommitComment', {
                    articleId: this.CommentChild.articleId,
                    content: h2m(this.comment.content),
                    parent: this.comment.parent,
                    type: this.comment.type
                }).then(res => { // 拉取user_info
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('回复成功');
                        this.loadArticleInfo(this.CommentChild.articleId);
                        this.loadArticleCommentList(this.CommentChild.articleId);
                        this.comment = {};
                        this.isShowReply = false;
                    } else {
                        this.$Message.error(data.msg);
                    }
                }).catch(() => {
                    console.log("回复失败");
                })
            },
            loadArticleInfo(articleId) {
                this.$emit('loadArticleInfo', articleId);
            },
            loadArticleCommentList(articleId) {
                this.$emit('loadArticleCommentList', articleId);
            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            }
            ,
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            }
            ,
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            }
            ,
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
