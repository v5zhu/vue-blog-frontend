import {filterCategoryList, filterCategoryTree, categoryAdd} from 'api/blog/category';

const category = {
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
        // 获取分类列表
        FilterCategoryList({commit, state}) {
            return new Promise((resolve, reject) => {
                filterCategoryList(state.token).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 获取分类树
        FilterCategoryTree({commit, state}) {
            return new Promise((resolve, reject) => {
                filterCategoryTree().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }, // 添加分类
        CategoryAdd({commit, state}, params) {
            return new Promise((resolve, reject) => {
                categoryAdd(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default category;
