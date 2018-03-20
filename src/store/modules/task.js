import {
    addTask,
    deleteTask,
    editTask,
    getClassFullName,
    listClassMethods,
    listComponentsName,
    listTask,
    switchTaskStatus,
} from 'api/task';

const task = {
    actions: {
        ListTask({commit, state},params) {
            return new Promise((resolve, reject) => {
                listTask(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        AddTask({commit, state}, data) {
            return new Promise((resolve, reject) => {
                addTask(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        EditTask({commit, state}, data) {
            return new Promise((resolve, reject) => {
                editTask(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        SwitchTaskStatus({commit, state}, params) {
            return new Promise((resolve, reject) => {
                switchTaskStatus(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeleteTask({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deleteTask(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListComponentsName({commit, state}) {
            return new Promise((resolve, reject) => {
                listComponentsName().then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListClassMethodName({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listClassMethods(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetClassFullName({commit, state}, params) {
            return new Promise((resolve, reject) => {
                getClassFullName(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default task;
