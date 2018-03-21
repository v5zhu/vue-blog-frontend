import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import article from './modules/article';
import archive from './modules/archives';
import category from './modules/category';
import tag from './modules/tag';
import link from './modules/link';
import feedback from './modules/feedback';
import milestone from './modules/milestone';
import log from './modules/log';
import task from './modules/task';
import route from './modules/route';
import comment from './modules/comment';
import role from './modules/role';
import pageElement from './modules/pageElement';
import permission from './modules/permission';
import rolePermission from './modules/rolePermission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        article,
        archive,
        category,
        tag,
        link,
        feedback,
        milestone,
        log,
        task,
        route,
        comment,
        role,
        pageElement,
        permission,
        rolePermission
    },
    getters
});

export default store
