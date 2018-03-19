import fetch from 'utils/fetch';


export function listTask(params) {
    return fetch({
        url: '/admin/tasks.token',
        method: 'get',
        params: params
    });
}

export function addTask(data) {
    return fetch({
        url: '/admin/task.token',
        method: 'post',
        data: data
    });
}


export function editTask(data) {
    return fetch({
        url: '/admin/task/edit.token',
        method: 'put',
        data: data
    });
}


export function switchTaskStatus(params) {
    return fetch({
        url: 'admin/task/' + params.id + '/status.token',
        method: 'put',
        params: {cmd: params.cmd}
    });
}

export function deleteTask(taskId) {
    return fetch({
        url: 'admin/task/delete/' + taskId + '.token',
        method: 'delete'
    });
}


export function listComponentsName() {
    return fetch({
        url: 'admin/mfxcomponent/list.token',
        method: 'get'
    });
}

export function getClassFullName(params) {
    return fetch({
        url: 'admin/mfxcomponent/fullname.token',
        method: 'get',
        params: params
    });
}

export function listClassMethods(params) {
    return fetch({
        url: 'admin/mfxcomponent/methods.token',
        method: 'get',
        params: params
    });
}




