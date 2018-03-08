import fetch from 'utils/fetch';

export function linkList(token) {
    return fetch({
        url: '/links',
        method: 'get',
        params: {token}
    });
}
