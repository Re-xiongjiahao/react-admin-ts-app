import React, { FC, useState } from 'react';
import { LoadingOutlined,PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Upload,
  message
} from 'antd'
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { addBanner } from '../../api/banner'
import { useNavigate } from 'react-router-dom';

type BannerAddProps = {};


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请上传jpg或者PNG格式的文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 4;
  if (!isLt2M) {
    message.error('图片大小不能超过 4MB!');
  }
  return isJpgOrPng && isLt2M;
};

const BannerAdd: FC<BannerAddProps> = (props) => {
  const [link,setLink] = useState('')
  const [alt,setAlt] = useState('')
  const [img,setImg] = useState('')

  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImg(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
    );

    // 上传轮播图
    const navigate = useNavigate()
    const uploadBanner = () => {
      // 发送请求
      addBanner({
        img,alt,link
      }).then(res=>{
        if(res.data.code==='200'){
          message.success('添加轮播图成功！')
          navigate('/banner/list',{replace:true})
        }else{
          message.error('添加失败')
        }
      })
    }
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="链接">
          <Input value={link} placeholder='链接' onChange={ e => setLink(e.target.value)}/>
        </Form.Item>
        <Form.Item label="描述">
          <Input value={alt} placeholder='描述' onChange={ e => setAlt(e.target.value)} />
        </Form.Item>
        <Form.Item label="轮播图图片">
        <Upload 
          name="img"
          listType="picture-card"
          className="img-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {img ? <img src={img} alt="img" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        </Form.Item>
        <Form.Item label="添加轮播图">
        <Button type="primary" onClick={ uploadBanner }>添加</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BannerAdd;