import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import styles from './PieChart.module.scss';

interface DataType {
  errorCount: number;
  normalCount: number;
}

interface PiechartProps {
  data: DataType | null;
}

export const Piechart: React.FC<PiechartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const initializeChart = () => {
    if (chartRef.current && data) {
      const myChart = echarts.init(chartRef.current);
      const newOption = {
        color: ['#fb8383', '#7fdb85'],
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            data: [
              { value: data.errorCount, name: '에러재' },
              { value: data.normalCount, name: '정상재' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        legend: {
          orient: 'vertical',
          bottom: '0px',
          right: '15px',
        },
      };
      myChart.setOption(newOption);
      return myChart;
    }
    return null;
  };

  useEffect(() => {
    const myChart = initializeChart();
    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [data]);

  return (
    <div className={styles.piechartContainer}>
      {/* <h3>Piechart</h3> */}
      {/* ECharts 차트를 렌더링할 컨테이너 */}
      <h4>품질</h4>
      <div ref={chartRef} id="piechart" className={styles.chartContainer}></div>
    </div>
  );
};

export default Piechart;
