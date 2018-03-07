<template>
    <div>
        <transition name="fade">
            <navbar v-show="isShow" transiton="fade">

                <ul class="nav navbar-nav d-md-down-none">

                    <li class="nav-item header-item">

                        <router-link tag="div" to='/articles' class="nav-link">
                            <p>
                                <Icon type="ios-book-outline" size='28' color="orange"></Icon>
                            </p>
                            <p style="color:orange"> 首页 </p>
                        </router-link>
                    </li>

                    <li class="nav-item header-item">

                        <router-link tag="div" to='/archives' class="nav-link">
                            <p>
                                <Icon type="map" size='28' color="orange"></Icon>
                            </p>
                            <p style="color:orange"> 归档 </p>
                        </router-link>
                    </li>
                    <li class="nav-item header-item">

                        <router-link tag="div" to='/links' class="nav-link">
                            <p>
                                <Icon type="social-github" size='28' color="orange"></Icon>
                            </p>
                            <p style="color:orange"> 友链 </p>
                        </router-link>

                    </li>
                    <li class="nav-item d-md-down-none" style="position: absolute;right:0;">
                        <a class="nav-link navbar-toggler aside-menu-toggler" style="color: orange"
                           @click="asideToggle">&#9776;</a>
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
        props: ['isShow'],
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
        cursor: pointer;
        /*border-bottom: 2px solid #9affab;*/
    }
</style>
