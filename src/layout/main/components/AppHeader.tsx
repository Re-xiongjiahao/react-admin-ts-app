import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined
} from '@ant-design/icons';
import React from 'react';
import { Layout,Dropdown,Space,Menu} from 'antd';
import { changeCollapsed } from '../../../store/modules/app';
import { useAppDispatch,useAppSelector} from '../../../store/hooks'
import { useLocation, useNavigate } from 'react-router-dom';
import { changeAdminname, changeCheckedkeys, changeLoginState, changeRole, changeToken } from '../../../store/modules/user';
const { Header } = Layout

const AppHeader = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const collapsed = useAppSelector(state=>state.app.collapsed)
  const adminname = useAppSelector(state=>state.user.adminname)
  const dispatch = useAppDispatch() // 触发 状态管理器
  const navigate = useNavigate()
  const { pathname } = useLocation() // 记录当前页面的地址

  const changeUrl = ( {key} : {key:string}) => {
    // console.log(key)
    if(key === '0'){
      // 跳转到设置页面
      navigate('/setting',{replace:false})
    }else{
      // 退出
      localStorage.clear()
      dispatch(changeLoginState(false))
      dispatch(changeAdminname(''))
      dispatch(changeRole(1))
      dispatch(changeCheckedkeys([]))
      dispatch(changeToken(''))
      // 携带当前页面的地址信息并且跳转到登录页面
      navigate('/login?redirect='+pathname,{replace:true})
    }
  }

  const menu = (
    <Menu
      onClick={ changeUrl }
      items={[
        {
          label: '设置',
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: '退出',
          key: '1',
        },
      ]}
    />
  );

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
      <div style={{ float:'right',paddingRight:16}}>
        <Dropdown overlay={menu} trigger={['click']}>
          <span>
          <Space>
              您好，{ adminname }
              <DownOutlined />
            </Space>
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default AppHeader