import {
    addRole,
    deleteRole,
    editRole,
    listRole,
    roleTree
} from 'api/role';

const role = {
    actions: {
        RoleTree({commit, state}) {
            return new Promise((resolve, reject) => {
                roleTree().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListRole({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listRole(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        AddRole({commit, state}, data) {
            return new Promise((resolve, reject) => {
                addRole(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        EditRole({commit, state}, data) {
            return new Promise((resolve, reject) => {
                editRole(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeleteRole({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deleteRole(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default role;
