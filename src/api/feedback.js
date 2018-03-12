import fetch from 'utils/fetch';

export function addFeedback(feedback) {
    return fetch({
        url: '/feedback',
        method: 'post',
        data: feedback
    });
}
