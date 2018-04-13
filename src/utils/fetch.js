import axios from 'axios';
// import router from '../router';
import Cookies from 'js-cookie';
import router from '../router';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    var jsonString = Cookies.get('USER-INFO');
    if (jsonString) {
        var user = JSON.parse(jsonString);
        config.headers['token'] = user.token;
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(response => {
        if (response.data.code == '403') {
            router.replace({
                path: '/pages/403'
            })
        } else if (response.data.code == '404') {
            router.replace({
                path: '/pages/403'
            })
        } else if (response.data.code == '500') {
            router.replace({
                path: '/pages/500'
            })
        } else if (response.data.success === false) {
            return Promise.reject(response);
        } else {
            return Promise.resolve(response);
        }
    }, error => {
        console.log(error);// for debug
        return Promise.reject(error);
    }
)

export default service;
