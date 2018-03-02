import fetch from 'utils/fetch';

export function tagList(token) {
    return fetch({
        url: '/admin/tag/list',
        method: 'get',
        params: {token}
    });
}

export function tagAdd(tag) {
    return fetch({
        url: '/admin/tag/save',
        method: 'post',
        data: tag
    });
}
