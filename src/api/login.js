import fetch from 'utils/fetch';

export function register(user) {
    return fetch({
        url: '/user/register',
        method: 'post',
        data: user
    });
}

export function login(loginData) {
    return fetch({
        url: '/user/login',
        method: 'put',
        data: loginData
    });
}

export function modifyUser(user) {
    return fetch({
        url: '/user/modify.token',
        method: 'put',
        data: user
    });
}

export function modifyPassword(user) {
    return fetch({
        url: '/user/password/modify.token',
        method: 'put',
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
        url: '/user/logout.token',
        method: 'put',
        params: token
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


