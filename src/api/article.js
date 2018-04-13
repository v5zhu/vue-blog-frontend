import fetch from 'utils/fetch';

export function articleList(pageInfo) {
    return fetch({
        url: '/back/article/page/list.token',
        method: 'post',
        data: {
            pageNum: pageInfo.pageNum,
            pageSize: pageInfo.pageSize,
            sort: pageInfo.sort,
            queryParam: pageInfo.queryParam
        }
    });
}

export function articles(params) {
    return fetch({
        url: '/articles',
        method: 'get',
        params: params
    });
}

export function articlePreview(id) {
    return fetch({
        url: '/article/preview/' + id + ".token",
        method: 'get',
        params: {}
    });
}

export function articleDetail(path) {
    return fetch({
        url: '/article/detail/' + path + ".open",
        method: 'get',
        params: {}
    });
}

export function articlePublish(article) {
    return fetch({
        url: '/article/publish.token',
        method: 'post',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleEdit(article) {
    return fetch({
        url: '/article/modify.token',
        method: 'put',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleAudit(auditInfo) {
    return fetch({
        url: '/article/audit.token',
        method: 'put',
        params: {
            articleId: auditInfo.articleId,
            status: auditInfo.status
        },
    });
}

export function articleDelete(id) {
    return fetch({
        url: '/article/delete.token',
        method: 'delete',
        params: id,
    });
}


export function updateStatistics(statistics) {
    return fetch({
        url: '/article/statistics',
        method: 'put',
        data: statistics
    });
}

