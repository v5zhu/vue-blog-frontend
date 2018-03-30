<template>
    <div>
        <Form ref="commentForm" :model="comment">
            <Row v-if="loginUser.token==undefined">
                <Col span="8" style="padding-right: 10px;">
                <Form-item prop="name">
                    <Input v-model="comment.name" placeholder="请输入阁下大名"></Input>
                </Form-item>
                </Col>
                <Col span="8" style="padding-right: 10px;">
                <Form-item prop="email">
                    <Input v-model="comment.email" placeholder="请输入阁下联系邮箱"></Input>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item prop="siteUrl">
                    <Input v-model="comment.siteUrl" placeholder="请输入主页网址http(s)://开头"></Input>
                </Form-item>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form-item prop="content">
                    <quill-editor ref="myTextEditor" v-model="comment.content"
                                  :options="editorOption"
                                  @change="onEditorChange($event)">
                    </quill-editor>
                </Form-item>
                <Button type="default" size="small" v-show="type==='reply'" @click="cancelReply('replyForm')">取消
                </Button>
                <Button type="error" size="small" @click="clearAll('commentForm')">清除
                </Button>
                <Button type="primary" icon="ios-chatbubble-outline" v-show="type==='reply'" size="small"
                        @click="commitComment('reply')">回复
                </Button>
                <Button type="primary" icon="ios-chatbubble-outline" v-show="type==='comment'" size="small"
                        @click="commitComment('comment')">提交评论
                </Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
    import store from 'store/';
    import Cookies from 'js-cookie';
    import {quillEditor} from 'vue-quill-editor';
    import h2m from 'h2m';

    export default {
        name: 'comment-component',
        props: {
            loginUser: Object,
            type: String,
            articleId: Number,
            parentComment: Object
        },
        data() {
            return {
                comment: {
                    articleId: '',
                    email: '',
                    name: '',
                    siteUrl: '',
                    content: '',
                    parent: {
                        id: ''
                    }
                },
                editorOption: {
                    placeholder: "输入回复内容..."
                }
            }
        },
        components: {quillEditor},
        methods: {
            clearAll(refName) {
                this.$refs.commentForm.resetFields();
            },
            cancelReply(refName) {
                this.$emit('cancelReply');
            },
            commitComment(type) {
                this.$Loading.start();
                var marktext = h2m(this.comment.content);
                this.comment.articleId = this.articleId;
                this.comment.content = marktext;
                this.comment.type = type;
                this.comment.parent.id = this.parentComment.id;


                store.dispatch('CommitComment', this.comment).then(res => { // 拉取user_info
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success(type === 'comment' ? '发表评论成功' : '回复成功');
                        this.$emit('cancelReply');
                        this.$emit('getArticleComments', this.articleId);
                        this.$Loading.finish();
                    } else {
                        this.$Message.error(data.msg);
                        this.$Loading.error();
                    }
                }).catch(() => {
                    console.log("提交评论失败");
                    this.$Loading.error();
                })
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
        }
    }
</script>

<style type="text/css" scoped>

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        cursor: pointer;
        /*border-bottom: 2px solid #9affab;*/
    }
</style>