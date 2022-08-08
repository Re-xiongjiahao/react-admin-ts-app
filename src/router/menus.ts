// src/router/menus.ts
import {
  HomeOutlined
} from '@ant-design/icons';
import React from 'react';
export interface IMyMenu {
  key: string
  label: string
  path: string
  icon: any
  index?:boolean
  component:any
  children?: IMyMenu[]
}
const menus: IMyMenu[] = [
  {
    key: '0-0', // 树形控件时需要
    label: '系统首页',
    path: '/',
    icon: HomeOutlined,
    component:React.lazy(()=>import('../views/home/Index'))
  },
  {
    key: '0-1',
    label: '轮播图管理',
    path: '/banner',
    icon: HomeOutlined,
    component:React.lazy(()=>import('../views/banner/Index')),
    children: [
      {
        index:true,
        key: '0-1-0',
        label: '轮播图列表',
        path: '/banner/list',
        icon: HomeOutlined,
        component:React.lazy(()=>import('../views/banner/List'))
      },
      {
        key: '0-1-1',
        label: '添加轮播图',
        path: '/banner/add',
        icon: HomeOutlined,
        component:React.lazy(()=>import('../views/banner/Add'))
      }
    ]
  },
  {
    key: '0-2',
    label: '产品管理',
    path: '/pro',
    icon: HomeOutlined,
    component:React.lazy(()=>import('../views/pro/Index')),
    children: [
      {
        index:true,
        key: '0-2-0',
        label: '产品列表',
        path: '/pro/list',
        icon: HomeOutlined,
        component:React.lazy(()=>import('../views/pro/List'))
      },
      {
        key: '0-2-1',
        label: '秒杀列表',
        path: '/pro/seckill',
        icon: HomeOutlined,
        component:React.lazy(()=>import('../views/pro/Seckill'))
      },
      {
        key: '0-2-2',
        label: '推荐列表',
        path: '/pro/recommend',
        icon: HomeOutlined,
        component:React.lazy(()=>import('../views/pro/Recommend'))
      },
      {
        key: '0-2-3',
        label: '筛选列表',
        path: '/pro/search',
        icon: HomeOutlined,
        component:React.lazy(()=>import('../views/pro/Search'))
      },
    ]
  },
  {
    key: '0-3',
    label: '账户管理',
    path: '/user',
    icon: HomeOutlined,
    component:React.lazy(()=>import('../views/user/Index')),
    children: [
      {
        index:true,
        key: '0-3-0',
        label: '用户管理',
        path: '/user/list',
        icon: HomeOutlined,
        component:React.lazy(()=>import('../views/user/List'))
      },
      {
        key: '0-3-1',
        label: '管理员管理',
        path: '/user/admin',
        icon: HomeOutlined,
        component:React.lazy(()=>import('../views/user/Admin'))
      }
    ]
  },
  {
    key: '0-4',
    path: '/data',
    icon: HomeOutlined,
    label: '数据可视化',
    component: React.lazy(() => import('./../views/data/Index')),
    children: [
      {
        index: true,
        key: '0-4-0',
        path: '/data/echarts',
        icon: HomeOutlined,
        label: 'echarts',
        component: React.lazy(() => import('./../views/data/Echarts')),
      },
      {
        key: '0-4-1',
        path: '/data/antvg2',
        icon: HomeOutlined,
        label: 'antvg2',
        component: React.lazy(() => import('./../views/data/AntvG2')),
      }
    ]
  },
  {
    key: '0-5',
    path: '/editor',
    icon: HomeOutlined,
    label: '编辑器',
    component: React.lazy(() => import('./../views/editor/Index')),
    children: [
      {
        index: true,
        key: '0-5-0',
        path: '/editor/braft',
        icon: HomeOutlined,
        label: '富文本编辑器',
        component: React.lazy(() => import('./../views/editor/Braft')),
      },
      {
        key: '0-5-1',
        path: '/editor/md',
        icon: HomeOutlined,
        label: 'markdown编辑器',
        component: React.lazy(() => import('./../views/editor/Md')),
      },
    ]
  },
  {
    key: '0-6',
    path: '/excel',
    icon: HomeOutlined,
    label: '导入以及导出',
    component: React.lazy(() => import('./../views/excel/Index')),
    children: [
      {
        index: true,
        key: '0-6-0',
        path: '/excel/export',
        icon: HomeOutlined,
        label: '导出',
        component: React.lazy(() => import('./../views/excel/Export')),
      },
      {
        key: '0-6-1',
        path: '/excel/import',
        icon: HomeOutlined,
        label: '导入',
        component: React.lazy(() => import('./../views/excel/Import')),
      },
    ]
  },
  {
    key: '0-7',
    path: '/map',
    icon: HomeOutlined,
    label: '地图',
    component: React.lazy(() => import('./../views/map/Index')),
    children: [
      {
        index: true,
        key: '0-7-0',
        path: '/map/baidu',
        icon: HomeOutlined,
        label: '百度地图',
        component: React.lazy(() => import('./../views/map/Baidu')),
      },
      {
        key: '0-7-1',
        path: '/map/gaode',
        icon: HomeOutlined,
        label: '高德地图',
        component: React.lazy(() => import('./../views/map/Gaode')),
      }
    ]
  }
]

export default menus