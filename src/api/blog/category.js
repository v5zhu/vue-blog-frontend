import fetch from 'utils/fetch';

const prefix = '/blog';

export function filterCategoryList(params) {
    return fetch({
        url: prefix + '/admin/category/list.open',
        method: 'get',
        params: params
    });
}

export function filterCategoryTree(params) {
    return fetch({
        url: prefix + '/admin/category/tree.token',
        method: 'get',
        params:params
    });
}

export function categoryAdd(category) {
    return fetch({
        url: prefix + '/admin/category/save',
        method: 'post',
        data: category
    });
}

