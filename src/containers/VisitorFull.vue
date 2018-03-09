<template>
    <div class="app">
        <AppHeader :isShow="isShow"/>
        <div class="app-body">
            <main class="main">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
            <AppAside/>
        </div>
        <AppFooter/>
    </div>
</template>

<script>
    import AppHeader from '../components/Visitor/Header';
    import AppAside from '../components/Visitor/Aside';
    import AppFooter from '../components/Visitor/Footer';

    export default {
        name: 'full',
        data() {
            return {
                isShow: true
            }
        },
        components: {
            AppHeader,
            AppAside,
            AppFooter
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll)
        },
        methods: {
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop < 400) {
                    this.isShow = true;
                } else {
                    this.isShow = false;
                }
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