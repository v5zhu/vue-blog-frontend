import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import article from './modules/article';
import archive from './modules/archives';
import category from './modules/category';
import tag from './modules/tag';
import link from './modules/link';
import comment from './modules/comment';
import permission from './modules/permission';
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
        comment,
        permission
    },
    getters
});

export default store
