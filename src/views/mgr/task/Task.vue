<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
        <Button type="primary" size="default" @click="openNewModal()">记录历程</Button>
        <Modal v-model="taskModal" width="600" :maskClosable="false"
               @on-visible-change="changeModalVisible">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-clock-outline" size="20"></Icon>
                <span style="font-size:14px;">添加任务</span>
            </p>
            <Form ref="taskForm" :model="task" :label-width="80">
                <Row>
                    <Col span="20" class="link-piece">
                    <ul>
                        <li style="margin: 10px;">
                            <Form-item prop="springId" label="Bean">
                                <Select v-model="task.springId" filterable clearable>
                                    <Option v-for="item in beanList" :value="item" :key="item">{{
                                        item }}
                                    </Option>
                                </Select>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="name" label="类全名">
                                <Input v-model="task.beanClass" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="status" label="方法">
                                <Select v-model="task.methodName" style="width:200px">
                                    <Option v-for="item in beanMethodList" :value="item" :key="item">
                                        {{item}}
                                    </Option>
                                </Select>
                            </Form-item>
                        </li>

                        <li style="margin: 10px;">
                            <Form-item prop="name" label="任务名称">
                                <Input v-model="task.jobName" type="text">
                                </Input>
                            </Form-item>
                        </li>

                        <li style="margin: 10px;">
                            <Form-item prop="name" label="任务分组">
                                <Input v-model="task.jobGroup" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="name" label="cron表达式">
                                <Input v-model="task.cronExpression" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="description" label="描述信息">
                                <Input v-model="task.description" type="textarea" :rows="4">
                                </Input>
                            </Form-item>
                        </li>
                        <li>
                            <div style="text-align: right;margin: 10px;">
                                <Button type="ghost" @click="clearAll('taskForm')">
                                    <Icon type="ios-checkmark" size="14"></Icon>
                                    清除
                                </Button>
                                <Button type="ghost" @click="saveTask">
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
    import expandRow from './../task/task-table-expand.vue';

    export default {
        components: {expandRow},
        name: 'task',
        data() {
            return {
                task: {
                    id: '',
                    jobName: '',
                    jobGroup: '',
                    jobStatus: '',
                    cronExpression: '',
                    description: '',
                    beanClass: '',
                    springId: '',
                    methodName: '',
                    gmtCreate: '',
                    gmtModified: ''
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    list: [],
                    total: 0
                },
                pageSizeOpts: [5, 10, 20, 50, 100],
                list_loadding: false,
                taskModal: false,
                beanList: [],
                beanMethodList: [],
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
                        key: 'jobName',
                        ellipsis: 'true',
                        width: 100
                    },
                    {
                        title: '分组',
                        key: 'jobGroup',
                        width: 150,
                        ellipsis: true
                    },
                    {
                        title: '状态',
                        key: 'jobStatus',
                        ellipsis: 'true',
                        width: 60,
                    },
                    {
                        title: 'Bean',
                        key: 'springId',
                        ellipsis: 'true',
                        width: 100,
                    },
                    {
                        title: '类全名',
                        key: 'beanClass',
                        ellipsis: 'true'
                    },
                    {
                        title: '方法',
                        key: 'methodName',
                        ellipsis: 'true',
                        width: 100,
                    },
                    {
                        title: '操作',
                        width: '200',
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
            this.listTask();
            this.listBeans();
        },
        methods: {
            openNewModal() {
                this.clearAll('taskForm');
                this.taskModal = true;
            },
            changePage() {

            },
            changePageSize() {

            },
            clearAll(refName) {
                this.$refs[refName].resetFields();

            },
            listBeans() {
                store.dispatch('ListComponentsName').then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.beanList = data.payload;
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
            beanFullName(beanName) {
                store.dispatch('GetClassFullName', {beanName: beanName}).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.task.beanClass = data.payload;
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
            beanMethodsList(beanName) {
                store.dispatch('ListClassMethodName', {beanName: beanName}).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.task.methodName = data.payload;
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
            listTask() {
                store.dispatch('ListTask', {
                    name: '',
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
            saveTask() {
                store.dispatch('AddTask', this.task).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.listTask();
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
                    title: '删除任务',
                    content: '<p>点击确定1秒后将删除此任务</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch('DeleteTask', {id: id}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.listTask();
                                } else {
                                    this.$Message.error('删除失败');
                                }
                            }).catch(err => {
                                console.log("删除任务请求失败");
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