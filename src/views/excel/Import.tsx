import React, { FC, useRef, useState } from 'react';
import * as XLSX from 'xlsx'
import { Space, Table, Button } from 'antd'
import type { ColumnsType } from 'antd/lib/table';

type ImportProps = {};
interface DataType {
  proid: string
  proname: string
  originprice: number
  img1: string
}

const Import: FC<ImportProps> = (props) => {
  const [proList,setProList] = useState()
  const fileRef = useRef<any>()
  const importExcel = () => {
    const file = fileRef.current.files[0]
    const reader = new FileReader()
    reader.readAsBinaryString(file) // 转换成 二进制格式
    reader.onload = function(){
      const workbook = XLSX.read(this.result,{ type: 'binary' })
      const  t = workbook.Sheets['工作表1'] // 拿到表格数据
      console.log(t)
      const r: any = XLSX.utils.sheet_to_json(t) // 转换成json格式
      console.log(r)
      setProList(r)
      // 将r的数据上传至服务器
    }
  }

  const Columns:ColumnsType<DataType> = [
    {
      title:'序号',
      render (text,record,index){
        return <span>{index+1}</span>
      }
    },
    {
      title: '产品名称',
      dataIndex: 'proname'
    },
    {
      title: '产品价格',
      dataIndex: 'originprice',
      sorter: (a, b) => a.originprice - b.originprice
    },
    {
      title:'图片',
      dataIndex:'img1',
      render(text){
        return <img src={text} style= {{ height: 60 }} alt="" />
      }
    }
  ]

  const importBtnClick = ()=>{
    fileRef.current.click()
  }

  return (
    <Space direction='vertical' style={{width:'100%'}}>
      <Button onClick={ importBtnClick }>导入数据</Button>
      <input type="file" hidden ref= {fileRef} onChange={importExcel}/>
      <Table dataSource={proList} columns={Columns} rowKey="proid"/>
    </Space>
  )
}

export default Import;