import fetch from 'utils/fetch';

export function categoryList(token) {
    return fetch({
        url: '/admin/category/list',
        method: 'get',
        params: {token}
    });
}

