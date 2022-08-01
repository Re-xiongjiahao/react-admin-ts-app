
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../../store/hooks'
import menus, { IMyMenu } from '../../../router/menus'

export interface IMenuItem {
  key: string
  label: string
  children?: IMenuItem[]
}
const { Sider } = Layout

function getMenu(menus:IMyMenu[]){
  const arr:IMenuItem[] = []
  menus.forEach(item=>{
    let obj:IMenuItem = {
      key:'',
      label:''
    }
    if(item.children){
      obj = {
        key:item.path,
        label:item.label,
        children:getMenu(item.children)
      }
    }else{
      obj = {
        key:item.path,
        label:item.label
      }
    }
    arr.push(obj)
  })
  return arr
}

const SideBar = () => {
  const items = getMenu(menus)
  // 获取状态管理中的数据
  const collapsed = useAppSelector(state => state.app.collapsed)

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </Sider>
  )
}

export default SideBar