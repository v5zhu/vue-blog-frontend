import {deleteLog, logList} from 'api/log';

const log = {
    state: {
        id: '',
        action: '',
        data: '',
        level: '',
        author: '',
        ip: '',
        url: '',
        browser: '',
        gmtCreate: '',
        gmtModified: ''
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_ACTION: (state, action) => {
            state.action = action;
        },
        SET_DATA: (state, data) => {
            state.data = data;
        },
        SET_LEVEL: (state, level) => {
            state.level = level;
        },
        SET_AUTHOR: (state, author) => {
            state.author = author;
        },
        SET_IP: (state, ip) => {
            state.ip = ip;
        },
        SET_URL: (state, url) => {
            state.url = url;
        },
        SET_BROWSER: (state, browser) => {
            state.browser = browser;
        },
        SET_GMT_CREATE: (state, gmtCreate) => {
            state.gmtCreate = gmtCreate;
        },
        SET_GMT_MODIFIED: (state, modified) => {
            state.modified = modified;
        }
    },

    actions: {
        DeleteLog({commit, state}, param) {
            return new Promise((resolve, reject) => {
                deleteLog(param.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        LogList({commit, state}, params) {
            return new Promise((resolve, reject) => {
                logList(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default log;
