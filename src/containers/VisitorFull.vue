<template>
    <div class="app" @mousemove="toggleHeader">
        <AppHeader @showLoginModalFunction="showLoginModalFunction" @showRegModalFunction="showRegModalFunction"
                   :loginUser="loginUser" :scrollShow="scrollShow" :moveShow="moveShow"/>
        <AppHeaderFloat @showLoginModalFunction="showLoginModalFunction" @showRegModalFunction="showRegModalFunction"
                        :scrollShow="scrollShow" :moveShow="moveShow" v-show="headerFloatShow"
                        @closeHeaderFloat="closeHeaderFloat"/>

        <Sidebar/>
        <div class="app-body" @mousemove="toggleHeader">

            <main class="main">
                <div class="container-fluid">
                    <router-view :loginUser="loginUser"
                                 @showLoginModalFunction="showLoginModalFunction"
                                 @showRegModalFunction="showRegModalFunction">
                    </router-view>
                </div>
            </main>
            <AppAside v-if="loginUser.token!=undefined"/>
        </div>
        <AppFooter/>


        <Modal v-model="showLoginModal" width="600" :maskClosable="false"
               @on-visible-change="changeModalVisible" style="position: relative">
            <transition name="bounce" style="position: relative">
                <login-modal-body v-show="showLoginBody" style="min-height: 300px;"
                                  @showLoginModalFunction="showLoginModalFunction"
                                  @showRegModalFunction="showRegModalFunction">
                </login-modal-body>
            </transition>

            <div slot="footer" style="text-align: center">
            </div>

        </Modal>
        <Modal v-model="showRegModal" width="600" :maskClosable="false"
               @on-visible-change="changeModalVisible" style="position: relative">
            <transition name="bounce" style="position: relative">
                <reg-modal-body v-show="showRegBody" style="min-height: 300px;"
                                @showLoginModalFunction="showLoginModalFunction"
                                @showRegModalFunction="showRegModalFunction">
                </reg-modal-body>
            </transition>

            <div slot="footer" style="text-align: center">
            </div>

        </Modal>


    </div>
</template>

<script>
    import AppHeader from '../components/Visitor/Header';
    import AppHeaderFloat from '../components/Visitor/AppHeaderFloat';
    import AppAside from '../components/Visitor/Aside';
    import AppFooter from '../components/Visitor/Footer';
    import Sidebar from '../components/Visitor/Sidebar';

    import RegModalBody from '../components/Visitor/RegModalBody';
    import LoginModalBody from '../components/Visitor/LoginModalBody';


    import Cookies from 'js-cookie';

    export default {
        name: 'visitor-full',
        data() {
            return {
                scrollShow: true,
                moveShow: true,
                headerFloatShow: true,
                loginUser: {},
                showLoginModal: false,
                showRegModal: false,
                showLoginBody: false,
                showRegBody: false
            }
        },
        components: {
            AppHeader,
            AppHeaderFloat,
            AppAside,
            AppFooter,
            Sidebar,
            RegModalBody,
            LoginModalBody
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
            showRegModalFunction() {
                this.showLoginModal = false;
                this.showRegModal = true;
                this.showRegBody = true;
                this.showLoginBody = false;
            },
            showLoginModalFunction() {
                this.showRegModal = false;
                this.showLoginModal = true;
                this.showRegBody = false;
                this.showLoginBody = true;
            },
            changeModalVisible() {

            },
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
    .bounce-enter-active {
        animation: bounce-in 0.8s;
    }

    .bounce-leave-active {
        animation: bounce-out 0.8s;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        70% {
            transform: scale(1.01);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        70% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(0);
        }
    }

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