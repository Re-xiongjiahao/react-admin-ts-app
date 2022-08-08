import React, { FC, useEffect, useState } from 'react';
import { Space,Table,Button,Tag,Popconfirm,Modal,Input,Select,Tree} from 'antd'
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import {AxiosResponse} from 'axios'
import type { DataNode } from 'antd/es/tree';
import {
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { addAdmin, deleteAdmin, getAdminList,IAddAdminParams, updateAdmin } from '../../api/admin';
import menus, { IMyMenu} from '../../router/menus'
import ExportJsonExcel from 'js-export-excel'

type ExportProps = {};
interface DataType {
  adminid: string
  adminname: string
  password: string
  role: number
  checkedKeys:string[]
}
export interface ITreeItem {
  key:string
  title:string
  children?:ITreeItem[]
}
const { Option } = Select;

function getTreeData (menus:IMyMenu[]){
  const arr: ITreeItem[] = []
  menus.forEach(item=>{
    let obj:ITreeItem ={
      key:'',
      title:''
    }
    if(item.children){
      obj = {
        key:item.key,
        title:item.label,
        children:getTreeData(item.children)
        }
      } else {
        obj = {
          key:item.key,
          title:item.label
        }
      }
      arr.push(obj)
    })
  return arr
}
const treeData: DataNode[] = getTreeData(menus)

const Export: FC<ExportProps> = (props) => {
  // 分页器数据
  const [current,setCurrent] = useState(1)
  const [pageSize,setPageSize] = useState(10)

  // 共用模态框状态标识
  const [type,setType] = useState('')

  //获取管理员列表数据
  const [adminList,setAdminList] = useState([])
  const getData = async ()=>{
    const res = await getAdminList()
    // console.log(res.data.data)
    setAdminList(res.data.data)
  }
  useEffect(() => {
    getData()
  },[])

  // 单条删除操作
  const confirm = (adminid:string) => { // 确定删除
    // console.log(adminid)
    deleteAdmin({ adminid }).then(()=>{
      getData()
    })
  }
  const cancel = () => { // 取消删除  
  }

  // 批量删除
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const deleteSelectData = () => {
    const arr:Promise<AxiosResponse<any, any>>[] = []
    selectedRowKeys.forEach(item =>{
      arr.push(deleteAdmin({ adminid: String(item)}))
    })
    Promise.all(arr).then(() => {
      getData()
    })
  }

  // 设置表头
  const columns:ColumnsType<DataType> = [
    {
      title:'序号',
      render:(text,record,index)=>{
        return <span>{ (current-1) * pageSize + index + 1}</span>
      }
    },
    {
      title:'管理员账户',
      dataIndex:'adminname'
    },
    {
      title:'管理员权限',
      dataIndex:'role',
      render:(text,record,index)=>{
        return (
          text>1 ? <Tag color='volcano'>超级管理员</Tag> : <Tag color='purple'>管理员</Tag>
        )      
      }
    },
    {
      title: '操作',
      align: 'center',
      render:(text,record,index)=>{
        return(
          <Space>
            <Button type="primary" shape="circle" onClick={ ()=>updateAdminFn(record)} icon={<EditOutlined />} />
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={()=>confirm(record.adminid)}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >  
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 模态框的表单信息
  const [adminname, setAdminname] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(1)
  const [checkedKeys, setCheckedKeys] = useState(['0-0'])
  const onCheck = (checkedKeysValue: any) => {
    // console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  // 添加操作模态框
  const [isModalVisible, setIsModalVisible] = useState(false);
  const addAdminModal = () => { 
    setType('add')
    setIsModalVisible(true)
  }
  const handleOk = () => { // 确定
    type==='add'?
    addAdmin({
      adminname, password,role,checkedKeys
    }).then(() => {
      getData()
      setAdminname('')
      setPassword('')
      setRole(1)
      setCheckedKeys(['0-0'])
      setIsModalVisible(false)
    }) :
    updateAdmin({
      adminname,role,checkedKeys
    }).then(() => {
      getData()
      setAdminname('')
      setPassword('')
      setRole(1)
      setCheckedKeys(['0-0'])
      setIsModalVisible(false)
    })
  }
  const handleCancel = () => { // 取消
    setIsModalVisible(false);
  }

  // 编辑账户信息
  const updateAdminFn = (record:IAddAdminParams) => {
    setType('update')
    setIsModalVisible(true)
    setAdminname(record.adminname)
    setRole(record.role)
    setCheckedKeys(record.checkedKeys)
  }

  // 导出数据
  const exportExcel = () => {
    var option:any = {};
    
    option.fileName = "管理员数据"; // 导出的文件的名称
    
    option.datas = [
      {
        sheetData:adminList, //表格数据
        sheetName: "管理员列表", // excel中表格的名字
        sheetFilter: ["adminname", "password", "role"], // 需要导出的数据字段
        sheetHeader: ["管理员账户", "密码","管理员权限"], // 表头的值
        columnWidths: [20, 20],
      }
    ];
    
    var toExcel = new ExportJsonExcel(option); //new
    toExcel.saveExcel(); //保存
  }

  return (
    <Space direction='vertical' style={{width: '100%'}}>
      <Space>
        <Button type='primary' onClick={ addAdminModal }>添加管理员</Button>
        <Button type='primary' onClick={ exportExcel }>导出数据</Button>
        {
          selectedRowKeys.length > 0 ? <Button type='primary' danger onClick={ deleteSelectData}>批量删除</Button> :null
        }
      </Space>
      <Table 
      rowSelection={rowSelection}
      columns={columns} 
      dataSource={adminList}
      rowKey = 'adminid'
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
      <Modal 
        title={ type==='add'? "添加管理员" :'更新数据'}
        okText={ type==='add'? "添加" : '更新'}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}>
        <Space direction='vertical' style={{width:'100%'}}>
          <Input placeholder="请输入管理员账号" readOnly={type=== 'update'} value={adminname} onChange={ e=>setAdminname(e.target.value)} />
          {
            type==='add' && <Input placeholder='密码'value={password} onChange={ e=>setPassword(e.target.value)}/>
          }
          <Select defaultValue={1} style={{width:'100%'}} value={role} onChange={value=>setRole(value)}>
            <Option value={1}>管理员</Option>
            <Option value={2}>超级管理员</Option>
          </Select>
          <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
            defaultExpandAll
          />
        </Space>
      </Modal>
    </Space>
  )
}

export default Export;