<template>
    <div class="animated fadeIn" style="margin-top:50px;">
        <Row>
            <Col span="18">
                <div style="min-height:200px;min-width:50px;position: fixed;left:20px;top:120px;">
                    <ul>
                        <li style="margin-bottom: 10px;position: relative">
                            <Button @click="updateStatistics('likes')" type="ghost" class="left-circle"
                                    style="border-radius: 50%;">
                                <Icon class="left-icon-class" type="heart" color="red" size="24"></Icon>
                            </Button>
                            <div style="position:relative;left:55px;top: -30px;">
                                {{article.likes}}
                            </div>
                        </li>
                        <li style="margin-bottom: 10px;position: relative">
                            <Button @click="updateStatistics('dislikes')" type="ghost" class="left-circle"
                                    style="border-radius: 50%;">
                                <Icon class="left-icon-class" type="thumbsdown" color="red" size="24"></Icon>
                            </Button>
                            <div style="position:relative;left:55px;top: -30px;">
                                {{article.dislikes}}
                            </div>
                        </li>
                    </ul>
                </div>
                <Row>
                    <Col offset="1" :xs="23" :sm="23" :md="23" :lg="23">
                        <div class="post-header">
                            <div class="post-title"
                                 style="text-align: center;font-size:32px;font-weight: 700;"
                                 itemprop="name headline">
                                {{article.title}}
                                <a v-if="article.authorId==loginUser.id"
                                   :href="'/admin/mgr/blog/article/edit/'+article.id" target="_blank">
                                    <Icon type="compose" size="20"
                                          style="position: relative;top:-20px;left:10px;" title="点击编辑文章"></Icon>
                                </a>
                            </div>
                            <ul class="post-data"
                                style="color: #808080;text-align: right;margin-top: 50px;margin-right: 5px;display: flex;">
                                <li style="margin-left: 20px;">
                                    发布于：{{article.gmtCreate | formatDate}}
                                </li>
                                <li style="margin-left: 20px;">
                                    浏览{{article.hits}}
                                </li>
                                <li style="margin-left: 20px;">
                                    评论{{article.comments}}
                                </li>
                                <li style="margin-left: 20px;">
                                    喜欢{{article.likes}}
                                </li>
                                <li style="margin-left: 20px;">
                                    反对{{article.dislikes}}
                                </li>
                            </ul>

                        </div>
                        <div class="post-content" id="editor">
                            <div highlight v-html="compiledMarkdown"></div>
                            <div style="min-height:150px;height:auto;margin-top: 50px;position: relative;">
                                <ul style="width:100%;">
                                    <li style="float: left;position:relative;top:20px;margin-left: 30%;margin-right: 20px;">
                                        <Button type="ghost" @click="awardModal=true">
                                            <Icon type="social-usd-outline" size="24" color="red"></Icon>
                                            <p>赞赏</p>
                                        </Button>

                                        <Modal v-model="awardModal" width="600" :maskClosable="false"
                                               @on-visible-change="changeModalVisible">
                                            <p slot="header" style="color:#f60;text-align:left">
                                                <Icon type="information-circled"></Icon>
                                                <span>赞赏</span>
                                            </p>
                                            <div style="text-align:center">
                                                <Form ref="awardForm" :model="award" :label-width="120"
                                                      label-position="right">
                                                    <Row style="padding-left: 20px;">
                                                        <Col span="14">
                                                            <Form-item style="margin-left: 60px;" prop="name"
                                                                       label="赞赏金额:(RMB)"
                                                                       label-position="top">
                                                                <i-circle
                                                                        :size="100"
                                                                        :trail-width="5"
                                                                        :stroke-width="6"
                                                                        :percent="parseInt(award.money)"
                                                                        stroke-linecap="square"
                                                                        stroke-color="red">
                                                                    <div class="demo-i-circle-custom">
                                                                        <p>赞赏金额</p>
                                                                        <span>
                                                    &nbsp;
                                                    <i>¥{{award.money}}</i>
                                                    </span>
                                                                    </div>
                                                                </i-circle>
                                                            </Form-item>

                                                        </Col>
                                                        <Col span="24">
                                                            <RadioGroup v-model="award.money" type="button"
                                                                        @on-change="changeMoney">
                                                                <Radio label="0.01">一分也是爱</Radio>
                                                                <Radio label="2">2元</Radio>
                                                                <Radio label="5">5元</Radio>
                                                                <Radio label="10">10元</Radio>
                                                                <Radio label="20">20元</Radio>
                                                                <Radio label="50">50元</Radio>
                                                                <Radio label="100">100元</Radio>
                                                                <Radio label="666.66">任性的土豪</Radio>
                                                            </RadioGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row style="padding-left: 20px;margin-top: 20px;" v-show="isAward">
                                                        <Col span="12">
                                                            <Avatar shape="square" style="height:150px;width:150px;"
                                                                    :src="award.alipayQrcode"></Avatar>
                                                            <p style="margin-left: 5px;margin-top: 10px;font-size: 1.2em;">
                                                                打开<span
                                                                    style="color:blue;font-size: 16px;">【支付宝】</span>扫一扫赞赏
                                                            </p>
                                                        </Col>
                                                        <Col span="12">
                                                            <Avatar shape="square" style="height:150px;width:150px;"
                                                                    :src="award.weixinQrcode"></Avatar>
                                                            <p style="margin-left: 5px;margin-top: 10px;font-size: 1.2em;">
                                                                打开<span
                                                                    style="color:blue;font-size: 16px;">【微信】</span>扫一扫赞赏
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </div>
                                            <div slot="footer" style="text-align: center">
                                                <Button type="error" size="large" :loading="false" v-show="!isAward"
                                                        @click="awardOk">赞赏
                                                </Button>
                                            </div>
                                        </Modal>
                                    </li>
                                    <li style="float: left;position:relative;top:20px;margin-right: 20px;">
                                        <Button type="ghost" @click="updateStatistics('likes')"
                                                style="height:60px;width:60px;font-size: 12px;">
                                            <Icon type="android-favorite-outline" size="20" color="red"></Icon>
                                            <p>{{article.likes}}喜欢</p>
                                        </Button>
                                    </li>
                                    <li style="float: left;position:relative;top:20px">
                                        <Button type="ghost" @click="updateStatistics('dislikes')"
                                                style="height:60px;width:60px;font-size: 12px;">
                                            <Icon type="sad-outline" size="24" color="red"></Icon>
                                            <p>{{article.dislikes}}反对</p>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div style="background: url('https://static.segmentfault.com/v-5a9fa408/global/img/ad_bg.svg');max-height:90px; height:90px;margin-top: 50px;">

                        </div>
                        <div style="position: relative;margin-top:50px;margin-bottom:50px;">
                            <Row>
                                <Col span="9"  offset="1">
                                    <hr style="height:5px;border:none;border-top:1px dashed rgba(255,165,0,0.5);"/>
                                </Col>
                                <Col span="6">
                                    <div style="position: relative;text-align: center;top:-15px;font-size: 20px;font-weight: 500">
                                        【共{{article.comments}}条评论】
                                    </div>
                                </Col>
                                <Col span="8">
                                    <hr style="height:5px;border:none;border-top:1px dashed rgba(255,165,0,0.5);"/>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Row style="position: relative;margin-bottom:50px;">
                    <Col offset="2" :xs="22" :sm="22" :md="22" :lg="22" style="padding: 10px;">
                        <hr style="height:5px;margin-top:10px;margin-bottom:10px;border:none;border-top:1px solid rgba(255,165,0,0.2);"/>
                        <div v-for="(c,index) in comments.list">
                            <div class="staff_list" style="position: relative;margin-left: 50px;">
                                <div class="staff_progress" style="position: relative">
                                    <div style="text-align: right;position: relative;right:-80px;">
                                        <Tag color="yellow">{{index + 1}}楼</Tag>
                                    </div>

                                    <comment :loginUser="loginUser" style="margin-top: -45px;" :OneComment="c"
                                             :articleId="article.id"
                                             @articleDetail="articleDetail"
                                             @getArticleComments="getArticleComments"></comment>
                                </div>
                            </div>
                            <hr style="height:5px;margin-top:10px;margin-bottom:10px;border:none;border-top:1px solid rgba(255,165,0,0.2);"/>
                        </div>
                        <div v-if="comments.total > commentParams.pageSize" style="text-align: center">
                            <Button :loading="loadingComments" @click="loadMoreComments" size="large" type="ghost">
                                加载更多
                            </Button>

                        </div>
                    </Col>
                </Row>
                <Row style="position: relative;margin-bottom:50px;"
                     v-if="article.allowComment===true">
                    <Col offset="1" span="23">
                        <comment-component :loginUser="loginUser" :type="type" :articleId="article.id"
                                           :parentComment="new Object()"
                                           @getArticleComments="getArticleComments">
                        </comment-component>
                    </Col>
                </Row>
            </Col>
            <Col span="5" style="margin-left: 30px;">
                <author-info/>
            </Col>
        </Row>
    </div>

