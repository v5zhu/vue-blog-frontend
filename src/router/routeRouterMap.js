const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';


export const routeRouterMap = [
    {
        path: '/admin/mgr/route',
        redirect: '/admin/mgr/route/list',
        name: '路由管理',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/admin/mgr/route/list',
                name: '路由管理',
                icon: 'ios-location',
                component: _import('mgr/route/Route')
            }
        ]
    }
]
