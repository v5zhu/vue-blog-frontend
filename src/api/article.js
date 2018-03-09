import fetch from 'utils/fetch';

export function articleList(pageInfo) {
    return fetch({
        url: '/admin/article/list',
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

export function articleAudit(auditInfo) {
    return fetch({
        url: '/admin/article/audit',
        method: 'put',
        params: {
            articleId: auditInfo.articleId,
            status: auditInfo.status
        },
    });
}

export function articleDelete(id) {
    return fetch({
        url: '/admin/article/delete',
        method: 'delete',
        params: {id: id},
    });
}


export function updateStatistics(statistics) {
    return fetch({
        url: '/article/statistics',
        method: 'put',
        data: statistics
    });
}

