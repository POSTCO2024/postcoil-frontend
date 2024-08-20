import React, { useEffect, useRef } from 'react';

import styles from './BarChartV2.module.scss';
import * as echarts from 'echarts';

interface BarChartV2Props {
  option: echarts.EChartsOption;
}

const BarChartV2: React.FC<BarChartV2Props> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      option && myChart.setOption(option);
    }
  }, [option]);

  return (
    <div className={styles.barchartv2Container}>
      <div ref={chartRef} className={styles.chartContainer}></div>
    </div>
  );
};

export default BarChartV2;
