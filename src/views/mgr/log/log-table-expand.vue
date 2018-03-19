<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }

</style>
<template>
    <div>
        <Row>
            <Col span="2">
            <div style="font-weight: 700">【数据】:</div>
            </Col>
            <Col span="21" style="padding-left: 18px;">
            {{row.data}}
            </Col>
        </Row>
        <Row>
            <Col span="2" >
            <div style="font-weight: 700">【URL】:</div>
            </Col>
            <Col span="21"  style="padding-left: 18px;">
            {{row.url}}
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
