import fetch from 'utils/fetch';

const prefix = '/blog';

export function listRoutesTree(params) {
    return fetch({
        url: prefix + '/back/route/tree.token',
        method: 'get',
        params: params
    });
}

export function listBackHeaderRoute(params) {
    return fetch({
        url: prefix + '/back/route/list.token',
        method: 'get',
        params: params
    });
}


export function listFrontRoute(params) {

    return fetch({
        url: prefix + '/front/route/list.open',
        method: 'get',
        params: params
    });
}




