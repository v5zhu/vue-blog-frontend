import fetch from 'utils/fetch';


export function listRoutesTree(params) {
    return fetch({
        url: '/back/route/tree.token',
        method: 'get',
        params: params
    });
}

export function listBackHeaderRoute(params) {
    return fetch({
        url: '/back/route/list.token',
        method: 'get',
        params: params
    });
}


export function listFrontRoute(params) {

    return fetch({
        url: '/front/route/list.open',
        method: 'get',
        params: params
    });
}




