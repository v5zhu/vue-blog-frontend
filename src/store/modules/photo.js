import {
    uploadPhoto,
    getPhotosForPage
} from 'api/blog/photo';

const image = {
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
        }
    }
};

export default image;
