import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './RowbarChart.module.scss';

interface rowbarchartProps {
  option: echarts.EChartsOption | null;
}
export const RowbarChart: React.FC<rowbarchartProps> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      option && myChart.setOption(option);
    }
  }, [option]);

  return (
    <div className={styles.rowbarContainer}>
      <h4>재료 진도</h4>
      <div ref={chartRef} id="rowchart" className={styles.chartContainer}></div>
    </div>
  );
};

export default RowbarChart;
