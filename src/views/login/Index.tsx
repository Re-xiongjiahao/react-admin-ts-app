import React, { FC, useCallback } from 'react';
import { Form,Input,Button, message } from 'antd'
import { UserOutlined,LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

import { ILogin } from '../../api/user';
import { adminLoginFn} from '../../api/user'

import { useAppDispatch } from '../../store/hooks'
import {
  changeAdminname,
  changeLoginState,
  changeRole,
  changeCheckedkeys,
  changeToken
} from '../../store/modules/user'

type LoginProps = {};

const Login: FC<LoginProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onFinish = useCallback((values:ILogin) => {
    // console.log(values);
    adminLoginFn(values).then(res=>{
      // console.log(res.data);
      if(res.data.code === '10005'){
        message.error('该管理员账户不存在')
      }else if(res.data.code === '10003'){
        message.warning('密码错误')
      }else{
        message.success('登录成功')
        localStorage.setItem('adminname', res.data.data.adminname)
        localStorage.setItem('checkedkeys', JSON.stringify(res.data.data.checkedkeys))
        localStorage.setItem('role',String(res.data.data.role))
        localStorage.setItem('token', res.data.data.token)
        localStorage.setItem('loginState','true')

        // 修改状态管理器中的数据
        dispatch(changeLoginState(true))
        dispatch(changeAdminname(res.data.data.adminname))
        dispatch(changeCheckedkeys(res.data.data.checkedkeys))
        dispatch(changeRole(res.data.data.role))
        dispatch(changeToken(res.data.data.token))

        // 跳转到系统首页
        navigate('/',{replace:true})
      }
    })
  },[navigate,dispatch])
  return (
    <div className='loginBox'>
      <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="adminname"
        rules={[{ required: true, message: '请输入你的账号!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="管理员账号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入你的密码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="管理员密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登 录
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default Login;