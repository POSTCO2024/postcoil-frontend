import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import styles from './BarChart.module.scss';

// Props 타입 정의
interface BarchartProps {
  option: echarts.EChartsOption;
}

export const Barchart: React.FC<BarchartProps> = ({ option }) => {
  // useRef 훅을 사용하여 ECharts 차트를 렌더링할 DOM 요소를 참조합니다.
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      option && myChart.setOption(option);

      // return () => {
      //     myChart.dispose();
      // };
    }
  }, [option]); // option이 변경될 때마다 차트를 업데이트

  return (
    <div className={styles.barchartContainer}>
      {/* <h3>BarChart</h3> */}
      {/* ECharts 차트를 렌더링할 컨테이너 */}
      <div ref={chartRef} className={styles.chartContainer}></div>
    </div>
  );
};

export default Barchart;
