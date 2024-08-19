import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

const treemapData = [
  { name: 'Max Flow Min Cut', value: 7840 },
  { name: 'Link Distance', value: 5731 },
  { name: 'Shortest Paths', value: 5914 },
  { name: 'Betweenness Centrality', value: 3534 },
  { name: 'Spanning Tree', value: 3416 },
  { name: 'Hierarchical Cluster', value: 6714 },
  { name: 'Aspect Ratio Banker', value: 7074 },
  { name: 'Agglomeration Cluster', value: 3938 },
  { name: 'Community Structure', value: 3812 },
];

treemapData.sort(function (a, b) {
  return a.value - b.value;
});
const treemapOption: echarts.EChartsOption = {
  series: [
    {
      type: 'treemap',
      data: treemapData.map((item, index) => ({
        name: item.name,
        value: item.value,
        itemStyle: {
          // 색상 지정 후 하나씩 가져오기
          color: [
            '#FFADAD',
            '#FFD6A5',
            '#FDFFB6',
            '#CAFFBF',
            '#9BF6FF',
            '#A0C4FF',
            '#BDB2FF',
            '#FFC6FF',
            '#FFFFFC',
          ][8 - (index % 9)],
        },
      })),
      label: {
        color: 'black',
        fontWeight: 'bolder',
      },
      emphasis: {
        itemStyle: {
          // hover시 배경화면
          color: 'white',
        },
        label: {
          show: true,
          // 해당 표에 손을 놓으면 개수 표시
          formatter: function (graph) {
            return `${graph.name} : ${graph.value} 개`;
          },
        },
      },
      universalTransition: true,
    },
  ],
};
const barOption: echarts.EChartsOption = {
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: treemapData.map((item) => item.name),
  },
  series: [
    {
      type: 'bar',
      data: treemapData.map((item) => item.value),
      universalTransition: true,
    },
  ],
};

const StockCharts: React.FC = () => {
  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);
  const [isTreemap, setIsTreemap] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current) {
      const instance = echarts.init(chartRef.current);
      chartInstanceRef.current = instance;
      instance.setOption(treemapOption);

      return () => {
        instance?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption(
        isTreemap ? treemapOption : barOption,
        true,
      );
    }
    console.log(chartInstanceRef.current?.getOption());
  }, [isTreemap]);

  const toggleChart = () => {
    setIsTreemap((prev) => !prev);
  };

  return (
    <div style={{ height: '100%' }}>
      <button onClick={toggleChart}>그래프 변환</button>
      <div ref={chartRef} style={{ width: '100%', height: '50%' }} />
    </div>
  );
};

export default StockCharts;
