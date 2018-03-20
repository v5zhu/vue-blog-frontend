import {
    addRoute,
    deleteRoute,
    editRoute,
    listRoutesTree,
    listRoute,
    getRouteById
} from 'api/route';

const route = {
    actions: {
        ListRoutesTree({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listRoutesTree(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListRoute({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listRoute(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetRouteById({commit, state}, params) {
            return new Promise((resolve, reject) => {
                getRouteById(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        AddRoute({commit, state}, data) {
            return new Promise((resolve, reject) => {
                addRoute(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        EditRoute({commit, state}, data) {
            return new Promise((resolve, reject) => {
                editRoute(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeleteRoute({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deleteRoute(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default route;
