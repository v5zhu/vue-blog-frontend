<template>
    <div>

        <Row :gutter="16" style="margin-top: 45px;margin-left: 100px;">
            <Col span="18">
                <div class="state-overview" v-for="headline in pageInfo.list" style="border: rgba(161,54,255,0.22) 1px solid;">
                    <navbar>
                        <div v-if="headline.thumbnail_pic_s02">
                            <Row>
                                <Col>
                                    <div>
                                        <a style='color: black;font-weight: 800;font-size: 16px;'
                                           :href="headline.url" target="_blank">{{headline.title}}
                                        </a>
                                    </div>

                                    <div style="color: #0d5477;text-align: left;">&nbsp;
                                        <img src="/static/img/avatars/man-avatar.png"
                                             style="height:20px;width:20px;border-radius: 50%;margin-bottom: 5px;"/>
                                        <a href="#" style="margin-left: -4px;">{{headline.author_name}}</a>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="3">
                                    <img :src="headline.thumbnail_pic_s"
                                         style="height:150%;width: 150%;margin-right: 10px;"/>
                                </Col>
                                <Col span="3">
                                    <img :src="headline.thumbnail_pic_s02" v-if="headline.thumbnail_pic_s02"
                                         style="height:150%;width: 150%;margin-right: 10px;"/>
                                </Col>
                                <Col span="3">
                                    <img :src="headline.thumbnail_pic_s03" v-if="headline.thumbnail_pic_s03"
                                         style="height:150%;width: 150%;margin-right: 10px;"/>
                                </Col>
                            </Row>
                        </div>
                        <div v-else>
                            <Row>
                                <Col span="3">
                                    <img :src="headline.thumbnail_pic_s"
                                         style="height:150%;width: 150%;margin-right: 10px;"/>
                                </Col>
                                <Col span="3">
                                    <img :src="headline.thumbnail_pic_s02" v-if="headline.thumbnail_pic_s02"
                                         style="height:150%;width: 150%;margin-right: 10px;"/>
                                </Col>
                                <Col span="3">
                                    <img :src="headline.thumbnail_pic_s03" v-if="headline.thumbnail_pic_s03"
                                         style="height:150%;width: 150%;margin-right: 10px;"/>
                                </Col>

                                <Col span="12">
                                    <div>
                                        <a style='color: black;font-weight: 800;font-size: 16px;'
                                           :href="headline.url" target="_blank">{{headline.title}}
                                        </a>
                                    </div>

                                    <div style="color: #0d5477;text-align: left;">&nbsp;
                                        <img src="/static/img/avatars/man-avatar.png"
                                             style="height:20px;width:20px;border-radius: 50%;margin-bottom: 5px;"/>
                                        <a href="#" style="margin-left: -4px;">{{headline.author_name}}</a>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </navbar>
                </div>


                <div v-if="pageInfo.total > pageInfo.pageSize" style="text-align: center;position: relative">
                    <p @click="pullForUpdate" style="border: none;cursor: pointer;">
                        <Icon type="ios-more-outline" size="32"></Icon>
                        <Icon type="ios-more-outline" size="32"></Icon>
                    </p>
                </div>
                <div style="text-align: center;position: relative;" v-if="pageInfo.pageSize>=pageInfo.total">全部加载完成
                </div>

            </Col>
            <Col span="4">
                &nbsp;
            </Col>

        </Row>
    </div>
</template>

<script>
    import navbar from '@/components/Visitor/ArticleNavbar';


    export default {
        components: {navbar},
        name: 'headline',
        data() {
            return {
                pageInfo: {
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
                pageSizeOpts: [10, 20, 50, 100],
                tags: [],
                value1: 0,
                value2: 0,
                value3: 0,

                speed: 10000,
                pageQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterMap: {
                        title: null,
                        authorName: null
                    },
                    sortMap: {}
                },
            }
        },
        created() {
            this.listHeadlines();
        },
        methods: {
            pullForUpdate() {
                this.pageInfo.pageSize += 6;
                this.listHeadlines();
                this.$Notice.success({
                    title: '温馨提醒',
                    desc: '更新6条新文章,请浏览!'
                });
            },
            listHeadlines() {
                this.$Loading.start()

                this.$store.dispatch('ListHeadlines', {}).then(res => {
                    this.pageInfo = res.data.payload;
                    this.$Loading.finish();
                }).catch(err => {
                    this.$Message.error(err);
                    this.$Loading.error()
                });
            },
            changePage(page) {
                this.pageInfo.pageNum = page;
                this.listHeadlines();
            },
            changePageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.listHeadlines();
            }
        }
    }
</script>


