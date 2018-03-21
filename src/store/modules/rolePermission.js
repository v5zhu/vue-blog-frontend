import {
    addRolePermission,
    deleteRolePermission
} from 'api/rolePermission';

const rolePermission = {
    actions: {
        AddRolePermission({commit, state}, data) {
            return new Promise((resolve, reject) => {
                addRolePermission(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeleteRolePermission({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deleteRolePermission(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default rolePermission;
