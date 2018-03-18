<style scoped>
    .time {
        font-size: 14px;
        font-weight: bold;
    }

    .content {
        padding-left: 5px;
    }

    .milestone-loop {
        animation: loop 2s infinite;
    }

    @keyframes loop {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
<template>
    <div style="margin-left: 50px;margin-top: 60px;">
        <Timeline>
            <div v-for="m in pageInfo.list">
                <TimelineItem>
                    <Icon v-if="m.status==1" type="ios-flag-outline" size="18" slot="dot"></Icon>
                    <Icon v-else-if="m.status==0" type="ios-loop" class="milestone-loop" size="18" slot="dot"></Icon>
                    <Icon v-else-if="m.status==-1" type="ios-pause-outline" size="18" slot="dot"></Icon>
                    <p class="content">时间：{{m.startTime|formatDate}}-{{m.endTime|formatDate}}</p>
                    <p class="content">历程：{{m.name}}</p>
                    <p class="content">描述：{{m.description}}</p>
                </TimelineItem>
            </div>
        </Timeline>
    </div>
</template>
<script>
    import store from 'store/';
    import {formatTime} from 'utils/index';

    export default {
        data() {
            return {
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    list: ''
                }
            }
        },
        created() {
            this.milestoneList();
        },
        methods: {
            milestoneList() {
                store.dispatch('MilestoneList', {
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize
                }).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.pageInfo = data.payload;
                        this.$Message.success('加载成功');
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
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d}');
            }
        }
    }
</script>