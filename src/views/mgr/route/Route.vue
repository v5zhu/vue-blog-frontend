<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
        <Button type="primary" size="default" @click="openNewModal()">添加新路由</Button>
        <Modal v-model="routeModal" width="600" :maskClosable="false"
               @on-visible-change="changeModalVisible">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-location-outline" size="20"></Icon>
                <span style="font-size:14px;">添加路由</span>
            </p>
            <Form ref="routeForm" :model="route" :label-width="80">
                <Row>
                    <Col span="20" class="link-piece">
                    <ul>
                        <li style="margin: 10px;">
                            <Form-item prop="type" label="类型">
                                <Select v-model="route.type" style="width:200px" @on-change="changeType">
                                    <Option v-for="item in typeEnums" :value="item.value" :key="item.value">
                                        {{item.name}}
                                    </Option>
                                </Select>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="upper" label="上级路由">
                                <Cascader v-model="route.upper" :data="routesTree" change-on-select
                                          @on-change="changeParent"></Cascader>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="name" label="显示名称">
                                <Input v-model="route.name" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="path" label="访问路径">
                                <Input v-model="route.path" type="text">
                                </Input>
                            </Form-item>
                        </li>

                        <li style="margin: 10px;">
                            <Form-item prop="redirect" label="重定向路径">
                                <Input v-model="route.redirect" type="text">
                                </Input>
                            </Form-item>
                        </li>

                        <li style="margin: 10px;">
                            <Form-item prop="component" label="组件路径">
                                <Input v-model="route.component" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="hidden" label="是否显示">
                                <Select v-model="route.hidden" style="width:200px">
                                    <Option v-for="item in visibleEnums" :value="item.value" :key="item.value">
                                        {{item.name}}
                                    </Option>
                                </Select>
                            </Form-item>
                        </li>

                        <li style="margin: 10px;">
                            <Form-item prop="icon" label="图标">
                                <Input v-model="route.icon" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li>
                            <div style="text-align: right;margin: 10px;">
                                <Button type="ghost" @click="clearAll('routeForm')">
                                    <Icon type="ios-checkmark" size="14"></Icon>
                                    清除
                                </Button>
                                <Button type="ghost" @click="saveRoute">
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
    import expandRow from './../route/route-table-expand.vue';

    export default {
        components: {expandRow},
        name: 'route',
        data() {
            return {
                route: {
                    id: '',
                    name: '',
                    path: '',
                    redirect: '',
                    component: '',
                    parent: {
                        id: ''
                    },
                    hidden: '',
                    icon: '',
                    type: '',
                    gmtCreate: '',
                    gmtModified: '',
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
                routeModal: false,
                routesTree: [],// 上级路由级联下拉框
                visibleEnums: [
                    {name: '显示', value: 0},
                    {name: '隐藏', value: 1}
                ],
                typeEnums: [
                    {name: '前台头部', value: 'frontheader'},
                    {name: '后台头部', value: 'backheader'},
                    {name: '路由', value: 'route'}
                ],
                tableDataList: [
                    {
                        type: 'expand',
                        width: "30",
                        ellipsis: 'true',

                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '名称',
                        key: 'name',
                        ellipsis: 'true',
                        width: 150
                    },
                    {
                        title: '路径',
                        key: 'path',
                        width: 150,
                        ellipsis: true
                    },
                    {
                        title: '组件',
                        key: 'component',
                        ellipsis: true
                    },
                    {
                        title: '父组件',
                        ellipsis: true,
                        render: (h, params) => {
                            var parent = !params.row.parent.id ? '' : '【' + params.row.parent.name + '】';
                            return h('div', [
                                h('div', {
                                    style: {
                                        border: 'none',
                                        fontWeight: 700
                                    }
                                }, parent),
                            ]);
                        }
                    },
                    {
                        title: '图标',
                        ellipsis: true,
                        render: (h, params) => {
                            var icon = params.row.icon;
                            return h('div', [
                                h('i', {
                                    style: {
                                        border: 'none',
                                        fontWeight: 700,
                                        fontSize: 16
                                    },
                                    class: [icon]
                                }),
                            ]);
                        }
                    },
                    {
                        title: '状态',
                        key: 'hidden',
                        ellipsis: 'true',
                        width: 100,
                        render: (h, params) => {
                            const hidden = params.row.hidden;
                            if (hidden === 1) {
                                return h('div', [
                                    h('div', {}, '隐藏'),
                                ]);
                            }
                            else if (hidden === 0) {
                                return h('div', [
                                    h('div', {}, '显示'),
                                ]);
                            }
                        }
                    },
                    {
                        title: '类型',
                        key: 'type',
                        ellipsis: 'true',
                        width: 100,
                        render: (h, params) => {
                            const type = params.row.type;
                            if (type === 'backheader') {
                                return h('div', [
                                    h('div', {}, '后台头部'),
                                ]);
                            }
                            else if (type === 'frontheader') {
                                return h('div', [
                                    h('div', {}, '前台头部'),
                                ]);
                            }
                            else if (type === 'route') {
                                return h('div', [
                                    h('div', {}, '路由'),
                                ]);
                            }
                        }
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
                                            this.copyRoute(params.row);
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
                                            this.editRoute(params.row);
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
            this.listRoute();
        },
        methods: {
            openNewModal() {
                this.clearAll('routeForm');
                this.routeModal = true;
            },
            changePage(pageNum) {
                this.pageInfo.pageNum = pageNum;
                this.listRoute();
            },
            changePageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.listRoute();
            },
            changeType() {
                if (this.route.type) {
                    this.route.upper = [];
                    this.listRoutesTree(this.route.type);
                }
            },
            changeParent(value) {
                if (value && value.length > 0) {
                    var id = value[value.length - 1];
                    this.getRouteById(id);
                } else {
                    this.$Message.warning('未选择上级路由');
                }
            },
            clearAll(refName) {
                this.$refs[refName].resetFields();
            },
            copyRoute(row) {
                this.route = row;
                this.route.path = this.route.path + '/copy';
                this.route.id = '';
                this.saveRoute();
            },
            editRoute(row) {
                var routeTree = row.routeTree;
                this.route = row;
                this.route.upper = routeTree;//设置上级路由的默认值
                if (row.parent == null) {
                    this.route.parent = {
                        id: '',
                        name: ''
                    }
                }
                this.routeModal = true;
            },
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
            getRouteById(id) {
                store.dispatch('GetRouteById', {id: id}).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.route.path = data.payload.path;
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
            listRoute() {
                store.dispatch('ListRoute', {
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
            saveRoute() {
                var parent = this.route.upper;
                if (parent && parent.length > 0) {
                    this.route.parent.id = parent[parent.length - 1];
                }
                if (!this.route.id) {
                    store.dispatch('AddRoute', this.route).then(res => {
                        var data = res.data;
                        if (data.success == true) {
                            this.$Message.success('添加成功');
                            this.clearAll('routeForm');
                            this.route.parent.id = '';
                            this.listRoute();
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
                    store.dispatch('EditRoute', this.route).then(res => {
                        var data = res.data;
                        if (data.success == true) {
                            this.$Message.success('编辑成功');
//                            window.location.reload();
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
                    title: '删除路由',
                    content: '<p>点击确定1秒后将删除此路由</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch('DeleteRoute', {id: id}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.listRoute();
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