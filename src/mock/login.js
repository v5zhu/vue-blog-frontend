import {param2Obj} from 'utils';

const userMap = {
    admin: {
        role: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        name: 'Super Admin',
        id: 1
    },
    editor: {
        role: ['editor'],
        token: 'editor',
        introduction: '我是编辑',
        name: 'Normal Editor',
        id: 2
    },
    developer: {
        role: ['develop'],
        token: 'develop',
        introduction: '我是开发',
        name: '工程师小王',
        id: 3
    }
}

export default {
    loginByEmail: config => {
        const {loginName} = JSON.parse(config.body);
        return userMap[loginName.split('@')[0]];
    },
    getInfo: config => {
        const {token} = param2Obj(config.url);
        if (userMap[token]) {
            return userMap[token];
        } else {
            return Promise.reject('a');
        }
    },
    logout: () => 'success'
};
