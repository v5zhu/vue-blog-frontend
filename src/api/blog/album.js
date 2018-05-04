import fetch from 'utils/fetch';

const prefix = '/blog';

export function addAlbum(data) {
    return fetch({
        url: prefix + '/album.token',
        method: 'post',
        data: data
    });
}


export function getAlbumsForPage(data) {
    return fetch({
        url: prefix + '/album/page/list.token',
        method: 'post',
        data: data
    });
}

export function updateAlbum(data) {
    return fetch({
        url: prefix + '/album.token',
        method: 'put',
        data: data
    });
}

export function deleteAlbum(params) {
    return fetch({
        url: prefix + '/album/delete.token',
        method: 'delete',
        params: params
    });
}

