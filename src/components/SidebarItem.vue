<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav" v-for="top in routes">
                <router-link tag="li" class="nav-item nav-dropdown"
                             v-if="!top.hidden>0"
                             :to="top.path" disabled>


                    <div style="padding-left: 15px;" class="nav-link nav-dropdown-toggle"
                         v-if="top.children&&top.children.length>0"
                         @click="handleClick">
                        <!--<Icon :type="top.icon" color="#0d5477"/>-->
                        <i :class="top.icon" style="color:#0d5477;"></i>
                        {{ top.name}}
                    </div>
                    <div class="nav-link " v-else="top.children==null||top.children.length==0">
                        <!--<Icon :type="top.icon" color="#0d5477"/>-->
                        <i :class="top.icon" style="color:#0d5477;"></i>
                        {{ top.name}}
                    </div>
                    <ul class="nav-dropdown-items">
                        <template v-for="item in top.children" v-if="top.children&&top.children.length>0">
                            <router-link tag="li" class="nav-item nav-dropdown"
                                         v-if="!item.hidden>0"
                                         :to="item.path" disabled>


                                <div class="nav-link nav-dropdown-toggle" v-if="item.children&&item.children.length>0"
                                     @click="handleClick">
                                    <!--<Icon :type="item.icon" color="#0d5477"/>-->
                                    <i :class="item.icon" style="color:#0d5477;"></i>

                                    {{ item.name}}
                                </div>
                                <div class="nav-link " v-else="item.children==null||item.children.length==0">
                                    <!--<Icon :type="item.icon" color="#0d5477"/>-->
                                    <i :class="item.icon" style="color:#0d5477;"></i>

                                    {{ item.name}}
                                </div>
                                <ul class="nav-dropdown-items">
                                    <li class="nav-item" v-for="child in item.children" v-if='!child.hidden'
                                        @click="addActive">

                                        <router-link :to="item.path+'/'+child.path+'/'+child.children[0].path"
                                                     class="nav-link"
                                                     v-if="!child.hidden&&child.children&&child.children.length!=0">
                                            <!--<Icon :type="child.icon" color="#0d5477"/>-->
                                            <i :class="child.icon" style="color:#0d5477;"></i>

                                            {{ child.name}}
                                        </router-link>
                                        <router-link :to="item.path+'/'+child.path" class="nav-link"
                                                     v-else="!child.children">
                                            <!--<Icon :type="child.icon" color="#0d5477"/>-->
                                            <i :class="child.icon" style="color:#0d5477;"></i>

                                            {{ child.name}}
                                        </router-link>

                                    </li>
                                </ul>
                            </router-link>

                            <li class="nav-item" v-if="!item.hidden&&!item.children">
                                <router-link :to="item.path" class="nav-link" exact>
                                    <!--<Icon :type="item.icon" color="#0d5477"/>-->
                                    <i :class="item.icon" style="color:#0d5477;"></i>

                                    {{ item.name}}
                                </router-link>
                            </li>

                        </template>
                    </ul>
                </router-link>

                <li class="nav-item" v-if="!top.hidden&&!top.children">
                    <router-link :to="top.path" class="nav-link" exact>
                        <Icon :type="top.icon" color="#0d5477"/>
                        {{ top.name}}
                    </router-link>
                </li>


            </ul>
        </nav>
    </div>
</template>

<script>

    export default {
        name: 'SidebarItem',
        props: {
            routes: {
                type: Array
            },
        },
        methods: {
            handleClick(e) {
                e.preventDefault()
                e.target.parentElement.classList.toggle('open')
            },
            addActive(e) {
                e.preventDefault()
                e.target.parentElement.parentElement.parentElement.classList.add('open')
            }
        },
        created() {
//            console.error(JSON.stringify(this.routes))
        },
        mounted() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wscn-icon {
        margin-right: 10px;
    }

    .hideSidebar .menu-indent {
        display: block;
        text-indent: 10px;
    }

    .linkActiveClass {
        border-radius: 2px;
        background-color: #20a8d8;
        color: #fff;
    }
</style>

