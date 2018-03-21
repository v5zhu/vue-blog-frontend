<template>
    <div>


    </div>
</template>

<script>
    import {formatTime} from 'utils/index';
    import store from 'store/';

    export default {
        props: {
            row: Object,
            RolePermissions: Array
        },
        components: {},
        name: 'role-permission-true',
        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                checkedKeys: []
            }
        },
        mounted() {
            this.setCheckedKeys();
        },
        methods: {
            setCheckedKeys() {
                console.log(this.row)
                this.$refs.permissionTree.setCheckedKeys(this.row.permissions);
                this.checkedKeys = this.row.permissions;
            },
            checkChange(value1, nodes) {
                this.checkedKeys = nodes.checkedKeys;
            },
            saveRolePermission() {
                var roleId = this.row.id;
                var idTypes = this.checkedKeys;
                store.dispatch('SettingRolePermission', {
                    roleId: roleId,
                    idTypes: idTypes
                }).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.$Message.success('权限配置成功');
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