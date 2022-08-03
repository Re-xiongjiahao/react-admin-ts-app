import request from '../utils/request'

export interface ILogin {
  adminname: string
  password: string
}

export function adminLoginFn(params:ILogin){
  return request({
    url:'/admin/login',
    method: 'POST',
    data: params
  })
}