import axios from 'axios'
import router from '../router/index'
import Vue from 'vue'
const http = axios.create({
  // baseURL: '/oss', //这个按实际情况填写
  baseURL: 'http://39.103.233.82:19000/oss',
})
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
http.interceptors.response.use(res => {
  // 成功响应的拦截
  return Promise.resolve(res)
}, err => {
  switch (err.response.status) {
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
    // case ...
    default:
      console.log('其他错误')
      break
  }
  return Promise.reject(res)
}
)
export default http
