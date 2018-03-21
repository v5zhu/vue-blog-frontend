import fetch from 'utils/fetch';

export function listPermission(params) {
    return fetch({
        url: '/admin/permission/list.token',
        method: 'get',
        params: params
    });
}

export function listPermissionTree() {
    return fetch({
        url: '/admin/permission/tree.token',
        method: 'get'
    });
}


export function addPermission(data) {
    return fetch({
        url: '/admin/permission.token',
        method: 'post',
        data: data
    });
}


export function editPermission(data) {
    return fetch({
        url: '/admin/permission.token',
        method: 'put',
        data: data
    });
}

export function deletePermission(id) {
    return fetch({
        url: 'admin/permission/' + id + '.token',
        method: 'delete'
    });
}




