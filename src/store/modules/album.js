import {
    addAlbum,
    getAlbumsForPage,
    updateAlbum,
    deleteAlbum
} from 'api/blog/album';

const album = {
    actions: {
        AddAlbum({commit, state}, data) {
            return new Promise((resolve, reject) => {
                addAlbum(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetAlbumsForPage({commit, state}, data) {
            return new Promise((resolve, reject) => {
                getAlbumsForPage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        UpdateAlbum({commit, state}, data) {
            return new Promise((resolve, reject) => {
                updateAlbum(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeleteAlbum({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deleteAlbum(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }

    }
};

export default album;
