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
        url: prefix + '/album/photo/page/list.token',
        method: 'post',
        data: data
    });
}

export function updatePhoto(data) {
    return fetch({
        url: prefix + '/photo/update.token',
        method: 'put',
        data: data
    });
}

export function deletePhoto(params) {
    return fetch({
        url: prefix + '/photo/delete.token',
        method: 'delete',
        params: params
    });
}

