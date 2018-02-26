import fetch from 'utils/fetch';

export function articleList(token) {
    return fetch({
        url: '/admin/article/list',
        method: 'get',
        params: {token}
    });
}

export function articlePreview(id) {
    return fetch({
        url: '/admin/article/preview/' + id,
        method: 'get',
        params: {}
    });
}

export function articlePublish(article) {
    return fetch({
        url: '/admin/article/publish',
        method: 'post',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleEdit(article) {
    return fetch({
        url: '/admin/article/modify',
        method: 'put',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleDelete(id) {
    return fetch({
        url: '/admin/article/delete',
        method: 'delete',
        params: {id: id},
    });
}

