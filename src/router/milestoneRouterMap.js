const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';


export const milestoneRouterMap = [
    {
        path: '/admin/mgr/milestone',
        redirect: '/admin/mgr/milestone/record',
        name: '历程记录',
        component: Full,
        hidden: false,
        children: [
            {
                path: 'record',
                name: '历程记录',
                icon: 'ios-clock-outline',
                component: _import('mgr/milestone/Milestone')
            }
        ]
    }
]
