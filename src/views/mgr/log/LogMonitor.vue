<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
        <Row>
            <Col span="21">
            <div style="position:relative;">
                <Table :columns="tableDataList" :data="pageInfo.list" ref="table">

                </Table>
                <div style="position:absolute;top:0px;width:100%;height:100%;display: flex;
                            align-items: center;
                            justify-content: center;background: rgba(210, 216, 222, 0.5);" v-if="list_loadding">
                    <Spin size="large"></Spin>
                    <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
                </div>
            </div>
            <Page :total="this.pageInfo.total" placement="top"
                  :page-size-opts="pageSizeOpts"
                  show-elevator show-sizer show-total
                  @on-change="changePage"
                  @on-page-size-change="changePageSize"
                  style="text-align:left;margin:50px 0">
            </Page>
            </Col>
        </Row>

    </div>
</template>

<script>
    import store from 'store/';
    import {formatTime} from 'utils/index';

    export default {
        components: {},
        name: 'logMonitor',
        data() {
            return {
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    list: [],
                    total: 0
                },
                pageSizeOpts: [5, 10, 20, 50, 100],
                list_loadding: false,
                tableDataList: [
                    {
                        title: '动作',
                        key: 'action',
                        ellipsis: 'true',
                        width: 100
                    },
                    {
                        title: '数据',
                        key: 'data',
                        ellipsis: 'true'
                    },
                    {
                        title: '级别',
                        key: 'level',
                        ellipsis: 'true',
                        width: 100,
                    },
                    {
                        title: '对象',
                        key: 'author',
                        ellipsis: 'true',
                        width: 100,
                    },
                    {
                        title: 'IP',
                        key: 'ip',
                        ellipsis: 'true',
                        width: 100,
                    },
                    {
                        title: 'URL',
                        key: 'url',
                        ellipsis: 'true',
                        width: 100,
                    },
                    {
                        title: '浏览器',
                        key: 'browser',
                        ellipsis: 'true',
                        width: 100,
                    },
                    {
                        title: '时间',
                        width: 120,
                        key: 'gmt_create',
                        ellipsis: 'true',
                        render: (h, params) => {
                            const time = params.row.gmtCreate;
                            var datetime = formatTime(time, '{y}-{m}-{d} {i}:{m}:{s}');
                            return h('div', [
                                h('Tooltip', {
                                    props: {
                                        content: datetime
                                    }
                                }, datetime),
                            ]);
                        }

                    },
                    {
                        title: '操作',
                        width: '100',
                        key: 'action',
                        align: 'center',
                        ellipsis: 'true',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    },
                                }, '删除')
                            ]);

                        }//render
                    },//{
                ],//cloumn
            }
        },
        mounted() {
            var vue = this;
            this.list_loadding = true;
            setTimeout(function () {
                vue.list_loadding = false;

            }, 2000);
            this.logList();
        },
        methods: {
            changePage() {

            },
            changePageSize() {

            },
            logList() {
                store.dispatch('LogList', {
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize
                }).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.pageInfo = data.payload;
                    } else {
                        this.$Message.error('加载失败');
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Message.error({
                        content: err.data.msg,
                        duration: 5,
                        closable: true
                    });
                });
            },
            remove(id) {
                this.$Modal.confirm({
                    title: '删除日志',
                    content: '<p>点击确定1秒后将删除此日志</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch('DeleteLog', {id: id}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.logList();
                                } else {
                                    this.$Message.error('删除失败');
                                }
                            }).catch(err => {
                                console.log("删除日志请求失败");
                            })
                            this.$Modal.remove();
                        }, 1000);
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d}', false);
            }
        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d}', false);
            }
        }
    }
</script>


<style type="text/css" scoped>
    .link-piece {
        margin: 10px 25px;
    }

    .echarts {
        border-radius: 4px;
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