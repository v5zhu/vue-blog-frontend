<template>
    <div class="sidebar-visitor">
        <nav class="sidebar-nav-visitor">
            <div style="min-height:150px;min-width:50px;position: fixed;left:20px;bottom:50px;">
                <ul>
                    <li style="margin-bottom: 20px;position: relative">
                        <Button type="ghost" class="left-circle" @click="scrollTop('#top')"
                                style="border-radius: 50%;">
                            <Icon class="left-icon-class" type="arrow-up-b" color="#FF6666" size="24"></Icon>
                        </Button>
                    </li>
                    <li style="margin-bottom: 20px;position: relative">
                        <Button type="ghost" class="left-circle" @click="scrollBottom('#bottom')"
                                style="border-radius: 50%;">
                            <Icon class="left-icon-class" type="arrow-down-b" color="#FF6666" size="24"></Icon>
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>

    export default {
        name: 'sidebar',
        data() {
            return {}
        },
        components: {},
        computed: {},
        methods: {
            scrollTop(el) {
                var anchor = this.$el.querySelector(el)
                document.body.scrollTop = anchor.offsetTop
            },
            scrollBottom(el) {

            }
        }
    }
</script>

<style lang="css">
    .left-circle {
        height: 45px;
        width: 45px;
        position: relative;
        font-size: 12px;
        box-shadow: 0px 0px 20px 3px #ffa5002b;
        border-color: white;

    }

    .sidebar-visitor {
        position: fixed;
        width: 220px;
        height: 100%;
        transition: margin-left .25s, margin-right .25s, width .25s, flex .25s;
        padding: 0;
        overflow: hidden;
        color: #fff;
        /*background: #0d5477*/
    }

    .sidebar-visitor .sidebar-nav-visitor {
        width: 220px !important;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        -ms-overflow-style: -ms-autohiding-scrollbar;
        width: 200px
    }

</style>
