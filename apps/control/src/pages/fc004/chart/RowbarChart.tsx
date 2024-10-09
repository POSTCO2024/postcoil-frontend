import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './RowbarChart.module.scss';

interface rowbarchartProps {
  option: echarts.EChartsOption | null;
}
export const RowbarChart: React.FC<rowbarchartProps> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const myChartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 기존에 차트가 존재하면 dispose로 제거
      if (myChartRef.current) {
        myChartRef.current.dispose();
      }

      // 차트를 새로 생성
      myChartRef.current = echarts.init(chartRef.current);

      // 옵션이 존재할 경우 설정
      if (option) {
        myChartRef.current.setOption(option);
      }
    }

    // 컴포넌트 언마운트 시 차트를 정리 (메모리 누수 방지)
    return () => {
      if (myChartRef.current) {
        myChartRef.current.dispose();
      }
    };
  }, [option]);

  return (
    <div className={styles.rowbarContainer}>
      <h4>재료 진도</h4>
      <div ref={chartRef} id="rowchart" className={styles.chartContainer}></div>
    </div>
  );
};

export default RowbarChart;
