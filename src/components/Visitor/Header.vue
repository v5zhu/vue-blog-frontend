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

                    <li v-show="loginUser.token==undefined" @click="showLoginModalFunction"
                        class="nav-item header-item reg-login"
                        style="position: absolute;right:140px;width: 70px;">
                        <p>
                            <Icon type="paper-airplane" size='14' class="color-0d5477"></Icon>
                        </p>
                        <p class="color-0d5477"> 立即登录 </p>
                    </li>


                    <li v-show="loginUser.token==undefined" @click="showRegModalFunction"
                        class="nav-item header-item reg-login"
                        style="position: absolute;right:50px;width: 70px;">
                        <p>
                            <Icon type="ios-pulse-strong" size='14' class="color-0d5477"></Icon>
                        </p>
                        <p class="color-0d5477"> 免费注册 </p>
                    </li>


                    <li v-show="loginUser.token!=undefined" class="nav-item d-md-down-none"
                        style="position: absolute;right:0;top:26px;">
                        <a class="nav-link navbar-toggler aside-menu-toggler" style="color: #0d5477"
                           @click="asideToggle">&#9776;
                        </a>
                    </li>


                    <li v-show="loginUser.token!=undefined" class="nav-item d-md-down-none"
                        style="position: absolute;right:120px;top:12px;">
                        <a class="nav-link">
                            <Icon type="android-notifications" size="20"></Icon>
                            <span class="badge badge-pill badge-danger">5</span></a>
                    </li>
                    <Dropdown v-show="loginUser.token!=undefined" class="nav-item"
                              style="position: absolute;right:80px;top:12px;">

                        <a href="javascript:void(0)" style="position: relative;">
                           <span slot="button">
                                <img src="/static/img/avatars/man-avatar.png" class="img-avatar" alt="o">
                          </span>
                            <div style="position: relative;left:40px;bottom:20px;" class="d-md-down-none">
                                {{loginUser.nickname}}
                            </div>
                        </a>
                        <Dropdown-menu slot="list">

                            <Dropdown-item>
                                <p class="dropdown-itemp">
                                    <Icon type="chatbox-working"></Icon>
                                    未读消息<span class="badge badge-danger">42</span></p>

                            </Dropdown-item>
                            <Dropdown-item divided>
                                <p class="dropdown-itemp">
                                    <Icon type="android-contact"></Icon>
                                    个人主页
                                </p>

                            </Dropdown-item>
                            <Dropdown-item>
                                <p class="dropdown-itemp">
                                    <Icon type="android-settings"></Icon>
                                    设置中心
                                </p>
                            </Dropdown-item>

                            <Dropdown-item><a href="" @click="Logout">
                                <p class="dropdown-itemp">
                                    <Icon type="power"></Icon>
                                    退出登录
                                </p>
                            </a></Dropdown-item>

                        </Dropdown-menu>
                    </Dropdown>

                    <Modal v-model="showLoginModal" width="600" :maskClosable="false"
                           @on-visible-change="changeModalVisible">
                        <login-modal-body></login-modal-body>

                    </Modal>

                    <Modal v-model="showRegModal" width="600" :maskClosable="false"
                           @on-visible-change="changeModalVisible">
                        <!-- <p slot="header" style="color:#f60;text-align:left">
                             <Icon type="ios-pulse-strong" size="20"></Icon>
                             <span style="font-size:14px;">注册</span>
                         </p>-->

                        <reg-modal-body style="min-height: 300px;"></reg-modal-body>

                        <div slot="footer" style="text-align: center">
                        </div>
                    </Modal>
                </ul>
            </navbar>
        </transition>
    </div>
</template>
<script>

    import navbar from './Navbar';
    import RegModalBody from './RegModalBody';
    import LoginModalBody from './LoginModalBody';

    export default {
        name: 'header',
        props: ['scrollShow', 'moveShow', 'loginUser'],
        data() {
            return {
                showRegModal: false,
                showLoginModal: false
            }
        },
        components: {
            navbar, RegModalBody, LoginModalBody
        },
        created() {
        },
        methods: {
            changeModalVisible() {

            },
            Logout(e) {
                e.preventDefault();
                this.$store.dispatch('LogOut').then(res => {
                    if (res.data.success == true) {
                        this.$router.push({path: '/admin/login'});
                    } else {
                        this.$Message.error('退出失败,请联系管理员');
                    }
                }).catch(err => {
                    this.$Message.error(err);
                });
            },
            showRegModalFunction() {
                this.showLoginModal = false;
                this.showRegModal = true;
            },
            showLoginModalFunction() {
                this.showRegModal = false;
                this.showLoginModal = true;
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
