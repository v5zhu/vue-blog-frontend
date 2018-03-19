<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }

</style>
<template>
    <div>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【时间表达式】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.cron}}
            </Col>
        </Row>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【类全名】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.beanClass}}
            </Col>
        </Row>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【创建时间】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.gmtCreate}}
            </Col>
        </Row>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【描述】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.description}}
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        data() {
            return {
                defaultExpand: 1
            }
        }
    };
</script>
