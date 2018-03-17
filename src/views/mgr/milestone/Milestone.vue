<template>
    <div class="animated fadeIn">
        <Form ref="milestoneForm" :model="milestone" :label-width="80">
            <Row>
                <Col span="6" class="link-piece">
                <div class="echarts">
                    <ul>

                        <li style="margin: 10px;">
                            <Form-item prop="time" label="时间点">
                                <DatePicker v-model="milestone.time" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px">
                                </DatePicker>

                            </Form-item>

                        </li>
                        <li style="margin: 10px;">
                            <Form-item prop="status" label="完成状态">
                                 <Select v-model="milestone.status" style="width:200px">

                                        <Option value="-1" label="未开始">
                                            <span>未开始</span>
                                            <span style="float:right;color:#ccc">任务还未开始</span>
                                        </Option>
                                        <Option value="0" label="进行中">
                                            <span>进行中</span>
                                            <span style="float:right;color:#ccc">任务正进行中</span>
                                        </Option>
                                        <Option value="1" label="已完成">
                                            <span>已完成</span>
                                            <span style="float:right;color:#ccc">任务已经完成</span>
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
                </div>
                </Col>
            </Row>
        </Form>
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
                    name: '',
                    description: '',
                    status: '',
                    startTime:'',
                    endTime:'',
                    time: ''
                }
            }
        },
        mounted() {
        },
        methods: {
            record() {
                if(this.milestone.time){
                this.milestone.startTime=this.milestone.time[0];
                this.milestone.endTime=this.milestone.time[1];
                store.dispatch('RecordMilestone', this.milestone).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('保存成功');
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
            },
            clearAll(refName){
                this.$refs[refName].resetFields();

            }
        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}');
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