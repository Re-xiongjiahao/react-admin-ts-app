import request from '../utils/request'

export interface IGetProList {
  count:number
  limitNum:number
}

export interface IGetShowData{
  type:string
  flag:number
}

export interface IGetSearchData{
  category:string
  search:string
}

export interface IUpdateFlag{
  proid: string
  type:string
  flag:string
}

// 获取商品列表
export function getProList (params:IGetProList){
  return request({
    url:'/pro/list',
    data:params
  })
}

// 获取秒杀或者推荐的列表
export function getShowData (params:IGetShowData){
  return request({
    url:'/pro/showdata',
    method:'POST',
    data:params
  })
}

// 获取商品的分类
export function getCategoryData (){
  return request({
    url:'/pro/getCategory',
  })
}

// 获取商品的详情
export function getDetailData (params:{proid: string}){
  return request({
    url:'/pro/detail',
    data:params
  })
}

// 获取筛选商品
export function getSearchData (params:IGetSearchData){
  return request({
    url:'/pro/searchPro',
    method:'POST',
    data:params
  })
}

// 修改商品是否推荐或者秒杀
export function updateFlag (params:IUpdateFlag){
  return request({
    url:'/pro/updateFlag',
    method:'POST',
    data:params
  })
}