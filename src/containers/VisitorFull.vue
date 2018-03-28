<template>
    <div class="app" @mousemove="toggleHeader">
        <AppHeader :loginUser="loginUser" :scrollShow="scrollShow" :moveShow="moveShow"/>
        <AppHeaderFloat :scrollShow="scrollShow" :moveShow="moveShow" v-show="headerFloatShow"
                        @closeHeaderFloat="closeHeaderFloat"/>

        <Sidebar/>
        <div class="app-body" @mousemove="toggleHeader">

            <main class="main">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
            <AppAside v-if="loginUser.token!=undefined"/>
        </div>
        <AppFooter/>
    </div>
</template>

<script>
    import AppHeader from '../components/Visitor/Header';
    import AppHeaderFloat from '../components/Visitor/AppHeaderFloat';
    import AppAside from '../components/Visitor/Aside';
    import AppFooter from '../components/Visitor/Footer';
    import Sidebar from '../components/Visitor/Sidebar';

    import Cookies from 'js-cookie';

    export default {
        name: 'visitor-full',
        data() {
            return {
                scrollShow: true,
                moveShow: true,
                headerFloatShow: true,
                loginUser: {}
            }
        },
        components: {
            AppHeader,
            AppHeaderFloat,
            AppAside,
            AppFooter,
            Sidebar
        },
        created() {
            var user = Cookies.get('USER-INFO');
            if (user) {
                this.loginUser = JSON.parse(user);
                this.headerFloatShow = false;
            }
        },
        mounted() {
            // window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop < 100) {
                    this.scrollShow = true;
                } else {
                    this.scrollShow = false;
                }
            },
            toggleHeader(event) {
                event = event || window.event;
                var y = event.clientY;
                if (y < 200) {
                    this.moveShow = true;
                } else {
                    this.moveShow = false;
                }
            },
            closeHeaderFloat() {
                this.headerFloatShow = false;
            }
        },
        computed: {
            name() {
                return this.$route.name
            },

            list() {
                return this.$route.matched
            }
        }
    }
</script>
<style scoped>
    .app-body {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        overflow: hidden;
        margin-top: 55px
    }

    .app-body .main {
        flex: 1;
        min-width: 0;
        margin-left: 65px;
        background-color: white;
        transition: margin-left .25s, margin-right .25s, width .25s, flex .25s
    }

    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh
    }

    .main .container-fluid {
        padding: 0px;
    }
</style>