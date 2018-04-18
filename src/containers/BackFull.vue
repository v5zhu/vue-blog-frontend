<template>
    <div class="app">
        <AppHeader :loginUser="loginUser"/>
        <div class="app-body">
            <Sidebar/>
            <main class="main">
                <breadcrumb :list="list"/>
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
    import AppHeader from '../components/Header'
    import Sidebar from '../components/Sidebar'
    import AppAside from '../components/Aside'
    import AppFooter from '../components/Footer'
    import Breadcrumb from '../components/Breadcrumb'
    import Cookies from 'js-cookie';

    export default {
        name: 'full',
        data() {
            return {
                loginUser: {}

            }
        },
        created() {
            var user = Cookies.get('LOGIN-USER');
            if (user) {
                this.loginUser = JSON.parse(user);
            }
        },
        components: {
            AppHeader,
            Sidebar,
            AppAside,
            AppFooter,
            Breadcrumb
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
