import {
    archives
} from 'api/blog/archives';

const archive = {
    state: {},

    mutations: {},


    actions: {
        // 获取文章列表
        Archives({commit, state}, params) {
            return new Promise((resolve, reject) => {
                archives(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default archive;
