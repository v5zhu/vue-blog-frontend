<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
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

        <Modal v-model="roleTreeModal" width="600" :maskClosable="false"
               @on-visible-change="changeRoleTreeModalVisible">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-location-outline" size="20"></Icon>
                <span style="font-size:14px;">分配角色</span>
            </p>
            <Form ref="userRoleForm" :label-width="80">
                <Row>
                    <Col span="20" class="link-piece">
                    <el-tree ref="roleTree"
                             :data="roleTrees"
                             show-checkbox
                             node-key="roleId"
                             :default-expand-all="true"
                             :props="defaultProps"
                             @check="checkChange">
                    </el-tree>
                    </Col>
                </Row>
                <Row>
                    <Col span="20" class="link-piece">
                    <Button type="ghost" size="small" icon="save" @click="saveUserRole">保存</Button>
                    </Col>
                </Row>

            </Form>
            <div slot="footer" style="text-align: center">
            </div>
        </Modal>

    </div>
</template>

<script>
    import store from 'store/';
    import {formatTime} from 'utils/index';
    import expandRow from './../user/user-table-expand.vue';

    export default {
        components: {expandRow},
        name: 'user',
        data() {
            return {
                user: {
                    id: '',
                    loginName: '',
                    token: '',
                    nickname: '',
                    email: '',
                    homeUrl: '',
                    loginStatus: '',
                    lastLoginTime: '',
                    gmtCreate: '',
                    gmtModified: ''
                },
                row: {},
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    list: [],
                    total: 0
                },
                pageSizeOpts: [5, 10, 20, 50, 100],
                list_loadding: false,
                roleTreeModal: false,
                roleTrees: [],
                defaultProps: {
                    children: 'children',
                    label: 'roleName'
                },
                checkedKeys: [],
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
                        title: '昵称',
                        key: 'nickname',
                        ellipsis: 'true',
                        width: 100
                    },
                    {
                        title: '账号',
                        key: 'loginName',
                        width: 150,
                        ellipsis: true
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        width: 150,
                        ellipsis: true
                    },
                    {
                        title: '网址',
                        key: 'homeUrl',
                        ellipsis: true
                    },
                    {
                        title: '登录状态',
                        ellipsis: 'true',
                        width: 150,
                        render: (h, params) => {
                            const loginStatus = params.row.loginStatus;
                            if (loginStatus === 1) {
                                return h('div', [
                                    h('div', {}, '在线'),
                                ]);
                            } else {
                                return h('div', [
                                    h('div', {}, '离线'),
                                ]);
                            }
                        }
                    },
                    {
                        title: '最后在线',
                        key: 'lastLoginTime',
                        ellipsis: 'true',
                        width: 150,
                        render: (h, params) => {
                            const lastLoginTime = params.row.lastLoginTime;
                            return h('div', [
                                h('div', {}, this.formatDate(lastLoginTime)),
                            ]);
                        }
                    },
                    {
                        title: '注册',
                        key: 'gmtCreate',
                        ellipsis: 'true',
                        width: 150,
                        render: (h, params) => {
                            const gmtCreate = params.row.gmtCreate;
                            return h('div', [
                                h('div', {}, this.formatDate(gmtCreate)),
                            ]);
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
                                            this.roleTreeModal = true;
                                            this.row = params.row;
                                        }
                                    },
                                }, '分配角色'),
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
            this.listUser();
            this.roleTree();
        },
        methods: {
            setCheckedKeys() {
                this.$refs.roleTree.setCheckedKeys(this.row.roleIds);
                this.checkedKeys = this.row.roleIds;
            },
            checkChange(value1, nodes) {
                this.checkedKeys = nodes.checkedKeys;
            },
            changePage(pageNum) {
                this.pageInfo.pageNum = pageNum;
                this.listUser();
            },
            changePageSize(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.listUser();
            },
            roleTree() {
                store.dispatch('RoleTree').then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.roleTrees = data.payload;
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
            listUser() {
                store.dispatch('ListUser', {
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
                    this.$Message.error({
                        content: err.data.msg,
                        duration: 5,
                        closable: true
                    });
                });
            },
            saveUserRole() {
                var userId = this.row.id;
                var roleIds = this.checkedKeys;
                store.dispatch('SetUserRole', {
                    userId: userId,
                    roleIds: roleIds
                }).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('角色分配成功');
                        this.listUser();
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
                    title: '删除用户',
                    content: '<p>点击确定1秒后将删除此用户</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch('DeleteUser', {id: id}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.listUser();
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
            changeRoleTreeModalVisible(visible) {
                if (visible) {
                    this.setCheckedKeys();
                }
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