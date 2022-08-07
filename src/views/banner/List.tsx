import React, { FC, useEffect, useState } from 'react';
import { Table,Image,Button,Space,Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { getBannerList,deleteBanner} from '../../api/banner'
import { useNavigate } from 'react-router-dom';

type BannerListProps = {};
interface DataType {
  alt:string
  bannerid:string
  flag:boolean
  img:string
  link:string
}

const BannerList: FC<BannerListProps> = (props) => {
  // 分页器数据
  const [current,setCurrent] = useState(1)
  const [pageSize,setPageSize] = useState(5)

  // 获取轮播图列表数据
  const [bannerList,setBannerList] = useState([])
  const getData = async () => {
    const res = await getBannerList()
    // console.log(res.data.data)
    setBannerList(res.data.data)
  }
  useEffect(() => {
    getData()
  },[])


  // 设置表头
  const columns: ColumnsType<DataType> = [
    {
      title:'序号',
      width:100,
      render:(text,record,index) =>{
        return <span>{(current-1) * pageSize + index + 1}</span>
      }
    },
    {
      title:'图片',
      dataIndex:'img',
      align: 'center',
      render:(text,record,index) =>{
        return (<Image
          width={200}
          src={text}
        />)
      }
    },
    {
      title:'链接',
      dataIndex:'link',
      align: 'center',
      render:(text,record,index) =>{
        return ( <span>{text}</span>)
      }
    },
    {
      title:'提示',
      dataIndex:'alt',
      align: 'center',
      render:(text,record,index) =>{
        return ( <span>{text}</span>)
      }
    },
    {
      title:'操作',
      align: 'center',
      render:(text,record,index) =>{
        return (
        <Popconfirm
          title="确定要删除吗?"
          onConfirm={()=>confirm(record.bannerid)}
          onCancel={cancel}
          okText="确定"
          cancelText="取消"
        >  
          <Button type="primary" danger>删除</Button>
        </Popconfirm>
        )
      }
    }
  ]

  // 去添加轮播图页面
  const navigate = useNavigate()
  const toAddBanner= () => {
    navigate('/banner/add',{replace:false})
  }

  // 删除操作
  const confirm = (bannerid:string) => { // 确定删除
    console.log(bannerid)
    deleteBanner({ bannerid }).then(()=>{
      getData()
    })
  }
  const cancel = () => { // 取消删除  
  }
  return (
    <div>
      <Space direction='vertical'>
      <Button type="primary" onClick={ toAddBanner }>添加轮播图</Button>
      <Table 
      columns={columns} 
      dataSource={bannerList}
      rowKey='bannerid'
      scroll={{y:window.innerHeight - 300}}
      pagination = {{
        position:['bottomRight'],
        showQuickJumper:true,
        current,
        pageSize,
        onChange:(page,pageSize) => {
          setCurrent(page)
          setPageSize(pageSize)
        },
        showTotal:(total) => {
          return <span>共有{total}条数据</span>
        },
        showSizeChanger:true,
        pageSizeOptions:['5','10','20','40']
      }}
      />
      </Space>
    </div>
  )
}

export default BannerList;