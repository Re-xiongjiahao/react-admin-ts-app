
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState } from 'react';

import { useAppSelector } from '../../../store/hooks'
import menus, { IMyMenu } from '../../../router/menus'
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout

export interface IMenuItem {
  key: string
  label: string
  icon:React.ReactNode
  children?: IMenuItem[]
}

function getMenu(menus:IMyMenu[]){
  const arr:IMenuItem[] = []
  menus.forEach(item=>{
    let obj:IMenuItem = {
      key:'',
      label:'',
      icon:''
    }
    if(item.children){
      obj = {
        key:item.path,
        label:item.label,
        icon:<item.icon />,
        children:getMenu(item.children)
      }
    }else{
      obj = {
        key:item.path,
        label:item.label,
        icon:<item.icon />
      }
    }
    arr.push(obj)
  })
  return arr
}

// 获取所有能展开的一级菜单的 key 值，即有二级菜单的一级
const rootSubmenuKeys:string[] = []

menus.forEach(item=>{
  if(item.children){
    rootSubmenuKeys.push(item.path)
  }
})

const SideBar = () => {
  const items = getMenu(menus)
  // 获取状态管理中的数据
  const collapsed = useAppSelector(state => state.app.collapsed)

  // 获取地址栏信息
  let {pathname} = useLocation()
  // console.log(pathname);
  const [selectedKeys,setSelectedKeys] = useState([pathname])

  // 只展开当前菜单
  const [openKeys, setOpenKeys] = useState(['/'+pathname.split('/')[1]]);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const navigate = useNavigate()
  const changeUrl = ({key}:{key:string}) => {
    // console.log(key);
    setSelectedKeys([key]) // 点击选中哪一项
    navigate(key,{replace:false})
    
  }

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={['1']}
        selectedKeys={selectedKeys}
        items={items}
        onClick={changeUrl}
      />
    </Sider>
  )
}

export default SideBar