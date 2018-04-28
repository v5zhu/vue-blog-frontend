import {
    uploadImage,
    getImagesForPage
} from 'api/blog/image';

const image = {
    actions: {
        UploadImage({commit, state}, data) {
            return new Promise((resolve, reject) => {
                uploadImage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetImagesForPage({commit, state}, data) {
            return new Promise((resolve, reject) => {
                getImagesForPage(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};

export default image;
