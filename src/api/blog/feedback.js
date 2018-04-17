import fetch from 'utils/fetch';

const prefix = '/blog';

export function addFeedback(feedback) {
    return fetch({
        url: prefix + '/feedback',
        method: 'post',
        data: feedback
    });
}
