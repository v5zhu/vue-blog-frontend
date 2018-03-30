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

        <comment-component :type="type" :loginUser="loginUser" :articleId="articleId" :parentComment="CommentChild"
                           v-show="isShowReply"
                           @cancelReply="cancelReply"
                           @getArticleComments="loadArticleCommentList"></comment-component>

        <div style="min-height:20px;margin-left: 30px;" v-for="ch in CommentChild.children">
            <hr style="height:5px;margin-top:10px;margin-bottom:10px;border:none;border-top:1px solid rgba(255,165,0,0.2);"/>
            <comment-reply style="margin-top: -10px;" :CommentChild="ch" :loginUser="loginUser" :articleId="articleId"
                           @loadArticleInfo="loadArticleInfo"
                           @loadArticleCommentList="loadArticleCommentList"></comment-reply>
        </div>
    </div>

</template>
<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import CommentReply from './CommentReply';
    import CommentComponent from '../../components/Visitor/CommentComponent';
    import {quillEditor} from 'vue-quill-editor';
    import h2m from 'h2m';
    import hljs from 'highlight.js/lib/highlight';

    export default {
        name: 'comment-reply',
        props: {
            CommentChild: Object,
            loginUser: Object,
            articleId: Number
        },
        components: {CommentReply, quillEditor, CommentComponent},
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
                },
                type: 'reply'
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
            loadArticleInfo(articleId) {
                this.$emit('loadArticleInfo', articleId);
            },
            loadArticleCommentList(articleId) {
                this.$emit('loadArticleCommentList', articleId);
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
