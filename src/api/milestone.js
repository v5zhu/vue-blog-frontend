import fetch from 'utils/fetch';

export function recordMilestone(milestone) {
    return fetch({
        url: '/milestone/record.token',
        method: 'post',
        data: milestone
    });
}
