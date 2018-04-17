import {
    listRoutesTree,
    listBackHeaderRoute,
    listFrontRoute
} from 'api/blog/route';

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
        ListBackHeaderRoute({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listBackHeaderRoute(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListFrontRoute({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listFrontRoute(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }

    }
};

export default route;
