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
  const chartRef = useRef<HTMLDivElement | null>(null);
  const myChartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (myChartRef.current) {
        myChartRef.current.resize();
      }
    };

    const initializeChart = () => {
      if (chartRef.current) {
        myChartRef.current = echarts.init(chartRef.current);
        myChartRef.current.setOption(option);
      }
    };

    // 차트 초기화
    initializeChart();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
      if (myChartRef.current) {
        myChartRef.current.dispose(); // 차트 인스턴스 정리
        myChartRef.current = null; // 인스턴스 초기화
      }
    };
  }, [option]);

  return (
    <div className={styles.barchartContainer}>
      <h4>{title}</h4>
      <p>{subtitle}</p>
      <div ref={chartRef} id="barchart" className={styles.chartContainer}></div>
    </div>
  );
};

export default Barchart;
