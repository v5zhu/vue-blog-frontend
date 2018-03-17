import {recordMilestone} from 'api/milestone';

const milestone = {
    state: {
        id: '',
        name: '',
        desc: '',
        status: '',
        time: '',
        gmtCreate: '',
        gmtModified: ''
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_DESC: (state, desc) => {
            state.desc = desc;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_TIME: (state, time) => {
            state.time = time;
        },
        SET_GMT_CREATE: (state, gmtCreate) => {
            state.gmtCreate = gmtCreate;
        },
        SET_GMT_MODIFIED: (state, modified) => {
            state.modified = modified;
        }
    },

    actions: {
        RecordMilestone({commit, state}, milestone) {
            return new Promise((resolve, reject) => {
                recordMilestone(milestone).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
    }
};

export default milestone;
