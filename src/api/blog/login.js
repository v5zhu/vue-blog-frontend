import fetch from 'utils/fetch';

const prefix = '/blog';

export function checkPhone(params) {
    return fetch({
        url: prefix + '/user/phone/check',
        method: 'get',
        params: params
    });
}

export function sendPhoneCode(params) {
    return fetch({
        url: prefix + '/user/phone/code',
        method: 'post',
        params: params
    });
}

export function register(user) {
    return fetch({
        url: prefix + '/user/register',
        method: 'post',
        data: user
    });
}

export function login(loginData) {
    return fetch({
        url: prefix + '/user/login',
        method: 'put',
        data: loginData
    });
}

export function setUserRole(data) {
    return fetch({
        url: prefix + '/admin/user/role.token',
        method: 'put',
        data: data
    });
}

export function listUser(params) {
    return fetch({
        url: prefix + '/admin/user/list.token',
        method: 'get',
        params: params
    });
}


export function modifyUser(user) {
    return fetch({
        url: prefix + '/user/modify.token',
        method: 'put',
        data: user
    });
}

export function deleteUser(id) {
    return fetch({
        url: prefix + '/admin/delete/user/' + id + '.token',
        method: 'delete'
    });
}

export function modifyPassword(user) {
    return fetch({
        url: prefix + '/user/password/modify.token',
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
        url: prefix + '/admin/login',
        method: 'post',
        data
    });
}

export function logout(token) {
    return fetch({
        url: prefix + '/user/logout.token',
        method: 'put',
        params: token
    });
}

export function getInfo(token) {
    return fetch({
        url: prefix + '/admin/userInfo',
        method: 'get',
        params: {token}
    });
}

export function getAuthorInfo(params) {
    return fetch({
        url: prefix + '/author',
        method: 'get',
        params: params
    });
}


