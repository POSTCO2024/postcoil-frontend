import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

import styles from './RowbarChart.module.scss';

interface rowbarchartProps {
  option: echarts.EChartsOption;
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
      {/* <h3>RowBarChart</h3> */}
      <div ref={chartRef} className={styles.chartContainer}></div>
    </div>
  );
};

export default RowbarChart;
