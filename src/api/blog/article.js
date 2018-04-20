import fetch from 'utils/fetch';

const prefix = '/blog';

export function articleList(data) {
    return fetch({
        url: prefix + '/back/article/page/list.token',
        method: 'post',
        data: data
    });
}

export function articles(data) {
    return fetch({
        url: prefix + '/articles',
        method: 'post',
        data: data
    });
}

export function articlePreview(id) {
    return fetch({
        url: prefix + '/back/article/preview/' + id + ".token",
        method: 'get',
        params: {}
    });
}

export function articleDetail(path) {
    return fetch({
        url: prefix + '/article/detail/' + path + ".open",
        method: 'get',
        params: {}
    });
}

export function articlePublish(article) {
    return fetch({
        url: prefix + '/back/article/publish.token',
        method: 'post',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleEdit(article) {
    return fetch({
        url: prefix + '/back/article/modify.token',
        method: 'put',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export function articleDelete(id) {
    return fetch({
        url: prefix + '/back/article/delete.token',
        method: 'delete',
        params: id,
    });
}


export function updateStatistics(statistics) {
    return fetch({
        url: prefix + '/article/statistics',
        method: 'put',
        data: statistics
    });
}

