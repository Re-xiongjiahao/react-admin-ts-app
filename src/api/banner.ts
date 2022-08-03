import request from "../utils/request";

export interface IBanner {
  img: string
  alt: string
  link: string
}

// 查看轮播图数据
export function getBannerList(){
  return request({
    url:'banner/list'
  })
}
// 添加轮播图数据
export function addBanner(params:IBanner){
  return request({
    url:'banner/add',
    method:'POST',
    data: params
  })
}
// 删除轮播图数据
export function deleteBanner(params: { bannerid: string }){
  return request({
    url:'banner/delete',
    data: params
  })
}