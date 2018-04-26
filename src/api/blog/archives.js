import fetch from 'utils/fetch';

const prefix = '/blog';

export function archives(params) {
    return fetch({
        url: prefix+"/archives",
        method: 'get',
        params: params
    });
}

