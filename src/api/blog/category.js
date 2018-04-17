import fetch from 'utils/fetch';

const prefix = '/blog';

export function categoryList(token) {
    return fetch({
        url: prefix + '/admin/category/list.token',
        method: 'get',
        params: {token}
    });
}

export function categoryAdd(category) {
    return fetch({
        url: prefix + '/admin/category/save',
        method: 'post',
        data: category
    });
}

