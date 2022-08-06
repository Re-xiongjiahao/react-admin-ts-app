import React, { FC, useEffect, useState } from 'react';
import * as echarts from 'echarts';

type EchartsProps = {};
const barData = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};
const lineData = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};
const pieData = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};
const customData = [
  {
    title: 'a',
    age: 18
  },
  {
    title: 'b',
    age: 39
  },
  {
    title: 'c',
    age: 16
  }
]
function changeData(customData: any){
  const arr1:string[] =[]
  const arr2:string[] =[]
  customData.forEach((item:any) => {
    arr1.push(item.title)
    arr2.push(item.age)
  })
  return {
    title: {
      text: 'ECharts 处理数据图表'
    },
    tooltip: {},
    xAxis: {
      data: arr1,
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: arr2, 
      }
    ]
  };
}

const Echarts: FC<EchartsProps> = (props) => {
  const [myChart,setMyChart] = useState<echarts.ECharts>()
  const [params,setParams] = useState<any>(barData)
  useEffect(() => {
    setMyChart(echarts.init(document.getElementById('main') as HTMLDivElement))
  },[])
  useEffect(() => {
    myChart&& myChart!.setOption(params);
  },[myChart,params])
  return (
    <div>
      <button onClick={ ()=>setParams(barData)}>柱状图</button>
      <button onClick={ ()=>setParams(lineData)}>折线图</button>
      <button onClick={ ()=>setParams(pieData)}>饼状图</button>
      <button onClick={ ()=>setParams(changeData(customData))}>自定义数据柱状图</button>
      <div id='main' style={{width:600,height:500,backgroundColor:'#efefef'}}></div>
    </div>
  )
}

export default Echarts;