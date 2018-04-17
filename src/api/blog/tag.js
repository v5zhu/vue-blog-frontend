import fetch from 'utils/fetch';

const prefix = '/blog';

export function filterTagList(params) {
    return fetch({
        url: prefix + '/admin/tag/list.token',
        method: 'get',
        params: params
    });
}


export function tagList(params) {
    return fetch({
        url: prefix + '/admin/tag/list.open',
        method: 'get',
        params: params
    });
}

export function tagAdd(tag) {
    return fetch({
        url: prefix + '/admin/tag/save',
        method: 'post',
        data: tag
    });
}
