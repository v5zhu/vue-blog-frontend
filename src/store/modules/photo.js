import {
    uploadPhoto,
    getPhotosForPage,
    updatePhoto,
    deletePhoto
} from 'api/blog/photo';

const photo = {
    actions: {
        UploadPhoto({commit, state}, data) {
            return new Promise((resolve, reject) => {
                uploadPhoto(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetPhotosForPage({commit, state}, data) {
            return new Promise((resolve, reject) => {
                getPhotosForPage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        UpdatePhoto({commit, state}, data) {
            return new Promise((resolve, reject) => {
                updatePhoto(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeletePhoto({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deletePhoto(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }

    }
};

export default photo;
