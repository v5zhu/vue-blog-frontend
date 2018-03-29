import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// import Full from '@/containers/Full'
// import Full2 from '@/containers/Full2'
// import VisitorFull from '@/containers/VisitorFull';
//
// import Buttons from '@/views/components/Buttons';


// import {visitorRouterMap} from './visitorRouterMap';
import {globalRouterMap} from './globalRouterMap';
// import {articleMgrRouterMap} from './articleMgrRouterMap';
// import {settingCenterRouterMap} from './settingCenterRouterMap';
// import {subscribeCenterRouterMap} from './subscribeCenterRouterMap';
// import {logRouterMap} from './logRouterMap';
// import {systemMgrRouterMap} from './systemMgrRouterMap';

/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
    {
        path: '/admin/login',
        component: Login,
        hidden: true
    }
]
    .concat(globalRouterMap)
    // .concat(visitorRouterMap)
    // .concat(articleMgrRouterMap)
    // .concat(settingCenterRouterMap)
    // .concat(logRouterMap)
    // .concat(systemMgrRouterMap)
    // .concat(subscribeCenterRouterMap);

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        const position = {}
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}

//使用浏览器历史访问模式，可使用浏览器前进后退功能
export default new Router({
    mode: 'history',
    // mode: 'hash',
    linkActiveClass: 'linkActiveClass',
    scrollBehavior: scrollBehavior,
    routes: constantRouterMap
});
