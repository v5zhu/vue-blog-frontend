import fetch from 'utils/fetch';

const prefix = '/thirdapi';

export function listHeadlines(data) {
    return fetch({
        url: prefix + '/juhe/headline/page/list',
        method: 'post',
        data: data
    });
}

