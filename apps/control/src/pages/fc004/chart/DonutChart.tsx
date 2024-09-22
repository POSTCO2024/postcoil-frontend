import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './DonutChart.module.scss';

interface ChartProps {
  option: echarts.EChartsOption | null;
  title?: string;
}

const DonutChart: React.FC<ChartProps> = ({ option, title }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current && option) {
      const myChart = echarts.init(chartRef.current);
      myChart.setOption(option);
    }

    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current);
      }
    };
  }, [option]);

  return (
    <div className={styles.donutchartContainer}>
      {/* <h3>Donut Chart</h3> */}
      <h4>{title}</h4>
      <div
        ref={chartRef}
        className={`${styles.chartContainer} donutchart`}></div>
    </div>
  );
};

export default DonutChart;
