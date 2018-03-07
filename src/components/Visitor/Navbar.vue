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
    .app-header.navbar {
        flex-direction: row;
        height: 55px;
        margin: 0;
        background: #f6faff;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: .5rem 1rem
    }
</style>
