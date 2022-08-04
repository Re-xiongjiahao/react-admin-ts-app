import request from '../utils/request'

export interface IAddAdminParams {
  adminname: string
  password?: string
  role:number
  checkedKeys:string[]
}

export function getAdminList(){
  return request({
    url:'/admin/list'
  })
}

export function addAdmin (params:IAddAdminParams){
  return request({
    url:'/admin/add',
    method: 'POST',
    data: params
  })
}

export function deleteAdmin (params:{adminid:string}){
  return request({
    url:'/admin/delete',
    method:'POST',
    data: params
  })
}

export function updateAdmin (params:IAddAdminParams){
  return request({
    url:'/admin/update',
    method: 'POST',
    data:params
  })
}