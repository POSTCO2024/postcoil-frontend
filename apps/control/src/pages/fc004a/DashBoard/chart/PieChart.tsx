import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import styles from './PieChart.module.scss';

// Props 타입 정의
interface PiechartProps {
  option: echarts.EChartsOption;
}

export const Piechart: React.FC<PiechartProps> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      option && myChart.setOption(option);
    }
  }, [option]);

  return (
    <div className={styles.dashboardContainer}>
      {/* <h3>Piechart</h3> */}
      {/* ECharts 차트를 렌더링할 컨테이너 */}
      <div ref={chartRef} className={styles.chartContainer}></div>
    </div>
  );
};

export default Piechart;
