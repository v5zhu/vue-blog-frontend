import fetch from 'utils/fetch';


export function addRolePermission(data) {
    return fetch({
        url: '/admin/role/permission.token',
        method: 'post',
        data: data
    });
}


export function deleteRolePermission(roleId, permissionId) {
    return fetch({
        url: 'admin/role/' + roleId + 'permission/' + permissionId + '.token',
        method: 'delete'
    });
}




