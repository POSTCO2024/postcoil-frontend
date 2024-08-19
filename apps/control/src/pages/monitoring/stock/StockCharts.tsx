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
  ],
  series: [
    {
      type: 'treemap',
      data: treemapData.map((item) => ({
        name: item.name,
        value: item.value,
      })),

      label: {
        color: 'black',
        fontWeight: 'bolder',
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
  const [chartInstance, setChartInstance] =
    useState<echarts.EChartsType | null>(null);

  const [isTreemap, setIsTreemap] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const instance = echarts.init(chartRef.current);
      setChartInstance(instance);
    }

    return () => {
      chartInstance?.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.setOption(isTreemap ? treemapOption : barOption);
    }
  }, [chartInstance, isTreemap]);

  const toggleChart = () => {
    setIsTreemap((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleChart}>Toggle Chart</button>
      <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default StockCharts;
