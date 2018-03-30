<template>
    <router-view></router-view>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        name: 'APP',
        data() {
            return {
                loginUser: {}
            }
        },
        created() {
            var user = Cookies.get('USER-INFO');
            if (user) {
                this.loginUser = JSON.parse(user);
            }
        }
    }
</script>
<style type="text/css">
    @import "./common/mui-fonts-dist/iconfont.css";
</style>
