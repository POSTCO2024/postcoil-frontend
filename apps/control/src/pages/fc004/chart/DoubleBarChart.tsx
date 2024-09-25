import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './DoubleBarChart.module.scss';

// Props 타입 정의
interface DoubleBarChartProps {
  option1: echarts.EChartsCoreOption | null;
  option2: echarts.EChartsCoreOption | null;
}

export const DoubleBarChart: React.FC<DoubleBarChartProps> = ({
  option1,
  option2,
}) => {
  const chartRef1 = useRef<HTMLDivElement | null>(null);
  const chartRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef1.current && option1) {
      const myChart1 = echarts.init(chartRef1.current);
      myChart1.setOption(option1); // option1이 null이 아닐 때만 호출
    }
    if (chartRef2.current && option2) {
      const myChart2 = echarts.init(chartRef2.current);
      myChart2.setOption(option2); // option2가 null이 아닐 때만 호출
    }
  }, [option1, option2]);

  return (
    <div className={styles.doublebarchartContainer}>
      <h4>재료 특성</h4>
      <div ref={chartRef1} className={styles.chartContainer}></div>
      <div ref={chartRef2} className={styles.chartContainer}></div>
    </div>
  );
};

export default DoubleBarChart;
