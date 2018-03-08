import fetch from 'utils/fetch';

export function articleComments(params) {
    return fetch({
        url: '/article/' + params.articleId + '/comments',
        method: 'get',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize
        }
    });
}

export function commitComment(data) {
    return fetch({
        url: '/article/' + data.articleId + '/comment',
        method: 'post',
        data: data
    });
}

