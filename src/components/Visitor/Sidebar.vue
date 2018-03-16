<template>
    <div class="sidebar-visitor">
        <nav class="sidebar-nav-visitor">
            <div style="min-height:80px;min-width:50px;position: fixed;left:20px;bottom:20px;">
                <ul>
                    <li style="margin-bottom: 20px;position: relative">
                        <Button type="ghost" class="left-circle" @click="scrollToTop"
                                style="border-radius: 50%;">
                            <Icon class="left-icon-class" type="ios-arrow-up" color="#0d5477" size="24"></Icon>
                        </Button>
                    </li>
                    <li style="margin-bottom: 20px;position: relative">
                        <Button type="ghost" class="left-circle" @click="scrollBottom"
                                style="border-radius: 50%;">
                            <Icon class="left-icon-class" type="ios-arrow-down" color="#0d5477" size="24"></Icon>
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>

    import {scrollTo} from "../../utils/scroll";

    export default {
        name: 'sidebar',
        data() {
            return {
                timer: null,
                showReturnToTop: true,
                documentHeight: ''
            }
        },
        components: {},
        computed: {},
        mounted() {

        },
        created() {
            window.addEventListener('scroll', this.currentPageYOffset);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.currentPageYOffset)
        },
        methods: {
            currentPageYOffset() {
                // 判断滚动区域大于多少的时候显示返回顶部的按钮
                window.pageYOffset > this.pageY ? this.showReturnToTop = true : this.showReturnToTop = false;
            },
            scrollToTop() {
                var height = $(document).height() - $(window).height();//全程要滚动的高度
                var t = height / 2;
                scrollTo(0, t, this.transitionName, this.currentPageYOffset);
            },
            scrollBottom() {
                var height = $(document).height() - $(window).height();//全程要滚动的高度
                var t = height / 2;
                scrollTo(height, t, this.transitionName, this.currentPageYOffset);
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
