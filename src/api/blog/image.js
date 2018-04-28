import fetch from 'utils/fetch';

const prefix = '/blog';

export function uploadImage(data) {
    return fetch({
        url: prefix + '/image/upload.token',
        method: 'post',
        data: data
    });
}


export function getImagesForPage(data) {
    return fetch({
        url: prefix + '/image/page/list.token',
        method: 'post',
        data: data
    });
}

