import { Layout,Spin} from 'antd';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import menus,{ IMyMenu} from '../../../router/menus';
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
              <Route index element={<item.component />}/>
              <Route path={item.path} element={<item.component />}/>
            </React.Fragment>
          )
        }else{
          return <Route path={item.path} key={item.path} element={<item.component />}/>
        }
      }
    })
  }
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <React.Suspense fallback={ <Spin size='large'/>}>
        <Routes>
          {
            renderRoute(menus)
          }
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </React.Suspense>
    </Content>
  )
}

export default AppMain