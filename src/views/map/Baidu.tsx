import React, { FC, useEffect } from 'react';

type BaiduProps = {};

const Baidu: FC<BaiduProps> = (props) => {
  useEffect(() => {
    const win: any = window
    var map = new win.BMapGL.Map("container");
    // 创建地图实例 
    var point = new win.BMapGL.Point(116.404, 39.915);
    // 创建点坐标 
    map.centerAndZoom(point, 15);
    // 初始化地图，设置中心点坐标和地图级别 
  },[])
  return (
    <div>
      <div id="container" style={{ width: '600px', height: '400px'}}></div>
    </div>
  )
}

export default Baidu;