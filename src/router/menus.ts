// src/router/menus.ts
import {
  HomeOutlined
} from '@ant-design/icons';
export interface IMyMenu {
  key: string
  label: string
  path: string
  icon: any
  children?: IMyMenu[]
}
const menus = [
  {
    key: '0-0', // 树形控件时需要
    label: '系统首页',
    path: '/',
    icon: HomeOutlined
  },
  {
    key: '0-1',
    label: '轮播图管理',
    path: '/banner',
    icon: HomeOutlined,
    children: [
      {
        key: '0-1-0',
        label: '轮播图列表',
        path: '/banner/list',
        icon: HomeOutlined
      },
      {
        key: '0-1-1',
        label: '添加轮播图',
        path: '/banner/add',
        icon: HomeOutlined,
        hidden: true
      }
    ]
  },
  {
    key: '0-2',
    label: '产品管理',
    path: '/pro',
    icon: HomeOutlined,
    children: [
      {
        key: '0-2-0',
        label: '产品列表',
        path: '/pro/list',
        icon: HomeOutlined
      },
      {
        key: '0-2-1',
        label: '秒杀列表',
        path: '/pro/seckill',
        icon: HomeOutlined
      },
      {
        key: '0-2-2',
        label: '推荐列表',
        path: '/pro/recommend',
        icon: HomeOutlined
      },
      {
        key: '0-2-3',
        label: '筛选列表',
        path: '/pro/search',
        icon: HomeOutlined
      },
    ]
  },
  {
    key: '0-3',
    label: '账户管理',
    path: '/user',
    icon: HomeOutlined,
    children: [
      {
        key: '0-3-0',
        label: '用户管理',
        path: '/user/list',
        icon: HomeOutlined
      },
      {
        key: '0-3-1',
        label: '管理员管理',
        path: '/user/admin',
        icon: HomeOutlined
      }
    ]
  }
]

export default menus