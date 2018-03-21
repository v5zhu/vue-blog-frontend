<template>
    <div>
        <Tree :data="RolePermissions" show-checkbox></Tree>
    </div>
</template>

<script>
    import store from 'store/';
    import {formatTime} from 'utils/index';

    export default {
        props: {
            row: Object,
            RolePermissions: Array
        },
        components: {},
        name: 'role-permission-true',
        data() {
            return {
            }
        },
        mounted() {

        },
        methods: {},
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