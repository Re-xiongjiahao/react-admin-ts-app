import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Layout} from 'antd';
import { changeCollapsed } from '../../../store/modules/app';
import { useAppDispatch,useAppSelector} from '../../../store/hooks'
const { Header } = Layout

const AppHeader = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const collapsed = useAppSelector(state=>state.app.collapsed)
  const dispatch = useAppDispatch() // 触发 状态管理器
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => {
          localStorage.setItem('collapsed', String(!collapsed));
          dispatch(changeCollapsed(!collapsed))
        }
      })}
    </Header>
  )
}

export default AppHeader