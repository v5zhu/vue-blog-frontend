<template>
    <header class="app-header navbar">
        <slot></slot>
    </header>
</template>
<script>
    export default {
        name: 'navbar',
        created() {
            this._navbar = true
        }
    }
</script>
<style type="text/css" scoped>
    .app-header{
        position: relative;
    }
    .app-header.navbar {
        flex-direction: row;
        height: 160px;
        margin-top: 60px;
        background: #0d5477;
        /*box-shadow: 0 0px 20px 1px rgba(255,165,0,0.5);*/
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: .5rem 1rem
    }
</style>
