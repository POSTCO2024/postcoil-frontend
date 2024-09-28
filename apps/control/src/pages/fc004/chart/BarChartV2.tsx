import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './BarChartV2.module.scss';

interface BarChartV2Props {
  title: string;
  option: echarts.EChartsCoreOption | null; // option을 직접 받아서 사용
}

const BarChartV2: React.FC<BarChartV2Props> = ({ title, option }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(); // option 값 확인
    if (chartRef.current && option) {
      let myChart = echarts.getInstanceByDom(chartRef.current); // 기존 차트 인스턴스 가져오기
      if (myChart) {
        myChart.dispose(); // 이미 차트가 초기화되어 있으면 제거
      }
      myChart = echarts.init(chartRef.current); // 새로운 차트 초기화
      myChart.setOption(option); // 전달받은 option을 설정

      return () => {
        if (myChart) {
          myChart.dispose(); // 컴포넌트 언마운트 시 차트 제거
        }
      };
    }
  }, [option]);

  return (
    <div className={styles.barchartv2Container}>
      <h4>{title}</h4>
      <div ref={chartRef} id="barchart" className={styles.chartContainer}></div>
    </div>
  );
};

export default BarChartV2;
