import fetch from 'utils/fetch';

const prefix = '/blog';

export function articleComments(params) {
    return fetch({
        url: prefix+'/article/' + params.articleId + '/comments',
        method: 'get',
        params: {
            pageNum: params.pageNum,
            pageSize: params.pageSize
        }
    });
}

export function commitComment(data) {
    return fetch({
        url: prefix+'/article/' + data.articleId + '/comment',
        method: 'post',
        data: data
    });
}

