import React, { FC, useEffect, useState } from 'react';
import { Table,Image,Switch,Popconfirm,Button,Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import  { getShowData,updateFlag,getCategoryData } from '../../api/pro'

type SeckillListProps = {};

interface DataType {
  brand: string
  category: string
  discount: number
  img1: string
  isrecommend:number
  issale:number
  isseckill:number
  originprice:number
  proid: string
  proname: string
  sales:number
}

const SeckillList: FC<SeckillListProps> = (props) => {
    // 分页器数据
    const[current,setCurrent] = useState(1)
    const[pageSize,setPageSize] = useState(10)
    const [SeckillTotal,setSeckillTotal] = useState(0)

    // 获取商品分类
    const [categoryList,setCategoryList] = useState([])
    const getcateData = async () => {
      const res = await getCategoryData()
      // console.log(res.data.data)
      setCategoryList(res.data.data)
      
    }
    // 组合筛选列表的数据
    function formatCate (categoryList:string[]){
      let arr:any = []
      categoryList.forEach(item=>{
        arr.push({
          text:item,
          value:item
        })
      })
      return arr
    }

    // 获取秒杀列表数据
    const [SeckillList,setSeckillList] = useState([])
    const getSeckillListData = async () =>{
      const res = await getShowData({
        type:'isseckill',flag:1
      })
      console.log(res.data.data)
      setSeckillList(res.data.data)
      setSeckillTotal(res.data.total)
    }
    useEffect(() => {
      getSeckillListData();
      getcateData()
    },[])

    // 筛选的分类数据
    const filterData = formatCate(categoryList)
  // console.log(filterData)


    // 设置表头
  const columns: ColumnsType<DataType> = [
    {
      title:'序号',
      width:60,
      fixed: 'left',
      render:(text,record,index) =>{
        return <span>{(current - 1) * pageSize + index + 1}</span>
      }
    },
    {
      title:'图片',
      width:120,
      dataIndex:'img1',
      align: 'center',
      fixed: 'left',
      render:(text,record,index) =>{
        return (
          <Image
            width={80}
            src={text}
          />
        )
      }
    },
    {
      title:'名称',
      width:210,
      dataIndex:'proname',
      align: 'center',
      fixed: 'left',
      render:(text,record,index) =>{
        return (
          <p>{text}</p>
        )
      }
    },
    {
      title:'品牌',
      width:110,
      dataIndex:'brand',
      align: 'center',
      render:(text,record,index) =>{
        return (
          <p>{text}</p>
        )
      }
    },
    {
      title:'分类',
      width:110,
      dataIndex:'category',
      align: 'center',
      filters:filterData,
      onFilter: (value: any, record) => record.category.indexOf(value) === 0,
      render:(text,record,index) =>{
        return (
          <p>{text}</p>
        )
      }
    },
    {
      title:'原价',
      width:100,
      dataIndex:'originprice',
      align: 'center',
      sorter: (a, b) => a.originprice - b.originprice,
      render:(text,record,index) =>{
        return (
          <p>{text}</p>
        )
      }
    },
    {
      title:'折扣',
      width:100,
      dataIndex:'discount',
      align: 'center',
      sorter: (a, b) => a.discount - b.discount,
      render:(text,record,index) =>{
        return (
          <p>{text}</p>
        )
      }
    },
    {
      title:'销量',
      width:100,
      dataIndex:'sales',
      align: 'center',
      sorter: (a, b) => a.sales - b.sales,
      render:(text,record,index) =>{
        return (
          <p>{text}</p>
        )
      }
    },
    {
      title:'是否秒杀',
      width:60,
      dataIndex:'isseckill',
      align: 'center',
      fixed: 'right',
      render:(text,record,index) =>{
        // console.log(record.proid);
        return (
          <Switch checked={text} onChange={ changeSeckillFlag } className={record.proid} />
        )
      }
    },
    {
      title:'操作',
      width:280,
      align: 'center',
      fixed: 'right',
      render:(text,record,index) =>{
        return (
        <Space>
          <Button type="primary">编辑</Button> | 
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={()=>confirm(record.proid)}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >  
            <Button type="primary" danger>删除</Button>
          </Popconfirm>
        </Space>
        )
      }
    }
  ]

  const confirm =(proid:string) => { // 确定删除
    
  }
  const cancel = () => { // 取消
    
  }

    // 修改是否秒杀
    const changeSeckillFlag = (checked: boolean, event: any)=>{
      console.log(event.target.className.split(' ')[1])
      console.log(String(checked))
      updateFlag({
        proid:event.target.className.split(' ')[1],
        type:'isseckill',
        flag:String(checked)
      }).then((res) => {
        console.log(res)
        getSeckillListData()
      })
    }
    
  return (
    <div>
      <Table
        columns={columns} 
        dataSource={SeckillList}
        rowKey='proid'
        scroll={{y:window.innerHeight - 300}}
        pagination = {{
          position:['bottomRight'],
          showQuickJumper:true,
          current,
          pageSize,
          total:Number(SeckillTotal),
          onChange:(page,pageSize) => {
            setCurrent(page)
            setPageSize(pageSize)
          },
          showTotal:(total) => {
            return <span>共有{total}条数据</span>
          },
          showSizeChanger:true,
          pageSizeOptions:['5','10','15','20']
        }}
      />
    </div>
  )
}

export default SeckillList;