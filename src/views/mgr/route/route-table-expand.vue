<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }

</style>
<template>
    <div>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【路径】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.path}}
            </Col>
        </Row>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【重定向路径】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.redirect}}
            </Col>
        </Row>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【组件】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.component}}
            </Col>
        </Row>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【父组件】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.parent.component}}
            </Col>
        </Row>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【图标】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.icon}}=><Icon type="row.icon"></Icon>
            </Col>
        </Row>
    </div>
</template>
<script>
    import {formatTime} from 'utils/index';

    export default {
        props: {
            row: Object
        },
        data() {
            return {
                defaultExpand: 1
            }
        },
        filters: {
            formatDate(time) {
                return formatTime(time, '{y}-{m}-{d} {h}:{i}:{s}', false);
            }
        }
    };
</script>
