import React, { FC, useEffect, useState } from 'react';
import { Table,Image,Switch,Popconfirm,Button,Space } from 'antd';
import  { getProList,getCategoryData,updateFlag } from '../../api/pro'
// import type {IUpdateFlag} from '../../api/pro'
import type { ColumnsType } from 'antd/es/table';

type ProListProps = {};

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

const ProList: FC<ProListProps> = (props) => {
  // 分页器数据
  const[current,setCurrent] = useState(1)
  const[pageSize,setPageSize] = useState(10)
  const [proTotal,setProTotal] = useState(0)

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

  // 获取商品列表数据
  const [ProList,setProList] = useState([])
  const getListData = async () =>{
    const res = await getProList({
      count:current,limitNum:pageSize
    })
    // console.log(res.data)
    setProTotal(res.data.total)
    setProList(res.data.data)
  }
  useEffect(() => {
    getListData();
    getcateData();
  },[])

  useEffect(() => {
    getListData();
  },[current,pageSize])
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
      title:'是否售卖',
      width:60,
      dataIndex:'issale',
      align: 'center',
      fixed: 'right',
      render:(text,record,index) =>{
        return (
          <Switch checked={text} onChange={ changeSaleFlag } className={record.proid}/>
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
      title:'是否推荐',
      width:60,
      dataIndex:'isrecommend',
      align: 'center',
      fixed: 'right',
      render:(text,record,index) =>{
        return (
          <Switch checked={text} onChange={ changeRecommendFlag } className={record.proid} />
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

  // 修改是否在售
  const changeSaleFlag = (checked: boolean, event: any)=>{
    console.log(event.target.className.split(' ')[1])
    console.log(checked)
    updateFlag({
      proid:event.target.className.split(' ')[1],
      type:'issale',
      flag:String(checked)
    }).then((res) => {
      console.log(res)
      getListData()
    })
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
      getListData()
    })
  }

  // 修改是否推荐
  const changeRecommendFlag = (checked: boolean, event: any)=>{
    console.log(event.target.className.split(' ')[1])
    console.log(String(checked))
    updateFlag({
      proid:event.target.className.split(' ')[1],
      type:'isrecommend',
      flag:String(checked)
    }).then((res) => {
      console.log(res)
      getListData()
    })
  }
  return (
    <div>
      <Table
        columns={columns} 
        dataSource={ProList}
        rowKey='proid'
        scroll={{y:window.innerHeight - 300}}
        pagination = {{
          position:['bottomRight'],
          showQuickJumper:true,
          current,
          pageSize,
          total:Number(proTotal),
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

export default ProList;