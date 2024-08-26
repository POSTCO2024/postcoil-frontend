import { Button } from '@postcoil/ui';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import styles from './StockCharts.module.scss';

import { barOption, treemapOption } from '@/config/chartOption/ChartOption';

const StockCharts: React.FC = () => {
  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);
  const [isTreemap, setIsTreemap] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current) {
      const instance = echarts.init(chartRef.current);
      chartInstanceRef.current = instance;
      instance.setOption(treemapOption);

      return () => {
        instance.dispose();
      };
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption(
        isTreemap ? treemapOption : barOption,
        true,
      );
    }
  }, [isTreemap]);

  const toggleChart = () => {
    setIsTreemap((prev) => !prev);
  };

  return (
    <div className={styles.chartContainer}>
      <h1 style={{ textAlign: 'center', fontSize: '1.2em', paddingTop: 20 }}>
        공장별 수급량 조회
      </h1>
      <div ref={chartRef} className={styles.chart} />
      <Button onClick={toggleChart} text="그래프 변환" />
    </div>
  );
};

export default StockCharts;
