import fetch from 'utils/fetch';

const prefix = '/blog';

export function listPermission(params) {
    return fetch({
        url: prefix + '/admin/permission/list.token',
        method: 'get',
        params: params
    });
}

export function listPermissionTree() {
    return fetch({
        url: prefix + '/admin/permission/tree.token',
        method: 'get'
    });
}

export function userRouteTree() {
    return fetch({
        url: prefix + '/user/route/tree.token',
        method: 'get'
    });
}

export function userRouteTreeByOpen() {
    return fetch({
        url: prefix + '/user/route/tree.open',
        method: 'get'
    });
}


export function addPermission(data) {
    return fetch({
        url: prefix + '/admin/permission.token',
        method: 'post',
        data: data
    });
}


export function editPermission(data) {
    return fetch({
        url: prefix + '/admin/permission.token',
        method: 'put',
        data: data
    });
}

export function deletePermission(id) {
    return fetch({
        url: prefix + '/admin/permission/' + id + '.token',
        method: 'delete'
    });
}




