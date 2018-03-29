const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/BackFull';


export const subscribeCenterRouterMap = [
    {
        path: '/admin/mgr/subscribe',
        redirect: '/admin/mgr/subscribe/service',
        name: '订阅中心',
        component: Full,
        hidden: true,
        children: [
            {
                path: '/admin/mgr/subscribe/service',
                name: '订阅服务',
                icon: 'flag',
                component: _import('mgr/subscribe/SubscribeService')
            },
            {
                path: '/admin/mgr/subscribe/mysubscribe',
                name: '我的订阅',
                icon: 'ios-star-outline',
                component: _import('mgr/subscribe/MySubscribe')
            }
        ]
    }
]
