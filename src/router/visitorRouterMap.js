const _import = require('./_import_' + process.env.NODE_ENV);
import VisitorFull from '@/containers/VisitorFull';


export const visitorRouterMap = [
    {
        name: '访客首页',
        path: '/',
        redirect: '/articles',
        component: VisitorFull,
        meta: {
            role: []
        },
        children: [{
            name: '文章页',
            path: '/articles',
            component: _import('visitor/Articles'),
            meta: {
                scrollToTop: true
            }
        }, {
            name: '文章归档',
            path: '/archives',
            component: _import('visitor/Archives'),
            meta: {
                scrollToTop: true
            }
        }, {
            name: '文章归档(按时间筛选)',
            path: '/archives/:year/:month',
            component: _import('visitor/Archives'),
            meta: {
                scrollToTop: true
            }
        }, {
            name: '文章归档(按分类筛选)',
            path: '/category/:category',
            component: _import('visitor/Archives'),
            meta: {
                scrollToTop: true
            }
        }, {
            name: '文章归档(按标签筛选)',
            path: '/tag/:tag',
            component: _import('visitor/Archives'),
            meta: {
                scrollToTop: true
            }
        }, {
            name: '文章详情页',
            path: '/article/detail/:path',
            component: _import('visitor/ArticleView'),
            meta: {
                scrollToTop: true
            }
        }, {
            name: '友链',
            path: '/links',
            component: _import('visitor/Links'),
            meta: {
                scrollToTop: true
            }
        }, {
            name: '赞赏榜',
            path: '/awards',
            component: _import('visitor/Awards'),
            meta: {
                scrollToTop: true
            }
        }, {
            name: '意见反馈',
            path: '/feedback',
            component: _import('visitor/Feedback'),
            meta: {
                scrollToTop: true
            }
        }]
    }
]