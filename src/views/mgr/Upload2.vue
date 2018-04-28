<template>
    <div class="animated fadeIn">

        <Row>
            <Col :md="24">
                <div>
                    <div id="container" style="margin-bottom:10px;">
                        <Button type="primary" size="large" icon="ios-cloud-upload-outline"
                                @click="qiniu_upload" style="padding-bottom:5px;">上传文件
                        </Button>
                        <input type="file" id='pickfiles'/>

                        <Progress :percent="progresscount" :status="progresstatus"
                                  style="width=90%;vertical-align:middle"
                                  v-if="progresshow">
                            <Icon type="checkmark-circled" v-if="progresscount==100"></Icon>
                            <span v-if="progresscount===100">上传成功</span>
                            <Icon type="close-circled" v-if="progresstatus==='wrong'"></Icon>
                            <span v-if="progresstatus==='wrong'">上传失败</span>
                            <span style="position:absolute;left:50%;top:-5px;"
                                  v-if="progresscount!==0&&progresscount!=100">{{progressspeed}}</span>
                        </Progress>
                    </div>
                </div>
            </Col>
            <Col :md="12">
            </Col>
        </Row>
    </div>
</template>

<script>
    import store from 'store/';
    import * as qiniu from 'qiniu-js';

    var vue;
    var observable;

    function qiniuInit(vue) {

        observable = qiniu.upload($("#pickfiles").val(), "1213213213123", vue.token)

    }

    export default {

        name: 'buttons',
        data() {
            return {
                file:null,
                uptoken: '',
                progresshow: false,
                progresscount: 0,
                progresstatus: 'active',
                progressspeed: 0,
                pageindex: 1,
                page_video_list: [],
                lodding: false,
                list_loadding: false,
            }//return
        },//data
        methods: {
            qiniu_upload() {
                qiniuInit(this);//初始化七牛数据


                var observer = {
                    next(res) {
                        console.log(res)
                    },
                    error(err) {
                        console.log(err)
                    },
                    complete(res) {
                        console.log(res)
                    }
                }
                var subscription = observable.subscribe(observer) // 这样传参形式也可以

            },
            getUptoken() {
                store.dispatch("GetUptoken", {bucket: 'touch6'}).then(response => {
                    var uptoken = response.data.payload;
                    this.uptoken = uptoken;

                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    })
                })
            }
        },
        mounted() {
            const vue = this;

            this.list_loadding = true;
            setTimeout(function () {
                vue.list_loadding = false;

            }, 1000);
            this.getUptoken();
        },
    }


</script>


<style type="text/css" scoped>
    .ivu-tag-dot {
        border: none !important;
    }

    tr.ivu-table-row-hover td .ivu-tag-dot {
        background-color: #ebf7ff !important;
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

    ;
    .demo-i-circle-custom span i {
        font-style: normal;
        color: #3f414d;
    }

    /*wz-btn wz-btn-primary wz-btn-small wz-btn-loading*/

    .ivu-btn.ivu-btn-primary.ivu-btn-small:not(.ivu-btn-loading ) {
        padding: 2px 10px !important;
    }

    td.ivu-table-expanded-cell {
        background-color: white !important;

    }
</style>



