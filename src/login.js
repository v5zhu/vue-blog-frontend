import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import Cookies from 'js-cookie';

import Full from '@/containers/Full';

const _import = require('./router/_import_' + process.env.NODE_ENV);

// permissiom judge
function hasPermission(roles, permissionRoles) {
    if (roles.roles.indexOf('admin') >= 0) return true // admin权限 直接通过
    if (!permissionRoles) return true;
    return roles.roles.some(role => permissionRoles.indexOf(role) >= 0)
}

function getRoutes(routes) {
    try {
        routes.forEach(function (route) {
            // console.error("login=>" + JSON.stringify(route))
            // var component;
            // if (route.parent == null) {
            //     component = Full;
            // } else {
            //     component = route.component;
            //     component = _import(route.component);
            // }
            // route.component = component;
            if (route.children != null && route.children.length != 0) {
                getRoutes(route.children)
            }
        })
        return routes;
    } catch (err) {
        console.error(err)
    }
}


// register global progress.
const whiteList = ['/admin/login', '/authredirect']// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start() // 开启Progress
    var jsonString = Cookies.get('USER-INFO');
    var user = undefined;

    if (jsonString) {
        user = JSON.parse(jsonString);
    }
    // console.log("用户：" + user);

    if (user && user.token) { // 判断是否有token

        var roles = user.roles;
        store.dispatch('UserRouteTree').then(response => { // 拉取user_info
            var routes = response.data.payload;
            var trees = getRoutes(routes);
            router.addRoutes(trees) // 动态添加可访问路由表
            next({...to}) // hack方法 确保addRoutes已完成
            store.dispatch('generateMenus', to);

        }).catch(err => {
            console.error(err);
        })

        next()//

    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            if (to.path.indexOf('admin') == -1) {
                store.dispatch('UserRouteTreeByOpen').then(response => { // 拉取user_info
                    var routes = response.data.payload;
                    var trees = getRoutes(routes);
                    router.addRoutes(trees) // 动态添加可访问路由表
                    next({...to}) // hack方法 确保addRoutes已完成
                    store.dispatch('generateMenus', to);

                }).catch(err => {
                    console.error(err);
                })
                next();
            } else {
                next('/admin/login') // 否则全部重定向到登录页
                NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
            }
        }
    }
})

router.afterEach(to => {
    var prefix = 'MFX - ';
    document.title = prefix + to.name;
    NProgress.done() // 结束Progress
})