// utils/format.ts
// ['0-0', '0-1-1', '0-2', '0-2-2', '0-3-0-1'] ===>  
// ['0-0', '0-1', '0-1-1', '0-2', '0-2-2', '0-3', '0-3-0', '0-3-0-1']

import { IMyMenu } from "../router/menus"

export const formatArr = (arr: string[]) => {
  const result = arr.reduce((_arr, item) => [..._arr, ...sliceStr(item)], ['0-0'])
  return [...new Set(result)].sort()
}
const sliceStr = (str: string) => { // 0-1-1
  if (str.split('-').length > 2) {// 至少为2级菜单
    return str.split('-').reduce((_arr, item): any => {
      if (!Array.isArray(_arr)) return [`${_arr}-${item}`]
      return [`${_arr[0]}-${item}`, ..._arr]
    })
  }
  return [str]
}

// 提取合适的menus数据
// 获取左侧的菜单栏数据
export function getSiderBarMenu (menus: IMyMenu[], checkedKeys: string[]) {// checkedKeys 处理之后的key数组
  let arr: IMyMenu[] = []
  checkedKeys.forEach(item => { // 0-1
    menus.forEach(value => {
      if(value.key === item) {
        // arr.push({...value}) // 。。。或者Object.assign只能拷贝第一层级的对象的数据
        arr.push(Object.assign({}, value))
      }
    })
  })
  // 搞定第二层级
  arr.forEach(item => {
    if(item.children) {
      let newArr = getSiderBarMenu(item.children, checkedKeys)
      item.children = newArr
    }
  })
  return arr
}

export function isContainMenus (menus: IMyMenu[], pathname: string) {
  let bool = menus.some(item => {
    if (item.children) {
      if (item.path === pathname) {
        return true
      } else {
        return item.children.some(it => it.path === pathname)
      }
    } else {
      return item.path === pathname
    }
  })
  
  return bool
}