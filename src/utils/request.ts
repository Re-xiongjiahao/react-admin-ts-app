import axios, { AxiosRequestConfig } from 'axios'

// 判断环境
const isDev = process.env.NODE_ENV === 'development'

// http://121.89.205.189:3001/admindoc/
const ins  = axios.create({
  baseURL:isDev ? 'http://121.89.205.189:3001/admin' : 'http://121.89.205.189:3001/admin',
  timeout:6000
})

// 拦截器
ins.interceptors.request.use((config) => {
  // 携带token到请求头
  config.headers && (config.headers.token = localStorage.getItem('token')|| '')
  return config
},(error) => {
  Promise.reject(error)
})

ins.interceptors.response.use((response) => {
  // 校验token信息
  if(response.data.code === '10119'){
    // token 无效（没传，或者过期）
    // 跳转到登录页面
    window.location.href = '/login'
  }
  return response
},(error) => {
  Promise.reject(error)
})

// 自定义各种数据请求 axios({})
export default function request(config:AxiosRequestConfig){
  const { url = '', method = 'GET', data = {}, headers = {} } = config
  switch (method.toUpperCase()) {
    case 'GET':
      return ins.get(url, { params: data })
    case 'POST':
      // 表单提交  application/x-www-form-url-encoded
      if (headers['content-type'] === 'application/x-www-form-url-encoded') {
        // 转参数 URLSearchParams/第三方库qs
        const p = new URLSearchParams()
        for (const key in data) {
          p.append(key, data[key])
        }
        return ins.post(url, p, { headers })
      }
      // 文件提交  multipart/form-data
      if (headers['content-type'] === 'multipart/form-data') {
        const p = new FormData()
        for (const key in data) {
          p.append(key, data[key])
        }
        return ins.post(url, p, { headers })
      }
      // 默认 application/json
      return ins.post(url, data)
    case 'PUT': // 修改数据 --- 所有的数据的更新
      return ins.put(url, data)
    case 'DELETE': // 删除数据
      return ins.delete(url, { data })
    case 'PATCH': // 更新局部资源
      return ins.patch(url, data)
    default:
      return ins(config)
  }
}