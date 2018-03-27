<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
        <Button type="primary" size="default" @click="openNewModal()">新增页面元素</Button>
        <Modal v-model="pageElementModal" width="600" :maskClosable="false"
               @on-visible-change="changeModalVisible">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-location-outline" size="20"></Icon>
                <span style="font-size:14px;">新增页面元素</span>
            </p>
            <Form ref="pageElementForm" :model="pageElement" :label-width="80">
                <Row>
                    <Col span="20" class="link-piece">
                    <ul>
                        <li style="margin: 10px;">
                            <Form-item prop="upper" label="所属路由">
                                <Cascader v-model="pageElement.upper" :data="routesTree" change-on-select
                                          @on-change="changeParent"></Cascader>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="name" label="名称">
                                <Input v-model="pageElement.name" type="text">
                                </Input>
                            </Form-item>
                        </li>

                        <li style="margin: 10px;">
                            <Form-item prop="description" label="描述">
                                <Input v-model="pageElement.description" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li>
                            <div style="text-align: right;margin: 10px;">
                                <Button type="ghost" @click="clearAll('pageElementForm')">
                                    <Icon type="ios-checkmark" size="14"></Icon>
                                    清除
                                </Button>
                                <Button type="ghost" @click="savePageElement">
                                    <Icon type="ios-checkmark" size="14"></Icon>
                                    保存
                                </Button>
                            </div>
                        </li>
                    </ul>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" style="text-align: center">
            </div>
        </Modal>
        <Row>
            <Col span="21">
            <div style="position:relative;margin-top: 10px;">
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
        name: 'pageElement',
        data() {
            return {
                pageElement: {
                    id: '',
                    name: '',
                    description: '',
                    route: {
                        id: ''
                    },
                    upper: []
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    list: [],
                    total: 0
                },
                pageSizeOpts: [5, 10, 20, 50, 100],
                list_loadding: false,
                pageElementModal: false,
                routesTree: [],// 上级路由级联下拉框
                tableDataList: [
                    {
                        title: 'ID',
                        key: 'id',
                        ellipsis: 'true',
                        width: 100
                    },
                    {
                        title: '元素名称',
                        key: 'name',
                        width: 150,
                        ellipsis: true
                    },
                    {
                        title: '所属路由',
                        width: 150,
                        ellipsis: true,
                        render: (h, params) => {
                            var route = params.row.route == null ? '' : '【' + params.row.route.name + '】';
                            return h('div', [
                                h('div', {
                                    style: {
                                        border: 'none',
                                        fontWeight: 700
                                    }
                                }, route),
                            ]);
                        }
                    },
                    {
                        title: '描述',
                        key: 'description',
                        ellipsis: true
                    },
                    {
                        title: '操作',
                        width: 200,
                        key: 'action',
                        align: 'center',
                        ellipsis: 'true',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.copyElement(params.row);
                                        }
                                    },
                                }, '复制'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editPageElement(params.row);
                                        }
                                    },
                                }, '编辑'),
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

            }, 1000);
            this.listRoutesTree(null);
            this.listPageElement();
        },
        methods: {
            listRoutesTree(type) {
                store.dispatch('ListRoutesTree', {type: type}).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.routesTree = data.payload;
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
            openNewModal() {
                this.clearAll('pageElementForm');
                this.pageElementModal = true;
            },
            changePage(pageNum) {
                this.pageInfo.pageNum = pageNum;
                this.listPageElement();
            },
            changePageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.listPageElement();
            },
            changeParent(routeId) {
                if (routeId && routeId.length > 0) {
                    this.pageElement.route.id = routeId[routeId.length - 1];
                } else {
                    this.$Message.warning('未选择上级路由');
                }
            },
            clearAll(refName) {
                this.$refs[refName].resetFields();
            },
            editPageElement(row) {
                var routeTree=row.routeTree;
                this.pageElement = row;
                this.pageElement.upper = routeTree;//设置上级路由的默认值

                if (row.route == null) {
                    this.pageElement.route = {
                        id: ''
                    }
                }
                this.pageElementModal = true;
            },
            listPageElement() {
                store.dispatch('ListPageElement', {
                    type: '',
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
            copyElement(row) {
                this.pageElement = row;
                this.pageElement.id = '';
                this.savePageElement();
            },
            savePageElement() {
                if (!this.pageElement.route.id) {
                    this.$Message.error({
                        content: '请选择所属组件',
                        duration: 5,
                        closable: true
                    });
                }
                if (!this.pageElement.id) {
                    store.dispatch('AddPageElement', this.pageElement).then(res => {
                        var data = res.data;
                        if (data.success == true) {
                            this.$Message.success('添加成功');
                            this.clearAll('pageElementForm');
                            this.listPageElement();
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
                } else {
                    store.dispatch('EditPageElement', this.pageElement).then(res => {
                        var data = res.data;
                        if (data.success == true) {
                            this.$Message.success('编辑成功');
                            this.listPageElement();
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
                }
            },
            remove(id) {
                this.$Modal.confirm({
                    title: '删除页面元素',
                    content: '<p>点击确定1秒后将删除此页面元素</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch('DeletePageElement', {id: id}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.listPageElement();
                                } else {
                                    this.$Message.error(resp.msg);
                                }
                            }).catch(err => {
                                this.$Message.error({
                                    content: err.data.msg,
                                    duration: 5,
                                    closable: true
                                });
                            })
                            this.$Modal.remove();
                        }, 1000);
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            changeModalVisible() {

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