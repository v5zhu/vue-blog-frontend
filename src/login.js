import router from './router'
import store from './store'
import vue from 'vue'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import Cookies from 'js-cookie';

// permissiom judge
function hasPermission(roles, permissionRoles) {
    if (roles.roles.indexOf('admin') >= 0) return true // admin权限 直接通过
    if (!permissionRoles) return true;
    return roles.roles.some(role => permissionRoles.indexOf(role) >= 0)
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
    console.log("用户：" + user);

    if (user && user.token) { // 判断是否有token
        var roles = user.roles;
        if (roles.length === 0) { // 没有赋予权限

            store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({...to}) // hack方法 确保addRoutes已完成
            })

        } else {
            store.dispatch('GenerateRoutes', {roles}).then(() => { // 生成可访问的路由表
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({...to}) // hack方法 确保addRoutes已完成
            })

            store.dispatch('getNowRoutes', to);

            if (hasPermission({roles}, to.meta.role)) {
                next()//
            } else {
                next({path: '/admin', query: {noGoBack: true}})
            }
        }

    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            if (to.path.indexOf('admin') == -1) {
                store.dispatch('GenerateRoutes', {roles: []}).then(() => { // 生成可访问的路由表
                    router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                    next({...to}) // hack方法 确保addRoutes已完成
                })

                store.dispatch('getNowRoutes', to);

                if (hasPermission({roles: []}, to.meta.role)) {
                    next()
                } else {
                    next({path: '/', query: {noGoBack: true}})
                }
            } else {
                next('/admin/login') // 否则全部重定向到登录页
                NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
            }
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
    // window.scrollTo(0,0);// 每个路由都回到顶部
})
