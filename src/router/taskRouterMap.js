const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';


export const taskRouterMap = [
    {
        path: '/admin/mgr/task',
        redirect: '/admin/mgr/task/list',
        name: '任务管理',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/admin/mgr/task/list',
                name: '任务管理',
                icon: 'ios-paw-outline',
                component: _import('mgr/task/Task')
            }
        ]
    }
]
