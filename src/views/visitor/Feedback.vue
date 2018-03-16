<template>
    <div class="animated fadeIn">

        <h3 style="text-align:left;margin-top: 50px;">你有些什么问题或好的建议呢，欢迎您的提议!!!</h3>
        <hr style="margin-top:5px;margin-bottom:5px;height:1px;border:none;border-top:1px dashed rgba(255,165,0,0.2);"/>
        <Form ref="feedbackForm" :model="feedback" :label-width="80">
            <Row>
                <Col span="6" class="link-piece">
                <div class="echarts">
                    <ul>
                        <li style="margin: 10px;">
                            <Form-item prop="feedbackTypes" label="反馈类型">
                                <Select v-model="feedback.type" filterable clearable>
                                    <Option v-for="item in feedbackTypes" :value="item.name" :key="item.name">{{
                                        item.value }}
                                    </Option>
                                </Select>
                            </Form-item>
                        </li>
                        <li style="margin: 10px;">
                            <FormItem label="反馈内容">
                                <Input v-model="feedback.content" type="textarea"
                                       placeholder="请输入您要反馈的内容" :rows="6">
                                </Input>
                            </FormItem>
                        </li>
                        <li style="margin: 10px;">
                            <FormItem label="您的称呼">
                                <Input v-model="feedback.name" icon="at"
                                       placeholder="请阁下留下大名">
                                </Input>
                            </FormItem>
                        </li>
                        <li style="margin: 10px;">
                            <FormItem label="您的邮箱">
                                <Input v-model="feedback.email" icon="ios-email"
                                       placeholder="请阁下留下邮箱有助于接收反馈回复">
                                </Input>
                            </FormItem>
                        </li>
                        <li>
                            <div style="text-align: right;margin: 10px;">
                                <Button type="ghost" @click="commitFeedback">提交反馈</Button>
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
    import IntroChartCount from './../charts/IntroChartCount';
    import IntroChartPie from './../charts/IntroChartPie';
    import store from 'store/';

    export default {
        components: {IntroChartCount, IntroChartPie},
        name: 'dashboard',
        data() {
            return {
                feedback: {
                    id: '',
                    type: '',
                    content: '',
                    name: '',
                    email: ''
                },
                feedbackTypes: [
                    {name: 'demand', value: '需求'},
                    {name: 'ui', value: '界面设计'},
                    {name: 'content', value: '内容改进'},
                    {name: 'other', value: '其他'}
                ]
            }
        },
        methods: {
            commitFeedback() {
                store.dispatch('AddFeedback', this.feedback).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('反馈成功');
                        // window.close();
                    } else {
                        this.$Message.error('反馈提交失败');
                    }
                }).catch(err => {
                    this.$Message.error(err);
                });
            }
        },
        mounted() {
            const token = this.$store.getters.token;

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