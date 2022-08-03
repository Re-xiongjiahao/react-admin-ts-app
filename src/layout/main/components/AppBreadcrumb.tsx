import React, { FC } from 'react';
import { Breadcrumb } from 'antd'
import { Link,useLocation } from 'react-router-dom'
import menus,{ IMyMenu } from '../../../router/menus';

const breadcrumbNameMap: Record<string, string> = {}

function getData(menus: IMyMenu[]){ // 处理数据
  menus.forEach(item =>{
    if(item.children){
      breadcrumbNameMap[item.path] = item.label
      getData(item.children)
    }else{
      breadcrumbNameMap[item.path] = item.label
    }
  })
}
getData(menus)

type AppBreadcrumbProps = {};

const AppBreadcrumb: FC<AppBreadcrumbProps> = (props) => {

  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div className='demo'>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  )
}

export default AppBreadcrumb;