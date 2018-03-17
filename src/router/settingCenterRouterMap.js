const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';


export const settingCenterRouterMap = [
    {
        path: '/admin/mgr/setting',
        redirect: '/admin/mgr/setting/userinfo',
        name: '设置中心',
        component: Full,
        hidden: false,
        children: [
            {
                path: 'userinfo',
                name: '个人信息',
                icon: 'person',
                component: _import('mgr/setting/Userinfo')
            },
            {
                path: 'password',
                name: '修改密码',
                icon: 'ios-locked',
                component: _import('mgr/setting/Password')
            }
        ]
    }
]
