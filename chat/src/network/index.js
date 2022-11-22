import axios from 'axios'
import router from '../router/index'
import Vue from 'vue'
import store from '@/store/index'
const IS_PROD = process.env.NODE_ENV === "production";
const IS_SVR = process.env.VUE_APP_PROJECT_ENV === 'svr'
const http_baseURL = (IS_PROD || IS_SVR) ? 'http://39.103.233.82:14399/api/admin' : '/api/admin'
const moment_baseURL = (IS_PROD || IS_SVR) ? 'http://150.158.191.140:5389' : '/moments'
const oss_baseURL = (IS_PROD || IS_SVR) ? 'http://39.103.233.82:14400/oss' : '/oss'

const TIMEOUT = 5000;

const http = axios.create({
    // baseURL: '/api/admin', //这个按实际情况填写
    baseURL: http_baseURL,
    headers: { 'Cache-Control': 'no-cache' },
    timeout: TIMEOUT, 
})
const moments = axios.create({
    // baseURL: '/moments', //这个按实际情况填写
    baseURL: moment_baseURL,
})
const oss = axios.create({
    baseURL: oss_baseURL
})
const error = err => {
    switch (err.response && err.response.status) {
        // 对得到的状态码的处理，具体的设置视自己的情况而定
        case 400:
            Vue.prototype.$message.error('密码错误')
            break
        case 401:
            Vue.prototype.$message.error('未登录，请登录')
            router.replace('/login')
            break
        case 403:
            Vue.prototype.$message.error('登录状态已失效，请重新登录')
            router.replace('/login')
            break
        case 422:
            Vue.prototype.$message.error('用户不存在, 请注册!')
            break
        case 423:
            Vue.prototype.$message.error('该用户名称已被注册!')
            break
        case 424:
            Vue.prototype.$message.error('你已经在别处登录了!')
            break
        // case ...
        default:
            console.log('其他错误')
            break
    }
    return Promise.reject(err)
}

//axios请求拦截器
http.interceptors.request.use(
    (config) => {
        //请求头加上token
        if (localStorage.token) {
            config.headers.Authorization = localStorage.token
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)
//axios请求拦截器
moments.interceptors.request.use(
    (config) => {
        console.log(config);
        const { type } = store.state.myInfo || {}
        if (type === 'visitor' && (config.url === '/comment' || config.url === '/like')) {
            Vue.prototype.$message.error('游客限制朋友圈功能!')
            return Promise.reject(new Error('游客限制朋友圈功能'))
        }
        //请求头加上token
        if (localStorage.token) {
            config.headers.Authorization = localStorage.token
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)
oss.interceptors.request.use(
    (config) => {
        //请求头加上token
        if (localStorage.token) {
            config.headers.Authorization = localStorage.token
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)
oss.interceptors.response.use(res => {
    // 成功响应的拦截
    return Promise.resolve(res)
}, error)
http.interceptors.response.use(res => {
    // 成功响应的拦截
    return Promise.resolve(res)
}, error)
moments.interceptors.response.use(res => {
    // 成功响应的拦截
    return Promise.resolve(res)
}, error)


export default {
    http,
    moments
}
export { http, moments, oss }
