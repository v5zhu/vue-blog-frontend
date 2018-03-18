<template>
    <div class="animated fadeIn" style="margin-left: 20px;">
        <Button type="primary" size="default" @click="openNewModal()">记录历程</Button>
        <Modal v-model="milestoneModal" width="600" :maskClosable="false"
               @on-visible-change="changeModalVisible">
            <p slot="header" style="color:#f60;text-align:left">
                <Icon type="ios-clock-outline" size="20"></Icon>
                <span style="font-size:14px;">记录历程</span>
            </p>
            <Form ref="milestoneForm" :model="milestone" :label-width="80">
                <Row>
                    <Col span="20" class="link-piece">
                    <ul>

                        <li style="margin: 10px;">
                            <Form-item prop="time" label="时间点">
                                <!--<DatePicker v-model="milestone.time" format="yyyy-MM-dd" type="daterange"-->
                                <!--placement="bottom-end" placeholder="Select date" style="width: 200px">-->
                                <!--</DatePicker>-->
                                <el-date-picker
                                        v-model="milestone.time"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>

                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="status" label="完成状态">
                                <Select v-model="milestone.status" style="width:200px">
                                    <Option v-for="item in statusEnums" :value="item.value" :key="item.value">
                                        {{item.label}}
                                    </Option>
                                </Select>
                            </Form-item>
                        </li>

                        <li style="margin: 10px;">
                            <Form-item prop="name" label="显示名称">
                                <Input v-model="milestone.name" type="text">
                                </Input>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="description" label="描述信息">
                                <Input v-model="milestone.description" type="textarea" :rows="4">
                                </Input>
                            </Form-item>
                        </li>
                        <li>
                            <div style="text-align: right;margin: 10px;">
                                <Button type="ghost" @click="clearAll('milestoneForm')">
                                    <Icon type="ios-checkmark" size="14"></Icon>
                                    清除
                                </Button>
                                <Button type="ghost" @click="record">
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
    import Cookies from 'js-cookie';
    import {formatTime} from 'utils/index';

    export default {
        components: {},
        name: 'dashboard',
        data() {
            return {
                milestone: {
                    id: undefined,
                    name: '',
                    description: '',
                    status: '',
                    startTime: '',
                    endTime: '',
                    time: []
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    list: [],
                    total: 0
                },
                pageSizeOpts: [5, 10, 20, 50, 100],
                milestoneModal: false,
                list_loadding: false,
                statusEnums: [
                    {value: -1, label: '未开始'},
                    {value: 0, label: '进行中'},
                    {value: 1, label: '已完成'}
                ],
                tableDataList: [
                    {
                        title: '名称',
                        key: 'name',
                        ellipsis: 'true',
                        width: 200
                    },
                    {
                        title: '状态',
                        ellipsis: 'true',
                        width: 100,
                        filters: [
                            {
                                label: '未开始',
                                value: '-1'
                            }, {
                                label: '进行中',
                                value: '0'
                            }, {
                                label: '已完成',
                                value: '1'
                            }
                        ],
                        filterMultiple: false,
                        filterMethod(value, row) {
                            return row.status == value;
                        },

                        render: (h, params) => {
                            const task_status = params.row.status;
                            if (task_status === -1) {
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "yellow"
                                        },
                                    }, "未开始"),
                                ]);
                            }
                            else if (task_status === 0) {
                                return h('div', [

                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "red"
                                        }
                                    }, "进行中"),
                                ]);
                            } else if (task_status === 1) {
                                return h('div', [

                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "blue"
                                        }
                                    }, "已完成"),
                                ]);
                            }
                        }
                    },
                    {
                        title: '起始',
                        width: 120,
                        key: 'start_time',
                        ellipsis: 'true',
                        render: (h, params) => {
                            const time = params.row.startTime;
                            var datetime = formatTime(time, '{y}-{m}-{d}');
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
                        title: '截止',
                        width: 120,
                        key: 'end_time',
                        ellipsis: 'true',
                        render: (h, params) => {
                            const time = params.row.endTime;
                            var datetime = formatTime(time, '{y}-{m}-{d}');
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
                        title: '描述',
                        key: 'description',
                        ellipsis: 'true'
                    },
                    {
                        title: '操作',
                        width: '200',
                        key: 'action',
                        align: 'center',
                        ellipsis: 'true',

                        render: (h, params) => {
                            const task_status = params.row.status;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        loading: false,
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row);
                                        }
                                    }
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
            this.milestoneList();
        },
        methods: {
            changePage() {

            },
            changePageSize() {

            },
            milestoneList() {
                store.dispatch('MilestoneList', {
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
            openNewModal() {
                this.clearAll('milestoneForm');
                this.milestoneModal = true;
            },
            edit(row) {
                this.milestone = row;
                this.milestone.time = new Array(this.formatDate(this.milestone.startTime), this.formatDate(this.milestone.endTime));
                this.milestoneModal = true;
            },
            remove(id) {
                this.$Modal.confirm({
                    title: '删除历程',
                    content: '<p>点击确定1秒后将删除此历程</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            store.dispatch('DeleteMilestone', {id: id}).then(res => { // 拉取user_info
                                var resp = res.data;
                                if (resp.success == true) {
                                    this.$Message.success('删除成功');
                                    this.milestoneList();
                                } else {
                                    this.$Message.error('删除失败');
                                }
                            }).catch(err => {
                                console.log("删除历程请求失败");
                            })
                            this.$Modal.remove();
                        }, 1000);
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            record() {
                if (!this.milestone.id) {
                    if (this.milestone.time) {
                        this.milestone.startTime = this.milestone.time[0];
                        this.milestone.endTime = this.milestone.time[1];
                        store.dispatch('RecordMilestone', this.milestone).then(res => {
                            var data = res.data;
                            if (data.success == true) {
                                this.$Message.success('保存成功');
                                this.milestoneList();
                            } else {
                                this.$Message.error('保存失败');
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
                } else {
                    if (this.milestone.time) {
                        this.milestone.startTime = this.milestone.time[0];
                        this.milestone.endTime = this.milestone.time[1];
                        store.dispatch('ModifyMilestone', this.milestone).then(res => {
                            var data = res.data;
                            if (data.success == true) {
                                this.$Message.success('保存成功');
                                this.milestoneList();
                            } else {
                                this.$Message.error('保存失败');
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
                }
            },
            clearAll(refName) {
                this.$refs[refName].resetFields();

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