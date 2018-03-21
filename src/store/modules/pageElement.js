import {
    addPageElement,
    deletePageElement,
    editPageElement,
    listPageElement,
    listPageElementsByRoute
} from 'api/pageElement';

const pageElement = {
    actions: {
        ListPageElementsByRoute({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listPageElementsByRoute(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListPageElement({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listPageElement(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        AddPageElement({commit, state}, data) {
            return new Promise((resolve, reject) => {
                addPageElement(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        EditPageElement({commit, state}, data) {
            return new Promise((resolve, reject) => {
                editPageElement(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeletePageElement({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deletePageElement(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default pageElement;
