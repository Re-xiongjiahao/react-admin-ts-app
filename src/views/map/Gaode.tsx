import React, { FC, useLayoutEffect } from 'react';

type GaodeProps = {};

const Gaode: FC<GaodeProps> = (props) => {
  useLayoutEffect(() => {
    var map = new (window as any).AMap.Map('container', {
      zoom:11,//级别
      center: [116.397428, 39.90923],//中心点坐标
      viewMode:'3D'//使用3D视图
    });
  })
  return (
    <div>
      高德地图
      <div id="container" style={{ width: 1000, height: 500}}></div> 
    </div>
  )
}

export default Gaode;