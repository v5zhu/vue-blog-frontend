import {constantRouterMap} from 'src/router';
import {
    addPermission,
    deletePermission,
    editPermission,
    listPermission,
    listPermissionTree,
    userRouteTree
} from 'api/permission';


import Full from '@/containers/Full';

const _import = require('../../router/_import_' + process.env.NODE_ENV);


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        console.log(route.meta.role)
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param constantRouterMap
 * @param roles
 */
function filterAsyncRouter(constantRouterMap, roles) {
    const accessedRouters = constantRouterMap.filter(route => {
        if (hasPermission(roles, route)) {

            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}


function getNowRouter(constantRouterMap, to) {
    return constantRouterMap.some(route => {
        if (to.path.indexOf(route.path) !== -1) {
            return true;
        }
        else if (route.children && route.children.length) { //如果有孩子就遍历孩子
            return getNowRouter(route.children, to)
        }
    })

}

function getRoutes(routes) {
    try {
        routes.forEach(function (route) {
            var component;
            if (route.parent == null) {
                component = Full;
            } else {
                component = _import(route.component);
            }
            route.component = component;
            if (route.children != null && route.children.length != 0) {
                getRoutes(route.children)
            }
        })
        return routes;
    } catch (err) {
        console.error(err)
    }
}


const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        siderbar_routers: [],
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
            // state.routers.forEach(function(e){
            //     if(e.name==="首页"){
            //     state.siderbar_routers=e;

            //     }

            // })

        },
        SET_NOW_ROUTERS: (state, to) => {
            // 递归访问 accessedRouters，找到包含to 的那个路由对象，设置给siderbar_routers
            state.addRouters.forEach(e => {
                if (e.children && e.children.length) {
                    if (getNowRouter(e.children, to) === true)
                        state.siderbar_routers = e;
                }

            })

            // console.error("permission.js");
            // console.error(state.siderbar_routers);
        }

    },
    actions: {

        UserRouteTree({commit, state}) {
            return new Promise((resolve, reject) => {
                userRouteTree().then(response => {
                    var routes = response.data.payload;
                    var trees = getRoutes(routes);
                    console.error(trees)
                    //设置可访问路由表
                    commit('SET_ROUTERS', trees);

                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        GenerateRoutes({commit}, data) {
            return new Promise(resolve => {
                const {roles} = data
                let accessedRouters;

                if (roles.indexOf('admin') >= 0) {
                    accessedRouters = constantRouterMap
                } else {
                    accessedRouters = filterAsyncRouter(constantRouterMap, roles)
                }


                commit('SET_ROUTERS', accessedRouters);
                resolve();
            })
        },

        generateMenus({commit}, data) {
            return new Promise(resolve => {
                //data => to
                commit('SET_NOW_ROUTERS', data);
                resolve();
            })
        },
        ListPermissionTree({commit, state}) {
            return new Promise((resolve, reject) => {
                listPermissionTree().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListPermission({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listPermission(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        AddPermission({commit, state}, data) {
            return new Promise((resolve, reject) => {
                addPermission(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        EditPermission({commit, state}, data) {
            return new Promise((resolve, reject) => {
                editPermission(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeletePermission({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deletePermission(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    },
};

export default permission;
