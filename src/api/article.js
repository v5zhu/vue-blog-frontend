import fetch from 'utils/fetch';

export function articleList(token) {
    return fetch({
        url: '/admin/article/list',
        method: 'get',
        params: {token}
    });
}

