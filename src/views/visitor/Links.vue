<template>
    <div class="animated fadeIn">

        <h3 style="text-align:center">概况</h3>
        <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>
        <Row>
            <div v-for="link in links">
                <Col span="6"  class="link-piece">
                <div class="echarts">
                    <ul>
                        <li style="margin: 10px;">友链名称：<a :href="link.value" target="_blank">{{link.name}}</a></li>
                        <li style="margin: 10px;">链接地址：{{link.value}}</li>
                        <li style="margin: 10px;">描述信息：{{link.description}}</li>
                    </ul>
                </div>
                </Col>
            </div>
        </Row>
    </div>
</template>

<script>
    import IntroChartCount from './../charts/IntroChartCount';
    import IntroChartPie from './../charts/IntroChartPie';
    import store from 'store/';

    export default {
        components: {IntroChartCount, IntroChartPie},
        name: 'dashboard',
        data() {
            return {
                links: [],
                value1: 0,
                value2: 0,
                value3: 0,

                speed: 10000,
            }
        },
        methods: {
            linkList() {
                store.dispatch('LinkList', {}).then(res => {
                    var links = res.data.payload;
                    this.links = links;
                }).catch(err => {
                    this.$Message.error(err);
                });
            }
        },
        mounted() {
            this.linkList();

        }
    }
</script>


<style type="text/css" scoped>
    .link-piece {
        margin: 10px 25px;
    }

    .echarts {
        margin-top: 45px;
        border-radius: 4px;
        height: 150px;
        width: 100%;
        border: 1px solid rgba(255, 165, 0, 0.2);
        background: #f6faff;
        box-shadow: 0px 2px 18px 4px #ffa5002b;
        color: black;
    }

    .time {
        font-size: 14px;
        font-weight: bold;
    }

    .content {
        padding-left: 5px;
    }

    .dashboard_feature {
        text-align: center;
    }

    .demo-carousel {
        height: 600px;
        line-height: 200px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #506b9e;
    }

    .demo-carousel img {
        height: 100%;
        width: 100%;
    }

    h3, h4, h5 {
        margin: 12px;
    }

    h3 {
        margin-bottom: 20px;
    }

    p {
        margin: 12px;
    }

    .row-margin-top {
        margin-top: 30px;
    }
</style>