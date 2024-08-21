import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './BarChart.module.scss';

// Props 타입 정의
interface BarchartProps {
  option: echarts.EChartsOption;
  title?: string;
  subtitle?: string;
}

export const Barchart: React.FC<BarchartProps> = ({
  option,
  title,
  subtitle,
}) => {
  // useRef 훅을 사용하여 ECharts 차트를 렌더링할 DOM 요소를 참조합니다.
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      option && myChart.setOption(option);
    }
  }, [option]); // option이 변경될 때마다 차트를 업데이트

  return (
    <div className={styles.barchartContainer}>
      {/* <h3>BarChart</h3> */}
      {/* ECharts 차트를 렌더링할 컨테이너 */}
      <h4>{title}</h4>
      <p>{subtitle}</p>
      <div ref={chartRef} id="barchart" className={styles.chartContainer}></div>
    </div>
  );
};

export default Barchart;
