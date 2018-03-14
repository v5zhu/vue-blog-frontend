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
        background: inherit;
        flex-direction: row;
        height: 60px;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        border: none;
    }
</style>
