import fetch from 'utils/fetch';

export function archives(params) {
    var year = params.year;
    var month = params.month;
    var url = '/archives';
    if (year && month) {
        url += '/' + year + '/' + month;
    }
    return fetch({
        url: url,
        method: 'get',
        params: params
    });
}

