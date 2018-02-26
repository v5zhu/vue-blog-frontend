import fetch from 'utils/fetch';

export function tagList(token) {
    return fetch({
        url: '/admin/tag/list',
        method: 'get',
        params: {token}
    });
}

