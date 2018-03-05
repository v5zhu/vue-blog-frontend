import Mock from 'mockjs';
import loginAPI from './login';


// 登录相关
Mock.mock(/\/admin\/login/, 'post', loginAPI.loginByEmail);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/admin\/userInfo\.*/, 'get', loginAPI.getInfo)


export default Mock;
