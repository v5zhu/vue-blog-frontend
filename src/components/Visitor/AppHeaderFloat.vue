<template>
    <div>
        <transition name="fade">
            <header-float-navbar v-show="floatLayerShow" transiton="fade">
                <ul class="nav navbar-nav-left d-md-down-none">
                    <li class="nav-item header-item">
                        加入我们不仅可以更好的解决您的问题，同时和可以和业界大师近距离接触交流，管理您的技术积累!
                    </li>
                </ul>
                <ul class="nav navbar-nav d-md-down-none">

                    <li class="nav-item header-item">
                        <Button type="default" icon="ios-pulse-strong" size="large">免费注册</Button>
                    </li>

                    <li class="nav-item header-item">
                        <Button type="info" icon="paper-airplane" size="large">立即登录</Button>
                    </li>
                </ul>
                <ul>
                    <li class="nav-item d-md-down-none" style="position: absolute;right:-5px;top:5px;">
                        <a class="nav-link navbar-toggler aside-menu-toggler"
                           @click="closeTheHeaderFloat()">
                            <Icon type="close-circled" color="white"></Icon>
                        </a>
                    </li>
                </ul>
            </header-float-navbar>
        </transition>
    </div>
</template>
<script>

    import HeaderFloatNavbar from './HeaderFloatNavbar';

    export default {
        name: 'header',
        props: [],
        data() {
            return {
                floatLayerShow: true
            }
        },
        components: {HeaderFloatNavbar},
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
            },
            closeTheHeaderFloat() {
                this.$emit('closeHeaderFloat')
            }
        }
    }
</script>

<style type="text/css" scoped>
    .navbar-nav {
        position: absolute;
        top: 50px;
        right: 50px;

    }

    .navbar-nav-left {
        position: absolute;
        left: 50px;
        top: 50px;
        color: white;
        font-size: 16px;
        font-weight: 700;
    }

    .header-item {
        padding: 15px;
    }

    .header-item a {

        color: white !important;

    }

    ul > li:not(#sidebar_minimize):hover {
        cursor: pointer;
        /*border-bottom: 2px solid #9affab;*/
    }
</style>
