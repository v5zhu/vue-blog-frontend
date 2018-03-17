const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';


export const subscribeCenterRouterMap = [
    {
        path: '/admin/mgr/subscribe',
        redirect: '/admin/mgr/subscribe/service',
        name: '订阅中心',
        component: Full,
        hidden: true,
        children: [
            {
                path: 'service',
                name: '订阅服务',
                icon: 'flag',
                component: _import('mgr/subscribe/SubscribeService')
            },
            {
                path: 'mysubscribe',
                name: '我的订阅',
                icon: 'ios-star-outline',
                component: _import('mgr/subscribe/MySubscribe')
            }
        ]
    }
]
