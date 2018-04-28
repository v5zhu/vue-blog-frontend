<template>
    <navbar>
        <ul class="nav navbar-nav" :class="{miniPaddingLeftClass:miniPaddingLeftClassIsActive==true}">
            <li class="nav-item" id="sidebar_minimize">
                <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
            </li>

        </ul>

        <ul class="nav navbar-nav">
            <li class="nav-item header-item" v-for="(route,index) in headers"
                :class="{headerItemActiveClass:index==isActive}"
                @click="changeHeaderStyle(index)"
                v-if="route.hidden==false">

                <router-link tag="div" :to='route.path' class="nav-link">
                    <p>
                        <!--<Icon :type="route.icon" size='25' color="#2d8cf0"></Icon>-->
                        <i :class="route.icon" style="color:#0d5477;font-weight: 700;"></i>
                    </p>
                    <p style="color:#0d5477;font-weight: 700;"> {{route.name}} </p>
                </router-link>
            </li>
        </ul>


        <ul class="nav navbar-nav ml-auto">

            <li class="nav-item">
                <a class="nav-link">
                    <Icon type="android-notifications" size="20"></Icon>
                    <span class="badge badge-pill badge-danger">5</span></a>
            </li>


            <Dropdown trigger="click" class="nav-item">
                <a href="javascript:void(0)" style="position: relative;">
                    <div slot="button">
                        <img src="/static/img/avatars/man-avatar.png" class="img-avatar" alt="o">
                        <div
                             style="max-width: 60px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
                            {{loginUser.nickname}}
                        </div>
                    </div>
                </a>
                <Dropdown-menu slot="list">
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="alert"></Icon>
                            Updates<span class="badge badge-info">42</span></p>


                    </Dropdown-item>
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="chatbox-working"></Icon>
                            Messages<span class="badge badge-success">42</span></p>

                    </Dropdown-item>
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="chatbox-working"></Icon>
                            Messages<span class="badge badge-danger">42</span></p>

                    </Dropdown-item>
                    <Dropdown-item divided>
                        <p class="dropdown-itemp">
                            <Icon type="android-contact"></Icon>
                            Profile
                        </p>

                    </Dropdown-item>
                    <Dropdown-item>
                        <p class="dropdown-itemp">
                            <Icon type="android-settings"></Icon>
                            Settings
                        </p>
                    </Dropdown-item>

                    <Dropdown-item><a href="" @click="Logout">
                        <p class="dropdown-itemp">
                            <Icon type="power"></Icon>
                            Logout
                        </p>
                    </a></Dropdown-item>

                </Dropdown-menu>
            </Dropdown>


            <li class="nav-item">
                <a class="nav-link navbar-toggler aside-menu-toggler" @click="asideToggle">&#9776;</a>
            </li>
        </ul>
    </navbar>
</template>
<script>

    import navbar from './Navbar'
    import store from 'store/';
    import LocalStorage from "utils/LocalStorage";

    export default {
        name: 'header',
        components: {
            navbar,
        },
        data() {
            return {
                loginUser: null,
                headers: [],
                isActive: -1,
                miniPaddingLeftClass: 'miniPaddingLeftClass',
                miniPaddingLeftClassIsActive: true,
            }
        },
        created() {
            this.listRoute('backheader');
            this.loginUser = LocalStorage.getItem("LOGIN-USER");
        },
        methods: {
            listRoute(type) {
                store.dispatch('ListBackHeaderRoute', {
                    type: type
                }).then(res => {
                    this.headers = res.data.payload;
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
                });
            },
            Logout(e) {
                e.preventDefault();
                this.$store.dispatch('LogOut').then(res => {
                    this.$router.push({path: '/admin/login'});
                }).catch(err => {
                    this.$Message.error({
                        content: err.data.error,
                        duration: 5,
                        closable: true
                    });
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
                e.preventDefault();
                this.miniPaddingLeftClassIsActive=!this.miniPaddingLeftClassIsActive;
                document.body.classList.toggle('sidebar-minimized')
            },
            mobileSidebarToggle(e) {
                e.preventDefault()

                document.body.classList.toggle('sidebar-mobile-show')
            },
            asideToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('aside-menu-hidden')
            },
            changeHeaderStyle(index) {
                this.isActive = index;

            }
        }
    }
</script>

<style type="text/css" scoped>
    .miniPaddingLeftClass {
        margin-left: 150px;
    }

    .dropdown-itemp {
        text-align: left;
        font-size: 15px;
        padding: 10px;
    }

    .header-item .ivu-dropdown-item {
        padding: 15px;
    }

    .header-item:hover {
        border-radius: 2px;
        border-bottom: 5px solid orange;
        box-shadow: 0px 0px 20px 0px #ff00002e;
    }

    .header-item {
        width: 100px;
    }

    .headerItemActiveClass {
        border-radius: 2px;
        border-bottom: 5px solid orange;
        box-shadow: 0px 0px 20px 0px #ff00002e;
    }

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        border-bottom: 5px solid #20a0ff;
    }
</style>
