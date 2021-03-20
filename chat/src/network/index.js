import axios from 'axios'
const http = axios.create({
  // baseURL: 'http://localhost:5000/api/admin', //这个按实际情况填写
  baseURL: 'http://106.52.44.186:5000/api/admin',
})
//axios请求拦截器
http.interceptors.request.use(
  (config) => {
    //请求头加上token
    console.log(config);
    console.log(localStorage.token);
    
    if (localStorage.token) {
      console.log('okok');
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default http
