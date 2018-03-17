const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';

export const articleMgrRouterMap = [
    {
        path: '/admin/mgr',
        redirect: '/admin/mgr/article',
        name: '博客管理',
        component: Full,
        hidden: false,
        children: [

            {
                path: '/admin/mgr/article',
                name: '文章管理',
                icon: 'ios-book',
                redirect: '/admin/mgr/article/manage',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'manage',
                    name: '文章管理',
                    icon: 'stats-bars',
                    component: _import('mgr/ArticleMgr'),
                    hidden: false
                }, {
                    path: 'preview/:id',
                    name: '文章预览',
                    icon: 'stats-bars',
                    component: _import('mgr/ArticleView'),
                    hidden: true
                }, {
                    path: 'edit/:id',
                    name: '文章编辑',
                    icon: 'stats-bars',
                    component: _import('mgr/ArticleEdit'),
                    hidden: true
                }, {
                    path: 'publish',
                    name: '文章发表',
                    icon: 'stats-bars',
                    component: _import('mgr/ArticleEdit'),
                    hidden: true
                }]
            },
            {
                path: '/admin/mgr/comment',
                name: '评论管理',
                icon: 'chatbubble-working',
                component: _import('mgr/Comment')
            }, {
                path: '/admin/mgr/tag',
                name: '标签管理',
                icon: 'ios-pricetags',
                component: _import('mgr/Tag')
            }, {
                path: '/admin/mgr/category',
                name: '分类管理',
                icon: 'network',
                component: _import('mgr/Category')
            }
        ]
    }
]