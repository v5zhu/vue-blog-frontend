import {addFeedback} from 'api/blog/feedback';

const tag = {
    state: {
        id: '',
        type: '',
        content: '',
        name: '',
        email: '',
        gmtCreate: '',
        gmtModified: ''
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_TYPE: (state, type) => {
            state.type = type;
        },
        SET_CONTENT: (state, content) => {
            state.content = content;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_GMT_CREATE: (state, gmtCreate) => {
            state.gmtCreate = gmtCreate;
        },
        SET_GMT_MODIFIED: (state, modified) => {
            state.modified = modified;
        }
    },

    actions: {
        AddFeedback({commit, state}, feedback) {
            return new Promise((resolve, reject) => {
                addFeedback(feedback).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default tag;
