import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './BarChartV2.module.scss';

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
      <h4>차공정</h4>
      <div ref={chartRef} id="barchart" className={styles.chartContainer}></div>
    </div>
  );
};

export default BarChartV2;
