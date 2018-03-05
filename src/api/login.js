import fetch from 'utils/fetch';

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

export function logout() {
    return fetch({
        url: '/login/logout',
        method: 'post'
    });
}

export function getInfo(token) {
    return fetch({
        url: '/admin/userInfo',
        method: 'get',
        params: {token}
    });
}


