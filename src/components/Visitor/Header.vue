<template>
    <div id="top">
        <transition name="fade">
            <navbar v-show="scrollShow || moveShow" transiton="fade">

                <ul class="nav navbar-nav d-md-down-none">

                    <li class="nav-item header-item">

                        <router-link tag="div" to='/articles' class="nav-link">
                            <p>
                                <Icon type="ios-book-outline" size='28' class="color-0d5477"></Icon>
                            </p>
                            <p class="color-0d5477"> 首页 </p>
                        </router-link>
                    </li>

                    <li class="nav-item header-item">

                        <router-link tag="div" to='/archives' class="nav-link">
                            <p>
                                <Icon type="map" size='28' class="color-0d5477"></Icon>
                            </p>
                            <p class="color-0d5477"> 归档 </p>
                        </router-link>
                    </li>
                    <li class="nav-item header-item">

                        <router-link tag="div" to='/links' class="nav-link">
                            <p>
                                <Icon type="social-github" size='28' class="color-0d5477"></Icon>
                            </p>
                            <p class="color-0d5477"> 友链 </p>
                        </router-link>

                    </li>
                    <li class="nav-item header-item">

                        <router-link tag="div" to='#' class="nav-link">
                            <p>
                                <Icon type="trophy" size='28' class="color-0d5477"></Icon>
                            </p>
                            <p style="color:#8c8c8c"> 赞赏榜(建设中...) </p>
                        </router-link>

                    </li>
                    <li class="nav-item header-item">

                        <router-link tag="div" to='/feedback' class="nav-link">
                            <p>
                                <Icon type="ios-chatboxes-outline" size='28' class="color-0d5477"></Icon>
                            </p>
                            <p class="color-0d5477"> 意见反馈 </p>
                        </router-link>

                    </li>

                    <li class="nav-item header-item reg-login" style="position: absolute;right:140px;width: 70px;">
                        <p>
                            <Icon type="paper-airplane" size='14' class="color-0d5477"></Icon>
                        </p>
                        <p class="color-0d5477"> 立即登录 </p>
                    </li>


                    <li class="nav-item header-item reg-login" style="position: absolute;right:50px;width: 70px;">
                        <p>
                            <Icon type="ios-pulse-strong" size='14' class="color-0d5477"></Icon>
                        </p>
                        <p class="color-0d5477"> 免费注册 </p>
                    </li>


                    <li class="nav-item d-md-down-none" style="position: absolute;right:0;top:26px;">
                        <a class="nav-link navbar-toggler aside-menu-toggler" style="color: #0d5477"
                           @click="asideToggle">&#9776;
                        </a>
                    </li>

                </ul>
            </navbar>
        </transition>
    </div>
</template>
<script>

    import navbar from './Navbar'

    export default {
        name: 'header',
        props: ['scrollShow', 'moveShow'],
        components: {
            navbar,
        },
        methods: {
            Logout(e) {
                e.preventDefault();
                this.$store.dispatch('LogOut').then(res => {
                    if (res.data.success == true) {
                        this.$router.push({path: '/admin/login'});
                    } else {
                        this.$Message.error('退出失败,请联系管理员');
                    }
                }).catch(err => {
                    this.$message.error(err);
                });
            },
            click() {
                // do nothing
            },
            sidebarToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-hidden')
            },
            sidebarMinimize(e) {
                e.preventDefault()

                document.body.classList.toggle('sidebar-minimized')
            },
            mobileSidebarToggle(e) {
                e.preventDefault()

                document.body.classList.toggle('sidebar-mobile-show')
            },
            asideToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('aside-menu-hidden')
            }
        }
    }
</script>

<style type="text/css" scoped>

    .dropdown-itemp {
        text-align: left;
        font-size: 15px;
        padding: 10px;
    }

    .header-item .color-0d5477 {
        color: #0d5477;
    }

    .header-item:not(.reg-login):hover {
        border-radius: 2px;
        border-bottom: 5px solid orange;
        box-shadow: 0px 0px 20px 0px #ff00002e;
    }

    .header-item {
        width: 100px;
    }

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        cursor: pointer;
        /*border-bottom: 2px solid #9affab;*/
    }
</style>