<style type="text/css" scoped>
    .app-header.navbar .nav-item {
        text-align: left;
        min-width: 60px;
    }

    .app-header.navbar {
        background: inherit;
        flex-direction: row;
        height: 85px;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        border: none;
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .li-nav-tag {
        padding: 1px 10px;
        width: 140px;
        height: 37px;
        border-radius: 3px;
        font-size: 12px;
        color: #0d5477;
        font-weight: 700;
        cursor: pointer;
    }

    .li-nav-tag:hover {
        background: rgba(255, 165, 0, 0.2);
    }

    .sidebar-nav-visitor {
        position: relative;
        /*left: 20px;*/
        width: 200px;
        padding: 10px 20px;
        min-height: 400px;
        height: auto;
        overflow-x: hidden;
        overflow-y: auto;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        transition: margin-left .25s, margin-right .25s, width .25s, flex .25s;
        color: #fff;
        /*background: #0d5477*/
    }

    .nav-item.header-item {
        margin-bottom: -30px;
        margin-left: 15px;
    }

    .article-title:hover {
        color: #7689c8 !important;
        text-decoration: underline;
    }

    .article-tags {
        height: 20px;
        min-width: 40px;
        margin-left: 20px;
        padding: 3px 5px;
        border-radius: 2px;
        cursor: pointer;
        background: rgba(128, 128, 128, 0.2);
    }

    .article-tags:hover {
        cursor: pointer !important;
        background: #0d5477;
        color: orange;
    }

    .state-overview {
        color: #f9d4ff;
        position: relative;
        min-height:200px;
    }

    .state-overview .ivu-col {
        margin-bottom: 20px
    }

    .state-overview .state-value .value {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .state-overview .state-value .title {
        font-size: 14px
    }

    .state-value {
        width: 68%;
    }

    .symbol {
        width: 50px;
        display: inline-block;
        position: relative;
    }

    .state-overview .panel {
        border-radius: 4px;
        padding: 10px 10px
    }

    .panel.purple {
        background: #6a8abe;
        box-shadow: 0 5px 0 #5f7cab
    }

    .panel.red {
        background-color: #fc8675;
        box-shadow: 0 5px 0 #e27869
    }

    .panel.blue {
        background: #5ab6df;
        box-shadow: 0 5px 0 #51a3c8
    }

    .panel.green {
        background: #4acacb;
        box-shadow: 0 2px 0 #42b5b6
    }

    .panel.like-header {
        /*background: #f6faff;*/
        /*box-shadow: 0px 2px 18px 4px #ffa5002b;*/
    }

    .ivu-row {
        margin-bottom: 20px !important
    }

    .dash_income {
        border-radius: 4px;
        background-color: #fff;
        height: 80px;
        padding: 15px
    }

    .staff_name {
        font-weight: 900;
        font-size: 16px
    }

    .staff_progress {
        margin-left: 10px;
        width: 90%
    }

    .staff_progress p {
        margin: 0
    }

    .staff_list {
        border-radius: 4px;
        margin-top: 0;
        height: 90px;
        display: flex;
        align-items: center
    }

    li {
        list-style-type: none;
        margin-bottom: 11px;
        margin-left: 10px;
        margin-right: 10px
    }

    .num {
        font-weight: 700
    }

    .time {
        font-size: 14px;
        font-weight: 700
    }

    .content {
        padding-left: 5px
    }

    .dashboard_feature {
        text-align: center
    }

    .demo-carousel {
        height: 600px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #506b9e
    }

    .demo-carousel img {
        height: 100%;
        width: 100%
    }

    h3, h4, h5 {
        margin: 12px
    }

    h3 {
        margin-bottom: 20px
    }

    p {
        margin: 12px
    }

    .row-margin-top {
        margin-top: 30px
    }

    .state-info {
        position: absolute;
        right: 15px;
        top: 20px;
        margin-bottom: 30px
    }


    .panel {
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .05)
    }

    .panel-body {
        padding: 15px
    }


    .state-info .panel .summary span {
        color: #49586e;
        font-size: 13px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 10px
    }

    .state-info .panel .summary h3.red-txt {
        color: #fc8675
    }

    .state-info .panel .summary h3.green-txt {
        color: #65cea7
    }

    .state-info .panel .summary h3 {
        font-size: 200%;
        font-weight: 700;
        line-height: 20px;
        margin: 0
    }

    .page-heading h3 {
        color: #49586e;
        font-size: 25px;
        font-size: 11%;
        font-weight: 400;
        margin: 10px 0
    }

    .chart-bar img {
        display: inline-block;
        width: 68px;
        height: 45px;
        vertical-align: top
    }

    @media screen and (max-width: 767px) {
        .state-info {
            position: static;
            width: 100%;
            margin-top: 15px
        }

        .state-info .panel {
            width: 100%
        }
    }

    .panel.blue-box {
        background: none repeat scroll 0 0 #5ab5de;
        box-shadow: 0 5px 0 #51a3c7;
        color: #fff
    }

    .twt-info h3 {
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        font-weight: 900;
        margin: 10px 0 30px 0;
        text-align: center
    }

    .twt-info p {
        font-size: 18px;
        line-height: 25px;
        font-style: italic;
        margin: 0 0 20px 0;
        text-align: center
    }

    .twt-info p a {
        color: #98fdf4;
    }

    .media:first-child {
        margin-top: 0
    }

    .media.usr-info > .pull-left {
        margin-right: 20px;
        margin-top: 10px
    }

    .media > .pull-left {
        margin-right: 10px
    }

    .custom-trq-footer {
        background: none repeat scroll 0 0 #4eb6b7 !important;
        box-shadow: 0 5px 0 #46a3a4;
        color: #fff;
        border-top: none
    }

    .panel-footer {
        padding: 10px 15px;
        background-color: #f5f5f5;
        border-top: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px
    }

    .usr-info .thumb {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        -webkit-border-radius: 50%
    }

    .usr-info img {
        vertical-align: middle
    }

    .usr-info h4 {
        color: #658585;
        margin-bottom: 0
    }

    .media-heading {
        margin: 0 0 5px
    }

    .usr-info .media-body span {
        color: #ea755c;
        font-size: 12px;
        margin-bottom: 20px;
        display: inline-block
    }

    .usr-info .media-body p {
        color: #b6bcbc
    }

    ul.user-states {
        list-style-type: none;
        padding: 20px 0
    }
</style>