const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full';


export const articleMgrRouterMap = [
    {
        path: '/admin/mgr',
        name: '博客管理',
        icon: 'ios-book',
        redirect: '/admin/mgr/article',
        component: Full,
        hidden: false,
        children: [
            {
                path: 'article',
                name: '文章管理',
                icon: 'stats-bars',
                component: _import('mgr/ArticleMgr'),
                hidden: false
            }, {
                path: 'article/edit/:id',
                name: '文章编辑',
                icon: 'stats-bars',
                component: _import('mgr/ArticleEdit'),
                hidden: true
            }, {
                path: 'article/publish',
                name: '文章发表',
                icon: 'stats-bars',
                component: _import('mgr/ArticleEdit'),
                hidden: true
            },
            {
                path: '/admin/mgr/comment',
                name: '评论管理',
                icon: 'chatbubble-working',
                component: _import('mgr/Comment'),
                hidden: false
            }, {
                path: '/admin/mgr/tag',
                name: '标签管理',
                icon: 'ios-pricetags',
                component: _import('mgr/Tag'),
                hidden: false,
            }, {
                path: '/admin/mgr/category',
                name: '分类管理',
                icon: 'network',
                component: _import('mgr/Category'),
                hidden: false,
            }
        ]
    },
    {
        path: '/admin/mgr/article/preview/:id',
        name: '文章预览',
        icon: 'stats-bars',
        hidden: true,
        redirect: '/admin/mgr/article/preview/:id',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: '/admin/mgr/article/preview/:id',
                name: '文章预览',
                icon: 'stats-bars',
                hidden: true,
                component: _import('mgr/ArticlePreview')
            }
        ]
    }
]