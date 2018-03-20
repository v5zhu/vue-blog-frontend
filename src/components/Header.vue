<template>
    <navbar>
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
            &#9776;
        </button>
        <a class="navbar-brand" href="/articles" target="_blank"></a>

        <ul class="nav navbar-nav d-md-down-none">
            <li class="nav-item" id="sidebar_minimize">
                <a class="nav-link navbar-toggler sidebar-toggler" @click="sidebarMinimize">&#9776;</a>
            </li>

        </ul>

        <ul class="nav navbar-nav d-md-down-none">

            <li class="nav-item header-item" v-for="route in pageInfo.list">

                <router-link tag="div" :to='route.path' class="nav-link">
                    <p>
                        <Icon :type="route.icon" size='25' color="#2d8cf0"></Icon>
                    </p>
                    <p style="color:white"> {{route.name}} </p>
                </router-link>
            </li>
        </ul>


        <ul class="nav navbar-nav ml-auto">

            <li class="nav-item d-md-down-none">
                <a class="nav-link">
                    <Icon type="android-notifications" size="20"></Icon>
                    <span class="badge badge-pill badge-danger">5</span></a>
            </li>


            <Dropdown class="nav-item">
                <a href="javascript:void(0)" style="position: relative;">
                    <div slot="button">
                        <img src="/static/img/avatars/man-avatar.png" class="img-avatar" alt="o">
                        <div class="d-md-down-none"
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


            <li class="nav-item d-md-down-none">
                <a class="nav-link navbar-toggler aside-menu-toggler" @click="asideToggle">&#9776;</a>
            </li>
        </ul>
    </navbar>
</template>
<script>

    import navbar from './Navbar'
    import store from 'store/';

    export default {
        props: ['loginUser'],
        name: 'header',
        components: {
            navbar,
        },
        data() {
            return {
                pageInfo: {
                    pageNum: 1,
                    pageSize: 20,
                    list: [],
                    total: 0
                }
            }
        },
        created() {
            this.listRoute();
        },
        methods: {
            listRoute() {
                store.dispatch('ListRoute', {
                    type: 'backheader',
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

    .header-item .ivu-dropdown-item {
        padding: 15px;
    }

    .header-item {
        width: 100px;
    }

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        border-bottom: 5px solid #20a0ff;
    }
</style>
