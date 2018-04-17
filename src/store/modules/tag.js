import {tagList, filterTagList, tagAdd} from 'api/blog/tag';

const tag = {
    state: {
        id: '',
        name: '',
        value: '',
        type: '',
        description: '',
        sort: '',
        parent: ''
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_VALUE: (state, value) => {
            state.value = value;
        },
        SET_TYPE: (state, type) => {
            state.type = type;
        },
        SET_DESCRIPTION: (state, description) => {
            state.description = description;
        },
        SET_SORT: (state, sort) => {
            state.sort = sort;
        },
        SET_PARENT: (state, parent) => {
            state.parent = parent;
        }
    },

    actions: {
        // 获取所有标签列表
        TagList({commit, state}, params) {
            return new Promise((resolve, reject) => {
                tagList(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 获取列表
        FilterTagList({commit, state}, params) {
            return new Promise((resolve, reject) => {
                filterTagList(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },// 添加标签
        TagAdd({commit, state}, params) {
            return new Promise((resolve, reject) => {
                tagAdd(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default tag;
