import fetch from 'utils/fetch';

const prefix = '/blog';

export function filterCategoryList(token) {
    return fetch({
        url: prefix + '/admin/category/list.token',
        method: 'get',
        params: {token}
    });
}

export function filterCategoryTree() {
    return fetch({
        url: prefix + '/admin/category/tree.token',
        method: 'get',
    });
}

export function categoryAdd(category) {
    return fetch({
        url: prefix + '/admin/category/save',
        method: 'post',
        data: category
    });
}

