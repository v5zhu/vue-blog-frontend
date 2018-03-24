import axios from 'axios';
import store from '../store';
import vue from 'vue';
// import router from '../router';
import Cookies from 'js-cookie';

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
        if (response.data.success == true) {
            return Promise.resolve(response);
        } else {
            if (response.data.code == '403') {
                return Promise.reject(response);
            } else {
                return Promise.reject(response);
            }
        }
    }, error => {
        console.log(error);// for debug
        return Promise.reject(error);
    }
)

export default service;
