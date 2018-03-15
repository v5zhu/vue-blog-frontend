import fetch from 'utils/fetch';

export function register(user) {
    return fetch({
        url: '/user/register',
        method: 'post',
        data: user
    });
}

export function loginByEmail(loginName, password) {
    const data = {
        loginName,
        password
    };
    return fetch({
        url: '/admin/login',
        method: 'post',
        data
    });
}

export function logout(token) {
    return fetch({
        url: '/admin/logout',
        method: 'post',
        params: {token}
    });
}

export function getInfo(token) {
    return fetch({
        url: '/admin/userInfo',
        method: 'get',
        params: {token}
    });
}

export function getAuthorInfo(params) {
    return fetch({
        url: '/author',
        method: 'get',
        params: params
    });
}


