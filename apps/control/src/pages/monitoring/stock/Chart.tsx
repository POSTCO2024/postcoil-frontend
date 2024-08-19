import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

const StockCharts: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      chartInstanceRef.current = chartInstance;

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

      const treemapOption: echarts.EChartsOption = {
        series: [
          {
            type: 'treemap',
            data: treemapData.map((item) => ({
              name: item.name,
              value: item.value,
            })),
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

      chartInstance.setOption(treemapOption);
      let currentOption = treemapOption;

      const interval = setInterval(() => {
        currentOption =
          currentOption === treemapOption ? barOption : treemapOption;
        chartInstance.setOption(currentOption, true);
      }, 2000);

      return () => {
        clearInterval(interval);
        chartInstance.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default StockCharts;