</template>

<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';
    import VueMarkdown from 'vue-markdown' //直接作为一个组件引入
    import DashChartVisitor from './../charts/DashChartVisitor';
    import Comment from './Comment';
    import CommentComponent from '../../components/Visitor/CommentComponent';
    import AuthorInfo from '../../components/Visitor/AuthorInfo';
    import {quillEditor} from 'vue-quill-editor';
    import h2m from 'h2m';
    import hljs from 'highlight.js/lib/highlight';
    import Cookies from 'js-cookie';

    export default {
        props: {
            loginUser: Object
        },
        data() {
            return {
                awardModal: false,
                award: {
                    money: 2,
                    alipayQrcode: '/static/img/qrcode/alipay_qrcode_2.png',
                    alipayQrcodes: {
                        key_1: '/static/img/qrcode/alipay_qrcode_001.png',
                        key_2: '/static/img/qrcode/alipay_qrcode_2.png',
                        key_5: '/static/img/qrcode/alipay_qrcode_5.png',
                        key_10: '/static/img/qrcode/alipay_qrcode_10.png',
                        key_20: '/static/img/qrcode/alipay_qrcode_20.png',
                        key_50: '/static/img/qrcode/alipay_qrcode_50.png',
                        key_100: '/static/img/qrcode/alipay_qrcode_100.png',
                        key_666: '/static/img/qrcode/alipay_qrcode_666.png'
                    },
                    weixinQrcode: '/static/img/qrcode/weixin_qrcode_2.png',
                    weixinQrcodes: {
                        key_1: '/static/img/qrcode/weixin_qrcode_001.png',
                        key_2: '/static/img/qrcode/weixin_qrcode_2.png',
                        key_5: '/static/img/qrcode/weixin_qrcode_5.png',
                        key_10: '/static/img/qrcode/weixin_qrcode_10.png',
                        key_20: '/static/img/qrcode/weixin_qrcode_20.png',
                        key_50: '/static/img/qrcode/weixin_qrcode_50.png',
                        key_100: '/static/img/qrcode/weixin_qrcode_100.png',
                        key_666: '/static/img/qrcode/weixin_qrcode_666.png'
                    }
                },
                article: {
                    id: undefined,
                    authorId: null,
                    author: null,
                    title: '',
                    cover: '',
                    path: '',
                    type: '',
                    status: '',
                    tags: [],
                    categories: [],
                    hits: null,
                    comments: null,
                    likes: null,
                    dislikes: null,
                    allowComment: true,
                    allowPing: true,
                    allowFeed: true,
                    content: ''
                },
                statistics: {
                    articleId: null,
                    hits: null,
                    comments: null,
                    likes: null,
                    dislikes: null,
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
                loadingComments: false,
                isAward: false,
                comment: {
                    articleId: '',
                    email: '',
                    name: '',
                    siteUrl: '',
                    content: ''
                },
                editorOption: {
                    placeholder: "输入回复内容..."
                },
                type: 'comment'
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
                if (this.article.content) {
                    return marked(this.article.content);
                }
            }

        }
        ,
        created() {
            window.scrollTo(0, 0);

            var path = this.$route.params.path;
            this.articleDetail(path);
        }
        ,
        components: {
            VueMarkdown, DashChartVisitor, quillEditor, Comment, CommentComponent, AuthorInfo // 声明组件
        }
        ,
        mounted() {
        }
        ,
        methods: {
            changeMoney() {
                var key = this.award.money;
                if (key == 0.01) {
                    this.award.alipayQrcode = this.award.alipayQrcodes.key_1;
                    this.award.weixinQrcode = this.award.weixinQrcodes.key_1;
                } else if (key == 2) {
                    this.award.alipayQrcode = this.award.alipayQrcodes.key_2;
                    this.award.weixinQrcode = this.award.weixinQrcodes.key_2;
                } else if (key == 5) {
                    this.award.alipayQrcode = this.award.alipayQrcodes.key_5;
                    this.award.weixinQrcode = this.award.weixinQrcodes.key_5;
                } else if (key == 10) {
                    this.award.alipayQrcode = this.award.alipayQrcodes.key_10;
                    this.award.weixinQrcode = this.award.weixinQrcodes.key_10;
                } else if (key == 20) {
                    this.award.alipayQrcode = this.award.alipayQrcodes.key_20;
                    this.award.weixinQrcode = this.award.weixinQrcodes.key_20;
                } else if (key == 50) {
                    this.award.alipayQrcode = this.award.alipayQrcodes.key_50;
                    this.award.weixinQrcode = this.award.weixinQrcodes.key_50;
                } else if (key == 100) {
                    this.award.alipayQrcode = this.award.alipayQrcodes.key_100;
                    this.award.weixinQrcode = this.award.weixinQrcodes.key_100;
                } else if (key == 666.66) {
                    this.award.alipayQrcode = this.award.alipayQrcodes.key_666;
                    this.award.weixinQrcode = this.award.weixinQrcodes.key_666;
                }
            },
            awardOk() {
                this.awardModal = true;
                this.isAward = true;
            }
            ,
            changeModalVisible(visible) {
                if (visible == false) {
                    this.isAward = false;
                }
            }
            ,
            articleDetail(path) {
                store.dispatch('ArticleDetail', {path: path}).then(res => { // 拉取user_info
                    var article = res.data.payload;
                    this.article = article;
                    this.getArticleComments(article.id);
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            }
            ,
            getArticleComments(articleId) {
                store.dispatch('ArticleComments', {
                    articleId: articleId,
                    pageNum: this.commentParams.pageNum,
                    pageSize: this.commentParams.pageSize
                }).then(res => { // 拉取user_info
                    var comments = res.data.payload;
                    this.comments = comments;
                    this.loadingComments = false;
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            }
            ,
            loadMoreComments() {
                this.loadingComments = true;
                this.commentParams.pageSize += 6;
                this.getArticleComments(this.article.id);
            },
            updateStatistics(type) {
                if (!this.loginUser.token) {
                    this.$emit('showLoginModalFunction');
                    return;
                }
                this.statistics.articleId = this.article.id;
                if (type == 'hits') {
                    this.article.hits++;
                } else if (type == 'comments') {
                    this.article.comments++;
                } else if (type == 'likes') {
                    this.article.likes++;
                } else if (type == 'dislikes') {
                    this.article.dislikes++;
                }
                this.statistics.hits = this.article.hits;
                this.statistics.comments = this.article.comments;
                this.statistics.likes = this.article.likes;
                this.statistics.dislikes = this.article.dislikes;

                store.dispatch('UpdateStatistics', this.statistics).then(res => { // 拉取user_info
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('操作成功,期待您下次点赞!!!');
                    } else {
                        this.$Message.error('操作失败');
                        if (type == 'hits') {
                            this.article.hits--;
                        } else if (type == 'comments') {
                            this.article.comments--;
                        } else if (type == 'likes') {
                            this.article.likes--;
                        } else if (type == 'dislikes') {
                            this.article.dislikes--;
                        }
                    }
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            }
        }
        ,
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        }
    }
</script>

<style scoped>
    li {
        list-style-type: none;
    }

    .left-icon-class {
        margin-left: -3px;
        margin-top: 3px;
    }

    .left-circle {
        height: 45px;
        width: 45px;
        position: relative;
        font-size: 12px;
        box-shadow: 0px 0px 20px 3px #ffa5002b;
        border-color: white;

    }

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
        /*box-shadow: 0px 2px 18px 2px #ffa5002b;*/
        padding: 10px;
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
        background-color: #fbf9ec;
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