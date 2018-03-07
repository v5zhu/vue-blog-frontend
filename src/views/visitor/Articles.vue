<template>
    <div class="animated fadeIn">
        <Row :gutter="16" style="margin-top: 45px;">


            <Col :xs="20" :sm="20" :md="20" :lg="20">

            <div class="state-overview" v-for="article in pageInfo.list">
                <Col span="6">

                <div class="panel deep article-background" style="width: auto;height:150px;margin: 5px;">

                    <div class="symbol">
                        <img style="position: absolute;left: 22px;top: 22px;width: 30%;height:60%;" size="32" src="static/img/avatars/6.jpg"/>

                        <div style="position: absolute;left: 22px;top: 132px;">
                            <Icon type="eye" size="13"
                                  color="white"></Icon>
                            {{article.hits}}
                        </div>
                        <div style="position: absolute;left: 62px;top: 132px;">
                            <Icon type="heart" size="12"
                                  color="white"></Icon>
                            {{article.hits}}
                        </div>
                    </div>
                    <div class="state-value">
                        <a class="value article-title" style="color: white;" @click="viewArticle(article.id)">
                            {{article.title}}
                        </a>
                    </div>
                </div>

                </Col>
            </div>


            </Col>

        </Row>
        <Row :gutter="16">
            <Page :total="this.pageInfo.total" placement="top"
                  :page-size-opts="pageSizeOpts"
                  :current="this.pageInfo.pageNum"
                  show-elevator show-sizer show-total
                  @on-change="changePage"
                  @on-page-size-change="changePageSize"
                  style="text-align:left;margin-top:50px;margin-left: 20px;"></Page>
        </Row>
    </div>
</template>

<script>
    import DashChartCount from './../charts/DashChartCount';
    import DashChartVisitor from './../charts/DashChartVisitor';
    import DashChartLarge from './../charts/DashChartLarge';
    import VueCalendar from './../components/VueCalendar';
    import TodoList from '@/components/TodoList'

    export default {
        components: {DashChartCount, DashChartVisitor, DashChartLarge, VueCalendar, TodoList},
        name: 'dashboard',
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
                value1: 0,
                value2: 0,
                value3: 0,

                speed: 10000,
            }
        },
        methods: {
            test_logout() {
                this.$store.dispatch('LogOut').then(() => {
                    this.$router.push({path: '/login'});
                }).catch(err => {
                    this.$Message.error(err);
                });
            },
            articles() {
                this.$store.dispatch('Articles', {
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize
                }).then(res => {
                    this.pageInfo = res.data;
                }).catch(err => {
                    this.$Message.error(err);
                });
            },
            viewArticle(articleId) {
                this.$router.push({path: '/article/' + articleId})
            },
            changePage(page) {
                this.pageInfo.pageNum = page;
                this.articles();
            },
            changePageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.articles();
            },

        },
        mounted() {
            this.articles();

        }
    }
</script>


<style type="text/css" scoped>

    .article-title:hover {
        color: #8cc886 !important;
        text-decoration: underline;
    }

    .state-overview {
        color: #f9d4ff
    }

    .state-overview .ivu-col {
        margin-bottom: 20px
    }

    .state-overview .state-value .value {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 5px
    }

    .state-overview .state-value .title {
        font-size: 14px
    }

    .state-value {
        width: 60%;
        display: inline-block
    }

    .symbol {
        width: 35%;
        display: inline-block
    }

    .state-overview .panel {
        border-radius: 4px;
        padding: 25px 20px
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

    .panel.deep {
        background: #49586e;
        box-shadow: 0 2px 0 #495864
    }

    .dash_income_chart {
        float: left
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

    .state-info .panel {
        margin-bottom: 20px;
        float: right;
        margin-left: 15px
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

    .state-info .panel .summary {
        float: left;
        margin-right: 20px
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

    .chart-bar {
        float: right;
        margin-top: 5px
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
        color: #98fdf4
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

    .pull-left {
        float: left
    }

    .pull-left {
        float: left !important
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

    ul.user-states li {
        text-align: center;
        float: left;
        width: 33%;
        font-size: 18px;
        margin: 0
    }
</style>