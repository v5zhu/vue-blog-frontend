import fetch from 'utils/fetch';

export function listPageElementsByRoute(params) {
    return fetch({
        url: '/admin/pageElement/listByRoute.token',
        method: 'get',
        params: params
    });
}

export function listPageElement(params) {
    return fetch({
        url: '/admin/pageElement/list.token',
        method: 'get',
        params: params
    });
}


export function addPageElement(data) {
    return fetch({
        url: '/admin/pageElement.token',
        method: 'post',
        data: data
    });
}


export function editPageElement(data) {
    return fetch({
        url: '/admin/pageElement.token',
        method: 'put',
        data: data
    });
}

export function deletePageElement(id) {
    return fetch({
        url: 'admin/pageElement/' + id + '.token',
        method: 'delete'
    });
}




