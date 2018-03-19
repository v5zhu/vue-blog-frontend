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


export function switchTaskStatus(taskId) {
    return fetch({
        url: 'admin/task/' + taskId + '/status.token',
        method: 'put'
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

export function getClassFullName() {
    return fetch({
        url: 'admin/mfxcomponent/fullname.token',
        method: 'get'
    });
}

export function listClassMethods() {
    return fetch({
        url: 'admin/mfxcomponent/{beanName}/methods.token',
        method: 'get'
    });
}




