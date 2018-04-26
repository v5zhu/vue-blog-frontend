import {
    deleteUser,
    getAuthorInfo,
    getInfo,
    listUser,
    login,
    loginByEmail,
    logout,
    modifyPassword,
    modifyUser,
    register,
    sendPhoneCode,
    setUserRole
} from 'api/blog/login';
import Cookies from 'js-cookie';
import LocalStorage from 'utils/LocalStorage';

const user = {
    state: {
        loginUser: null,
        id: '',
        user: '',
        status: '',
        email: '',
        code: '',
        auth_type: '',
        token: Cookies.get('Admin-Token'),
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_LOGIN_USER: (state, loginUser) => {
            state.loginUser = loginUser;
        },
        SET_ID: (state, id) => {
            state.id = id;
        },
        SET_AUTH_TYPE: (state, type) => {
            state.auth_type = type;
        },
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = '';
        }
    },

    actions: {
        Login({commit, state}, data) {
            return new Promise((resolve, reject) => {
                login(data).then(response => {
                    commit("SET_LOGIN_USER", response.data.payload);
                    LocalStorage.setItem("LOGIN-USER", response.data.payload);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        SendPhoneCode({commit, state}, params) {
            return new Promise((resolve, reject) => {
                sendPhoneCode(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        Register({commit, state}, data) {
            return new Promise((resolve, reject) => {
                register(data).then(response => {
                    LocalStorage.setItem("LOGIN-USER", response.data.payload);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        SetUserRole({commit, state}, data) {
            return new Promise((resolve, reject) => {
                setUserRole(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ListUser({commit, state}, params) {
            return new Promise((resolve, reject) => {
                listUser(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        DeleteUser({commit, state}, params) {
            return new Promise((resolve, reject) => {
                deleteUser(params.id).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ModifyUser({commit, state}, data) {
            return new Promise((resolve, reject) => {
                modifyUser(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        ModifyPassword({commit, state}, data) {
            return new Promise((resolve, reject) => {
                modifyPassword(data).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        // 邮箱登录
        LoginByEmail({commit}, userInfo) {
            const email = userInfo.email.trim();
            return new Promise((resolve, reject) => {
                loginByEmail(email, userInfo.password).then(response => {
                    const data = response.data.payload;
                    Cookies.set('Admin-Token', data.token);
                    Cookies.set('USER-ID', data.id);
                    commit('SET_ID', data.id);
                    // console.error(data);

                    commit('SET_TOKEN', data.token);
                    commit('SET_EMAIL', email);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data.payload;
                    commit('SET_ID', data.id);
                    commit('SET_ROLES', data.roles);
                    commit('SET_NAME', data.name);
                    commit('SET_AVATAR', data.avatar);
                    commit('SET_INTRODUCTION', data.introduction);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 获取用户信息
        AuthorInfo({commit, state}, params) {
            return new Promise((resolve, reject) => {
                getAuthorInfo(params).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 第三方验证登录
        LoginByThirdparty({commit, state}, code) {
            return new Promise((resolve, reject) => {
                commit('SET_CODE', code);
                loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
                    commit('SET_TOKEN', response.data.token);
                    Cookies.set('Admin-Token', response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 登出
        LogOut({commit, state}, params) {
            return new Promise((resolve, reject) => {
                logout(params).then(res => {
                    commit("SET_LOGIN_USER", null);
                    LocalStorage.setItem("LOGIN-USER", res.data.payload);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                Cookies.remove('Admin-Token');
                resolve();
            });
        },

        // 动态修改权限
        ChangeRole({commit}, role) {
            return new Promise(resolve => {
                commit('SET_ROLES', [role]);
                commit('SET_TOKEN', role);
                Cookies.set('Admin-Token', role);
                resolve();
            })
        }
    }
};

export default user;
