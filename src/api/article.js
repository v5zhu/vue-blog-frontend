import fetch from 'utils/fetch';

/*ндубapi start*/
export function articleList(token) {
    return fetch({
        url: '/admin/article/list',
        method: 'get',
        params: {token}
    });
}

/*ндубapi end*/

