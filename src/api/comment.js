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

