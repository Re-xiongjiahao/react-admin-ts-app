import { Layout,Spin} from 'antd';
import React from 'react';
import { Routes,Route, Navigate, useLocation } from 'react-router-dom';
import menus,{ IMyMenu} from '../../../router/menus';

import { useAppSelector } from '../../../store/hooks'
import { formatArr,getSiderBarMenu,isContainMenus } from '../../../utils/format';
import Error404 from '../../../views/error/Error404'
import NoAuth from '../../../views/error/NoAuth'

const { Content } = Layout;
const AppMain = () => {

  const renderRoute = (menus:IMyMenu[]) => {
    return menus.map(item=>{
      if(item.children){
        return (
          <Route path={item.path} key={item.path} element={<item.component />}>
            {
              renderRoute(item.children)
            }
          </Route>
        )
      }else{
        if(item.index){ // 二级菜单有默认路由显示
          return (
            <React.Fragment key={item.path}>
              {/* <Route index element={<item.component />}/> */}
              <Route index element={ <Navigate to={item.path} /> }/>
              <Route path={item.path} element={<item.component />}/>
            </React.Fragment>
          )
        }else{
          return <Route path={item.path} key={item.path} element={<item.component />}/>
        }
      }
    })
  }

  // 页面权限功能
  // 获取用户状态权限列表
  const checkedkeys = useAppSelector(state => state.user.checkedkeys)
  const adminname = useAppSelector(state => state.user.adminname)
  // checkedkeys ['0-0', '0-1-0', '0-2-0', '0-3-1']

  const newKeys = formatArr(checkedkeys)
  // newKeys ['0-0', '0-1', '0-1-0', '0-2', '0-2-0', '0-3', '0-3-1']
  const newMenus = adminname==='admin'?menus:getSiderBarMenu(menus,newKeys)

  // 判断页面是无权限还是404
  const { pathname } = useLocation()
  const isAuth = isContainMenus(menus,pathname)
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '0px 16px 24px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <React.Suspense fallback={ <Spin size='large'/>}>
        <Routes>
          {
            // renderRoute(menus)
            renderRoute(newMenus)
          }
          <Route path='*' element={isAuth?<NoAuth />:<Error404 />} />
        </Routes>
      </React.Suspense>
    </Content>
  )
}

export default AppMain