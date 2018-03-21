<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
        <Button type="primary" size="default" @click="openNewModal()">新增角色</Button>
        <Modal v-model="roleModal" width="600" :maskClosable="false"
               @on-visible-change="changeModalVisible">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-location-outline" size="20"></Icon>
                <span style="font-size:14px;">新增角色</span>
            </p>
            <Form ref="roleForm" :model="role" :label-width="80">
                <Row>
                    <Col span="20" class="link-piece">
                    <ul>
                        <li style="margin: 10px;">
                            <Form-item prop="name" label="名称">
                                <Input v-model="role.name" type="text">
                                </Input>
                            </Form-item>
                        </li>

                        <li style="margin: 10px;">
                            <Form-item prop="description" label="描述">
                                <Input v-model="role.description" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li>
                            <div style="text-align: right;margin: 10px;">
                                <Button type="ghost" @click="clearAll('roleForm')">
                                    <Icon type="ios-checkmark" size="14"></Icon>
                                    清除
                                </Button>
                                <Button type="ghost" @click="saveRole">
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
        name: 'role',
        data() {
            return {
                role: {
                    id: '',
                    name: '',
                    description: '',
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    list: [],
                    total: 0
                },
                pageSizeOpts: [5, 10, 20, 50, 100],
                list_loadding: false,
                roleModal: false,
                tableDataList: [
                    {
                        title: 'ID',
                        key: 'id',
                        ellipsis: 'true',
                        width: 100
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 150,
                        ellipsis: true
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
                                        type: 'success',
                                        size: 'small',
                                        disabled: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editRole(params.row);
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

            }, 2000);
            this.listRole();
        },
        methods: {
            openNewModal() {
                this.clearAll('roleForm');
                this.roleModal = true;
            },
            changePage(pageNum) {
                this.pageInfo.pageNum = pageNum;
                this.listRole();
            },
            changePageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.listRole();
            },
            clearAll(refName) {
                this.$refs[refName].resetFields();
            },
            editRole(row) {
                this.role = row;
                this.roleModal = true;
            },
            listRole() {
                store.dispatch('ListRole', {
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
            saveRole() {
                if (!this.role.id) {
                    store.dispatch('AddRole', this.role).then(res => {
                        var data = res.data;
                        if (data.success == true) {
                            this.$Message.success('添加成功');
                            this.clearAll('roleForm');
                            this.listRole();
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
                    store.dispatch('EditRole', this.role).then(res => {
                        var data = res.data;
                        if (data.success == true) {
                            this.$Message.success('编辑成功');
                            this.listRole();
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
                    title: '删除角色',
                    content: '<p>点击确定1秒后将删除此角色</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch('DeleteRole', {id: id}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.listRole();
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