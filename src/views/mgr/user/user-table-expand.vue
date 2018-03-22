<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }

</style>
<template>
    <div>
        <Row>
            <Col span="3">
            <div style="font-weight: 700">【token】:</div>
            </Col>
            <Col span="20" style="padding-left: 18px;">
            {{row.token}}
            </Col>
        </Row>
        <Row>
            <Col span="3">
            <div style="font-weight: 700">【邮箱】:</div>
            </Col>
            <Col span="20" style="padding-left: 18px;">
            {{row.email}}
            </Col>
        </Row>
        <Row>
            <Col span="3">
            <div style="font-weight: 700">【主页】:</div>
            </Col>
            <Col span="20" style="padding-left: 18px;">
            {{row.homeUrl}}
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
