import fetch from 'utils/fetch';

export function filterTagList(params) {
    return fetch({
        url: '/admin/tag/list.token',
        method: 'get',
        params: params
    });
}


export function tagList(params) {
    return fetch({
        url: '/admin/tag/list.open',
        method: 'get',
        params: params
    });
}

export function tagAdd(tag) {
    return fetch({
        url: '/admin/tag/save',
        method: 'post',
        data: tag
    });
}
