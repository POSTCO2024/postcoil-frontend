import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styles from './DonutChart.module.scss';

interface ChartProps {
  option: echarts.EChartsOption;
}

const DonutChart: React.FC<ChartProps> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      option && myChart.setOption(option);
    }

    // return () => {
    //     myChart.dispose();
    // };
  }, [option]);

  return (
    <div className={styles.donutchartContainer}>
      {/* <h3>Donut Chart</h3> */}
      <div ref={chartRef} className={styles.chartContainer}></div>
    </div>
  );
};

export default DonutChart;
