import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import article from './modules/article';
import archive from './modules/archives';
import category from './modules/category';
import tag from './modules/tag';
import feedback from './modules/feedback';
import comment from './modules/comment';
import permission from './modules/permission';
import route from './modules/route';
import album from './modules/album';
import photo from './modules/photo';
import headline from './modules/thirdapi/headline';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        article,
        archive,
        category,
        tag,
        feedback,
        comment,
        permission,
        route,
        album,
        photo,
        headline
    },
    getters
});

export default store
