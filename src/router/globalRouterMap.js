const _import = require('./_import_' + process.env.NODE_ENV);

// import BackFull from '@/containers/BackFull';
// import VisitorFull from '@/containers/VisitorFull';

export const globalRouterMap = [
    {
        name: 'Pages',
        path: '/pages',
        redirect: '/pages/404',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [{
            name: 'Page404',
            path: '404',
            component: _import('errorPages/Page404')
        }, {
            name: 'Page500',
            path: '500',
            component: _import('errorPages/Page404')
        }]
    }/*, {
        path: '*',
        redirect: '/pages/404',
        hidden: true,
        meta: {
            role: ['admin', 'visitor']
        }
    }*/

]