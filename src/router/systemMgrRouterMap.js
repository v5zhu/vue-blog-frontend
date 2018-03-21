const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';


export const systemMgrRouterMap = [
    {
        path: '/admin/mgr/system',
        redirect: '/admin/mgr/system/role',
        name: '系统管理',
        component: Full,
        hidden: false,
        children: [
            {
                path: 'role',
                name: '角色管理',
                icon: 'ios-location',
                component: _import('mgr/role/Role')
            },
            {
                path: 'permission',
                name: '权限管理',
                icon: 'key',
                component: _import('mgr/permission/Permission')
            },
            {
                path: 'page-element',
                name: '元素管理',
                icon: 'ios-location',
                component: _import('mgr/pageElement/PageElement')
            }
        ]
    }
]
