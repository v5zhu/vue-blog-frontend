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


</style>
