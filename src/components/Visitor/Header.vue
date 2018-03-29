<template>
    <div id="top">
        <transition name="fade">
            <navbar v-show="scrollShow || moveShow" transiton="fade">

                <ul class="nav navbar-nav d-md-down-none">
                    <li class="nav-item header-item" v-for="(route,index) in pageInfo.list"
                        :class="{headerItemActiveClass:index==isActive}"
                        @click="changeHeaderStyle(index)"
                        v-if="route.hidden===0">

                        <router-link tag="div" :to='route.path' class="nav-link">
                            <p>
                                <i :class="route.icon" style="color:#0d5477;font-weight: 700;"></i>
                            </p>
                            <p style="color:#0d5477;font-weight: 700;"> {{route.name}} </p>
                        </router-link>
                    </li>


                    <!--<li class="nav-item header-item">

                        <router-link tag="div" to='#' class="nav-link">
                            <p>
                                <Icon type="trophy" size='28' class="color-0d5477"></Icon>
                            </p>
                            <p style="color:#8c8c8c"> 赞赏榜(建设中...) </p>
                        </router-link>

                    </li>-->

                    <li style="margin-left: 100px;">
                        <Input v-model="q" :class="qfocus?'q-long':'q-short'" icon="ios-search" placeholder="关键字搜索..."
                               @on-focus="searchFocus" @on-blur="searchBlur" size="large">
                        </Input>
                    </li>

                    <li v-if="loginUser.token==undefined" @click="showLoginModalFunction"
                        class="nav-item header-item reg-login"
                        style="position: absolute;right:140px;width: 70px;">
                        <p>
                            <Icon type="log-in" size='28' class="color-0d5477"></Icon>
                        </p>
                        <p class="color-0d5477"> 立即登录 </p>
                    </li>


                    <li v-if="loginUser.token==undefined" @click="showRegModalFunction"
                        class="nav-item header-item reg-login"
                        style="position: absolute;right:50px;width: 70px;">
                        <p>
                            <Icon type="ios-pulse" size='28' class="color-0d5477"></Icon>
                        </p>
                        <p class="color-0d5477"> 免费注册 </p>
                    </li>


                    <li v-if="loginUser.token!=undefined" class="nav-item d-md-down-none"
                        style="position: absolute;right:0;top:26px;">
                        <a class="nav-link navbar-toggler aside-menu-toggler" style="color: #0d5477"
                           @click="asideToggle">&#9776;
                        </a>
                    </li>


                    <li v-if="loginUser.token!=undefined" class="nav-item d-md-down-none"
                        style="position: absolute;right:140px;top:12px;">
                        <a class="nav-link">
                            <Icon type="android-notifications" size="20"></Icon>
                            <span class="badge badge-pill badge-danger">5</span></a>
                    </li>
                    <Dropdown v-if="loginUser.token!=undefined" class="nav-item"
                              style="position: absolute;right:85px;top:12px;">

                        <a href="javascript:void(0)" style="position: relative;">
                            <div slot="button">
                                <img src="/static/img/avatars/man-avatar.png" class="img-avatar" alt="o">
                            </div>
                            <div :title="loginUser.nickname"
                                 style="position: relative;left:55px;bottom:20px;max-width: 80px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
                                 class="d-md-down-none">
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
                                <a href="" @click="gotoHomepage">
                                    <p class="dropdown-itemp">
                                        <Icon type="android-contact"></Icon>
                                        个人主页
                                    </p>
                                </a>
                            </Dropdown-item>
                            <Dropdown-item>
                                <a href="/admin/mgr/setting" target="_blank">
                                    <p class="dropdown-itemp">
                                        <Icon type="android-settings"></Icon>
                                        设置中心
                                    </p>
                                </a>
                            </Dropdown-item>

                            <Dropdown-item>
                                <a href="" @click="Logout">
                                    <p class="dropdown-itemp">
                                        <Icon type="power"></Icon>
                                        退出登录
                                    </p>
                                </a>
                            </Dropdown-item>

                        </Dropdown-menu>
                    </Dropdown>


                </ul>
            </navbar>
        </transition>
    </div>
</template>
<script>

    import navbar from './Navbar';
    import RegModalBody from './RegModalBody';
    import LoginModalBody from './LoginModalBody';
    import store from 'store/';
    import Cookies from 'js-cookie';

    export default {
        name: 'header',
        props: ['scrollShow', 'moveShow', 'loginUser'],
        data() {
            return {
                q: '',
                qfocus: false,
                pageInfo: {
                    pageNum: 1,
                    pageSize: 20,
                    list: [],
                    total: 0
                },
                isActive: -1,
            }
        },
        components: {
            navbar, RegModalBody, LoginModalBody
        },
        created() {
            this.listFrontRoute('frontheader');
        },
        methods: {
            changeHeaderStyle(index) {
                this.isActive = index;

            },
            listFrontRoute(type) {
                store.dispatch('ListFrontRoute', {
                    type: type,
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize
                }).then(res => {
                    var data = res.data;
                    if (data.success == true) {
                        this.pageInfo = data.payload;
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
            },
            searchFocus(e) {
                this.qfocus = true;
            },
            searchBlur() {
                this.qfocus = false;
            },
            changeModalVisible() {

            },
            gotoHomepage(e) {
                e.preventDefault();
                window.open("/admin/dashboard");
            },
            Logout(e) {
                e.preventDefault();
                store.dispatch('LogOut', {token: null}).then(res => {
                    if (res.data.success == true) {
                        Cookies.remove('USER-INFO');
                        window.location.reload();
                    } else {
                        this.$Message.error('退出失败,请联系管理员');
                    }
                }).catch(err => {
                    this.$Message.error(err);
                });
            },
            showRegModalFunction() {
                this.$emit('showRegModalFunction');
            },
            showLoginModalFunction() {
                this.$emit('showLoginModalFunction');
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
    .headerItemActiveClass {
        border-radius: 2px;
        border-bottom: 5px solid orange;
        box-shadow: 0px 0px 20px 0px #ff00002e;
    }

    .q-short {
        width: 200px;
        animation: longToShort 1s 1;
    }

    .q-long {
        width: 400px;
        /*border: orange;*/
        /*box-shadow: 2px 2px 10px 2px orange;*/
        animation: shortToLong 1s 1;
    }

    @keyframes shortToLong {
        from {
            width: 200px;
        }
        to {
            width: 400px;
            /*border: orange;*/
            /*box-shadow: 2px 2px 10px 2px orange;*/
        }
    }

    @keyframes longToShort {
        from {
            width: 400px;
        }
        to {
            width: 200px;
        }
    }

    .header-item .color-0d5477 {
        color: #0d5477;
    }

    .header-item:hover {
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
