import { Button } from '@postcoil/ui';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

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
    <div style={{ height: '100%' }}>
      <div
        ref={chartRef}
        style={{ width: '100%', height: '80%', margin: 'auto' }}
      />
      <Button onClick={toggleChart} text="그래프 변환" />
    </div>
  );
};

export default StockCharts;
