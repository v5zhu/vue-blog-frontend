import fetch from 'utils/fetch';

export function articleList(pageInfo) {
    return fetch({
        url: '/admin/article/list',
        method: 'get',
        params: {
            pageNum: pageInfo.pageNum,
            pageSize: pageInfo.pageSize
        }
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

