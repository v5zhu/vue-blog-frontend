import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
import Full2 from '@/containers/Full2'
import VisitorFull from '@/containers/VisitorFull';

import Buttons from '@/views/components/Buttons';


import {visitorRouterMap} from './visitorRouterMap';
import {globalRouterMap} from './globalRouterMap';
import {articleMgrRouterMap} from './articleMgrRouterMap';
import {settingCenterRouterMap} from './settingCenterRouterMap';
import {subscribeCenterRouterMap} from './subscribeCenterRouterMap';
import {milestoneRouterMap} from './milestoneRouterMap';

/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
    {
        path: '/admin/login',
        component: Login,
        hidden: true
    },

    {
        name: '首页',
        path: '/admin',
        redirect: '/admin/dashboard',
        component: Full,
        hidden: false,
        children: [{
            path: '/admin/dashboard',
            name: 'Dashboard',
            icon: 'speedometer',
            component: _import('Dashboard')
        }, {
            path: '/admin/introduction',
            name: '介绍',
            icon: 'thumbsup',
            component: _import('Introduction')
        }, {
            path: '/admin/components',
            name: 'component组件',
            redirect: '/admin/components/buttons',
            icon: 'bookmark',
            component: {
                render(c) {
                    return c('router-view')
                }
            },
            children: [{
                path: 'buttons',
                name: 'Buttons按钮',
                icon: 'social-youtube',
                component: _import('components/Buttons'),
                hidden: false
            },
                {
                    path: 'hoverbuttons',
                    name: '悬停特效按钮',
                    icon: 'wand',
                    component: _import('components/HoverButtons')
                },
                {
                    path: 'alert',
                    name: 'Alert警告提示',
                    icon: 'alert',
                    component: _import('components/Alert')
                },
                {
                    path: 'card',
                    name: 'Card卡片',
                    icon: 'ios-browsers-outline',
                    component: _import('components/Card')
                },
                {
                    path: 'datepicker',
                    name: 'DatePicker',
                    icon: 'ios-calendar-outline',
                    component: _import('components/DatePicker')
                },
                {
                    path: 'form',
                    name: 'Form表单',
                    icon: 'ios-list-outline',
                    component: _import('components/Form')
                },
                {
                    path: 'modal',
                    name: 'Modal对话框',
                    icon: 'ios-chatbubble-outline',
                    component: _import('components/Modal')
                },
                {
                    path: 'select',
                    name: 'Select选择器',
                    icon: 'ios-arrow-down',
                    component: _import('components/Select')
                },
                {
                    path: 'spin',
                    name: 'Spin加载中',
                    icon: 'load-d ',
                    component: _import('components/Spin')
                },
                {
                    path: 'steps',
                    name: 'Steps步骤条',
                    icon: 'ios-checkmark-outline',
                    component: _import('components/Steps')
                },
                {
                    path: 'timeline',
                    name: 'Timeline时间轴',
                    icon: 'android-more-vertical',
                    component: _import('components/Timeline')
                },
                {
                    path: 'transfer',
                    name: 'Transfer穿梭框',
                    icon: 'ios-pause-outline',
                    component: _import('components/Transfer')
                },
                {
                    path: 'timepicker',
                    name: 'Timepicker',
                    icon: 'ios-clock-outline',
                    component: _import('components/Timepicker')
                },
                {
                    path: 'upload',
                    name: 'Upload上传',
                    icon: 'ios-cloud-upload-outline',
                    component: _import('components/Upload')
                }
            ]
        },
            {
                path: '/admin/charts',
                name: 'echart图表',
                redirect: '/admin/charts/shopchart',
                icon: 'pie-graph',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [{
                    path: 'shopchart',
                    name: '商场统计图表',
                    icon: 'stats-bars',
                    component: _import('charts/ShopChart'),
                    hidden: false
                },
                    {
                        path: 'radarchart',
                        name: '雷达图',
                        icon: 'arrow-graph-up-right',
                        component: _import('charts/RadarChart')
                    },
                    {
                        path: 'cakechart',
                        name: '蛋糕销量图表',
                        icon: 'ios-analytics',
                        component: _import('charts/CakeChart')
                    }
                ]
            },
            {
                path: '/admin/table',
                name: '表格综合实例',
                icon: 'ios-paper',
                component: _import('Table'),
                meta: {
                    role: ['admin']
                }
            },
            {
                path: '/admin/jsontree',
                name: 'JSON视图',
                icon: 'merge',
                component: _import('JsonTree')
            },
            {
                path: '/admin/tabledetail/:id',
                name: 'TableDetail',
                hidden: true,
                component: _import('TableDetail')
            },
            {
                path: '/admin/tinymce',
                name: 'Tinymce编辑器',
                icon: 'android-document',
                component: _import('Tinymce')
            },
            {
                path: '/admin/markdown',
                name: 'Markdown',
                icon: 'android-list',
                component: _import('Markdown')
            }
        ]
    }
]
    .concat(globalRouterMap)
    .concat(visitorRouterMap)
    .concat(articleMgrRouterMap)
    .concat(settingCenterRouterMap)
    .concat(milestoneRouterMap)
    .concat(subscribeCenterRouterMap);

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        const position = {}
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
    }
}

//使用浏览器历史访问模式，可使用浏览器前进后退功能
export default new Router({
    mode: 'history',
    // mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: scrollBehavior,
    routes: constantRouterMap
});
