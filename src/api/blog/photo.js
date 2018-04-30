import fetch from 'utils/fetch';

const prefix = '/blog';

export function uploadPhoto(data) {
    return fetch({
        url: prefix + '/photo/upload.token',
        method: 'post',
        data: data
    });
}


export function getPhotosForPage(data) {
    return fetch({
        url: prefix + '/photo/page/list.token',
        method: 'post',
        data: data
    });
}

