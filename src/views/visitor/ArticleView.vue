<template>
    <div class="animated fadeIn" style="margin-top:50px;">
        <div style="min-height:200px;min-width:50px;position: fixed;left:20px;top:120px;">
            <ul>
                <li style="margin-bottom: 10px;position: relative">
                    <Button :disabled="true" type="ghost" class="left-circle"
                            style="border-radius: 50%;">
                        <Icon class="left-icon-class" type="ios-clock" color="#0d5477" size="24"></Icon>
                    </Button>
                    <div style="position:relative;left:55px;top: -30px;">
                        {{article.hits}}
                    </div>
                </li>
                <li style="margin-bottom: 10px;position: relative">
                    <Button :disabled="true" type="ghost" class="left-circle"
                            style="border-radius: 50%;">
                        <Icon class="left-icon-class" type="chatbox-working" color="#0d5477" size="24"></Icon>
                    </Button>
                    <div style="position:relative;left:55px;top: -30px;">
                        {{article.commentsNum}}
                    </div>
                </li>
                <li style="margin-bottom: 10px;position: relative">
                    <Button @click="updateStatistics('likes')" type="ghost" class="left-circle"
                            style="border-radius: 50%;">
                        <Icon class="left-icon-class" type="thumbsup" color="#0d5477" size="24"></Icon>
                    </Button>
                    <div style="position:relative;left:55px;top: -30px;">
                        {{article.likes}}
                    </div>
                </li>
                <li style="margin-bottom: 10px;position: relative">
                    <Button @click="updateStatistics('dislikes')" type="ghost" class="left-circle"
                            style="border-radius: 50%;">
                        <Icon class="left-icon-class" type="thumbsdown" color="#0d5477" size="24"></Icon>
                    </Button>
                    <div style="position:relative;left:55px;top: -30px;">
                        {{article.dislikes}}
                    </div>
                </li>
            </ul>
        </div>
        <Row>

            <Col style="margin-left: 50px;" :xs="17" :sm="17" :md="17" :lg="17">
            <div class="post-header" style="">
                <div class="post-title"
                     style="color: #0d5477;text-align: center;font-size:32px;font-weight: 500;font-family: fantasy;"
                     itemprop="name headline">
                    {{article.title}}
                </div>
                <div class="post-data" style="color: #808080;text-align: right;margin-top: 50px;margin-right: 5px;">
                    <span>发布于：{{article.gmtCreate | formatDate}}</span>
                    浏览量：<span>{{article.hits}}</span>
                </div>

            </div>
            <div class="post-content" id="editor">
                <div highlight v-html="compiledMarkdown"></div>
                <div style="min-height:150px;height:auto;margin-top: 50px;position: relative;box-shadow: 0px 2px 20px 5px #ffa5002b;border:1px solid rgba(255,165,0,0.2);border-radius: 3px;">
                    <ul style="width:100%;">
                        <li style="float: left;position:relative;top:20px;margin-left: 30%;margin-right: 20px;">
                            <Button type="ghost" @click="awardModal=true"
                                    style="height:60px;width:60px;border-radius:2px;font-size: 16px;">
                                <p style="margin-top: 10px;">赞赏</p>
                            </Button>

                            <Modal v-model="awardModal" width="600" :maskClosable="false"
                                   @on-visible-change="changeModalVisible">
                                <p slot="header" style="color:#f60;text-align:left">
                                    <Icon type="information-circled"></Icon>
                                    <span>赞赏</span>
                                </p>
                                <div style="text-align:center">
                                    <Form ref="awardForm" :model="award" :label-width="120" label-position="right">
                                        <Row style="padding-left: 20px;">
                                            <Col span="14">
                                            <Form-item style="margin-left: 60px;" prop="name" label="赞赏金额:(RMB)"
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
                                            <RadioGroup v-model="award.money" type="button" @on-change="changeMoney">
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
                                            <p style="margin-left: 5px;margin-top: 10px;font-size: 1.2em;">打开<span
                                                    style="color:blue;font-size: 16px;">【支付宝】</span>扫一扫赞赏</p>
                                            </Col>
                                            <Col span="12">
                                            <Avatar shape="square" style="height:150px;width:150px;"
                                                    :src="award.weixinQrcode"></Avatar>
                                            <p style="margin-left: 5px;margin-top: 10px;font-size: 1.2em;">打开<span
                                                    style="color:blue;font-size: 16px;">【微信】</span>扫一扫赞赏</p>
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
                                <Icon type="thumbsup" size="24" color="#0d5477"></Icon>
                                <p>{{article.likes}}喜欢</p>
                            </Button>
                        </li>
                        <li style="float: left;position:relative;top:20px">
                            <Button type="ghost" @click="updateStatistics('dislikes')"
                                    style="height:60px;width:60px;font-size: 12px;">
                                <Icon type="thumbsdown" size="24" color="#0d5477"></Icon>
                                <p>{{article.dislikes}}反对</p>
                            </Button>
                        </li>
                    </ul>
                    <ul>
                        <li style="clear: both;position:relative;margin-left:30%;top:30px;color:#808080;">
                            <p style="margin-top: 50px;">宇轩哥哥、熙羽妹妹等已赞赏</p>
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
                        【共{{article.commentsNum}}条评论】
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

        <Row style="position: relative;margin-bottom:50px;margin-left: 50px;">
            <Col :xs="17" :sm="17" :md="17" :lg="17" style="padding: 10px;">
            <hr style="height:5px;margin-top:10px;margin-bottom:10px;border:none;border-top:1px solid rgba(255,165,0,0.2);"/>
            <div v-for="(c,index) in comments.list">
                <div class="staff_list" style="position: relative;margin-left: 50px;">
                    <div class="staff_progress" style="position: relative">
                        <div style="text-align: right;position: relative;right:-80px;">
                            <Tag color="yellow">{{index + 1}}楼</Tag>
                        </div>

                        <comment style="margin-top: -45px;" :OneComment="c" @articlePreview="articlePreview"
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
            <Col :xs="4" :sm="4" :md="4" :lg="4">
            </Col>
        </Row>

        <Form ref="tagForm" :model="article" style="margin-left: 50px;">
            <Row>
                <Col :xs="17" :sm="17" :md="17" :lg="17">
                <Form-item prop="content">
                    <quill-editor ref="myTextEditor"
                                  :content="content"
                                  :options="editorOption"
                                  @change="onEditorChange($event)">
                    </quill-editor>
                </Form-item>
                <Button type="warning" icon="ios-chatbubble-outline" size="large" @click="commitComment">提交评论
                </Button>
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
    import hljs from 'highlight.js/lib/highlight';


    export default {
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
                    id: '',
                    title: '',
                    cover: '',
                    path: '',
                    type: '',
                    status: '',
                    tags: [],
                    categories: [],
                    hits: null,
                    commentsNum: null,
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
                    commentsNum: null,
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
                content: '在此输入评论内容...',
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

        }
        ,
        created() {

        }
        ,
        components: {
            VueMarkdown, DashChartVisitor, quillEditor, Comment // 声明组件
        }
        ,
        mounted() {
            window.scrollTo(0,0);

            var id = this.$route.params.id;
            this.articlePreview(id);
            this.getArticleComments(id);
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
            articlePreview(id) {
                store.dispatch('ArticlePreview', {id: id}).then(res => { // 拉取user_info
                    var article = res.data;
                    this.article = article;
                }).catch(() => {
                    console.log("获取文章详情失败");
                })
            }
            ,
            getArticleComments(articleId) {
                store.dispatch('ArticleComments', {
                    articleId: articleId,
                    pageNum: this.commentParams.pageNum,
                    pageSize: this.commentParams.pageSize
                }).then(res => { // 拉取user_info
                    var comments = res.data;
                    this.comments = comments;
                    this.loadingComments = false;
                }).catch(() => {
                    console.log("获取文章详情失败");
                })
            }
            ,
            loadMoreComments() {
                this.loadingComments = true;
                this.commentParams.pageSize += 6;
                this.getArticleComments(this.article.id);
            }
            ,
            commitComment() {
                var marktext = h2m(this.content);
                store.dispatch('CommitComment', {
                    articleId: this.article.id,
                    content: marktext,
                    type: 'comment'
                }).then(res => { // 拉取user_info
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('发表评论成功');
                        this.article.commentsNum++;
                        this.getArticleComments(this.article.id);
                    } else {
                        this.$Message.error(data.msg);
                    }
                }).catch(() => {
                    console.log("提交评论失败");
                })
            }
            ,
            updateStatistics(type) {
                this.statistics.articleId = this.article.id;
                if (type == 'hits') {
                    this.article.hits++;
                } else if (type == 'commentsNum') {
                    this.article.commentsNum++;
                } else if (type == 'likes') {
                    this.article.likes++;
                } else if (type == 'dislikes') {
                    this.article.dislikes++;
                }
                this.statistics.hits = this.article.hits;
                this.statistics.commentsNum = this.article.commentsNum;
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
                        } else if (type == 'commentsNum') {
                            this.article.commentsNum--;
                        } else if (type == 'likes') {
                            this.article.likes--;
                        } else if (type == 'dislikes') {
                            this.article.dislikes--;
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
            ,
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
        ,
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
            }
        }
    }
</script>

<style scoped>
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
        border: 1px solid rgba(255, 165, 0, 0.1);
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