const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/BackFull';



export const systemMgrRouterMap = [
    {
        path: '/admin/mgr/system',
        redirect: '/admin/mgr/system/user',
        name: '系统管理',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/admin/mgr/system/user',
                name: '用户管理',
                icon: 'person',
                component: _import('mgr/user/User')
            },
            {
                path: '/admin/mgr/system/role',
                name: '角色管理',
                icon: 'ios-location',
                component: _import('mgr/role/Role')
            },
            {
                path: '/admin/mgr/system/permission',
                name: '权限管理',
                icon: 'key',
                component: _import('mgr/permission/Permission')
            },
            {
                path: '/admin/mgr/system/page-element',
                name: '元素管理',
                icon: 'ios-location',
                component: _import('mgr/pageElement/PageElement')
            },
            {
                path: '/admin/mgr/system/route',
                name: '路由管理',
                icon: 'ios-location',
                component: _import('mgr/route/Route')
            },
            {
                path: '/admin/mgr/system/milestone',
                name: '历程记录',
                icon: 'ios-clock-outline',
                component: _import('mgr/milestone/Milestone')
            },
            {
                path: '/admin/mgr/system/task',
                name: '任务管理',
                icon: 'flash-off',
                component: _import('mgr/task/Task')
            }
        ]
    }
]
