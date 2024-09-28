import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

import styles from './BarChartV2.module.scss';

interface DataType {
  ACount: number;
  BCount: number;
}

interface BarChartV2Props {
  title: string;
  data: echarts.EChartsCoreOption | null;
}

const BarChartV2: React.FC<BarChartV2Props> = ({ title, data }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const initializeChart = () => {
    if (chartRef.current && data) {
      const myChart = echarts.init(chartRef.current);
      const newOption = {
        title: {
          text: '스케줄',
          left: 'center',
          show: false,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: { bottom: '0%', left: 'center' },
        grid: {
          left: '5%',
          right: '5%',
          top: '15%',
          bottom: '20%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          data: ['롤 단위'],
        },
        series: [
          {
            name: 'A',
            type: 'bar',
            data: [data.ACount],
            itemStyle: { color: '#FF8A8A' },
          },
          {
            name: 'B',
            type: 'bar',
            data: [data.BCount],
            itemStyle: { color: '#AEDEFC' },
          },
        ],
      };

      myChart.setOption(newOption);
      return myChart;
    }
    return null;
  };

  useEffect(() => {
    const myChart = initializeChart(); // initializeChart 함수 호출로 대체
    return () => {
      if (myChart) {
        myChart.dispose(); // 컴포넌트 언마운트 시 차트 정리
      }
    };
  }, [data]); // data 변경 시 차트 다시 그리기

  return (
    <div className={styles.barchartv2Container}>
      <h4>{title}</h4>
      <div ref={chartRef} id="barchart" className={styles.chartContainer}></div>
    </div>
  );
};

export default BarChartV2;
