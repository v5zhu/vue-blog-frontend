import {
    settingRolePermission,
    addRolePermission,
    deleteRolePermission
} from 'api/rolePermission';

const rolePermission = {
    actions: {
        SettingRolePermission({commit, state}, data) {
            return new Promise((resolve, reject) => {
                settingRolePermission(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
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
