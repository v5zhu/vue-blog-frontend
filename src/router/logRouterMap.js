const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/BackFull';


export const logRouterMap = [
    {
        path: '/admin/mgr/log',
        redirect: '/admin/mgr/log/monitor',
        name: '日志监控',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/admin/mgr/log/monitor',
                name: '日志监控',
                icon: 'ios-paw-outline',
                component: _import('mgr/log/LogMonitor')
            }
        ]
    }
]
