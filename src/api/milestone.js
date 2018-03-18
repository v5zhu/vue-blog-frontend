import fetch from 'utils/fetch';

export function recordMilestone(milestone) {
    return fetch({
        url: '/milestone/record.token',
        method: 'post',
        data: milestone
    });
}

export function modifyMilestone(milestone) {
    return fetch({
        url: '/milestone/modify.token',
        method: 'put',
        data: milestone
    });
}

export function deleteMilestone(id) {
    return fetch({
        url: '/milestone/' + id + '.token',
        method: 'delete'
    });
}


export function milestoneList(params) {
    return fetch({
        url: '/milestone/list.open',
        method: 'get',
        params: params
    });
}
