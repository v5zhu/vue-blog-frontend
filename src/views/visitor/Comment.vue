<template>
    <div>
        <div style="color: #808080;min-height:20px;position: relative;top:-8px;">
            <div class="staff_avatar" style="position: relative;top:30px;left:-50px;">
                <Avatar src="http://www.jq22.com/demo/AdminEx-141217204554/images/photos/user1.png"
                        size="large" style="line-height: 0px"/>
            </div>
            <div>{{OneComment.author.nickname}}</div>
        </div>
        <div style="min-height:50px;" v-html="compiledComment">
        </div>
        <div style="color: #bbbbbb;min-height:20px;">{{OneComment.gmtCreate | formatDate}}&nbsp;&nbsp;&nbsp;&nbsp;
            <a @click="showReply">回复</a>
        </div>


        <Form ref="replyForm" :model="comment" v-show="isShowReply">
            <Row>
                <Col>
                <Form-item prop="comment">
                    <Input v-model="comment.content" type="textarea" :autosize="true" size="default"
                           placeholder="请输入回复内容..."/>
                </Form-item>
                </Col>
                <Button type="ghost" size="small" @click="cancelReply('replyForm')">取消
                </Button>
                <Button type="warning" icon="ios-chatbubble-outline" size="small" @click="reply('replyForm')">评论
                </Button>
            </Row>
        </Form>

        <div style="min-height:20px;margin-left: 50px;" v-for="child in OneComment.children">
            <hr style="height:5px;margin-top:10px;margin-bottom:10px;border:none;border-top:1px solid rgba(255,165,0,0.2);"/>
            <comment-reply style="margin-top: -25px;" :CommentChild="child" @loadArticleInfo="loadArticle"
                           @loadArticleCommentList="loadArticleComments"></comment-reply>
        </div>
    </div>


</template>
<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import CommentReply from './CommentReply';


    export default {
        name: 'comment',
        props: ['OneComment'],
        components: {CommentReply},
        data() {
            return {
                comment: {
                    content: '',
                    parent: '',
                    type: ''
                },
                isShowReply: false
            }
        },
        computed: {
            compiledComment: function (param) {
                return marked(param.OneComment.content, {sanitize: false})
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
                this.comment.parent = this.OneComment.id;
                this.comment.type = 'reply';
                store.dispatch('CommitComment', {
                    articleId: this.OneComment.articleId,
                    content: this.comment.content,
                    parent: this.comment.parent,
                    type: this.comment.type
                }).then(res => { // 拉取user_info
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('回复成功');
                        this.loadArticle(this.OneComment.articleId);
                        this.loadArticleComments(this.OneComment.articleId);
                        this.comment = {};
                        this.isShowReply = false;
                    } else {
                        this.$Message.error(data.msg);
                    }
                }).catch(() => {
                    console.log("回复失败");
                })
            },
            loadArticle(articleId) {
                this.$emit('articleDetail', articleId);
            },
            loadArticleComments(articleId) {
                this.$emit('getArticleComments', articleId);
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
