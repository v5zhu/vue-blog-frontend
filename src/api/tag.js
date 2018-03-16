import fetch from 'utils/fetch';

export function tagList(params) {
    return fetch({
        url: '/admin/tag/list.token',
        method: 'get',
        params:params
    });
}

export function tagAdd(tag) {
    return fetch({
        url: '/admin/tag/save',
        method: 'post',
        data: tag
    });
}
