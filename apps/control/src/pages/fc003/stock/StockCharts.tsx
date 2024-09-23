import { Button } from '@postcoil/ui';
import axios from 'axios';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import styles from './StockCharts.module.scss';

const StockCharts: React.FC = () => {
  // const [treemapData, setTreemapData] = useState([{ name: '', value: 0 }]);

  const treemapData = [
    { name: '1PCM', value: 7840 },
    { name: '2PCM', value: 5731 },
    { name: '1CAL', value: 5914 },
    { name: '2CAL', value: 3534 },
    { name: '1EGL', value: 3416 },
    { name: '2EGL', value: 6714 },
    { name: '1CGL', value: 7074 },
    { name: '2CGL', value: 3938 },
    { name: '포장', value: 3812 },
  ];
  treemapData.sort(function (a, b) {
    const firstCharA = b.name[0];
    const firstCharB = a.name[0];

    if (firstCharA !== firstCharB) {
      return firstCharA.localeCompare(firstCharB);
    } else {
      // If the first characters are the same, sort by value
      return a.value - b.value;
    }
  });

  const treemapOption: echarts.EChartsOption = {
    series: [
      {
        type: 'treemap',
        data: treemapData.map((item, index) => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            // 색상 지정 후 하나씩 가져오기
            color: [
              '#FFADAD',
              '#FFD6A5',
              '#FDFFB6',
              '#CAFFBF',
              '#9BF6FF',
              '#A0C4FF',
              '#BDB2FF',
              '#FFC6FF',
              '#FFFFFE',
            ][8 - (index % 9)],
          },
        })),
        label: {
          color: 'black',
          fontWeight: 600,
          fontSize: '1.8rem',
        },
        emphasis: {
          itemStyle: {
            // hover시 배경화면
            color: 'white',
          },
          label: {
            show: true,
            // 해당 표에 손을 놓으면 개수 표시
            formatter: function (graph) {
              return `${graph.name} : ${graph.value} 개`;
            },
          },
        },
        breadcrumb: {
          show: false,
        },
        roam: false, // 확대 기능 사용안함
        nodeClick: false, // 클릭시 표 움직이는 기능 사용안함
        universalTransition: true,
      },
    ],
  };
  const barOption: echarts.EChartsOption = {
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: treemapData.map((item) => item.name),
    },
    series: [
      {
        type: 'bar',
        data: treemapData.map((item) => item.value),
        universalTransition: true,
      },
    ],
  };

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
      <h3>공장별 수급량 조회</h3>
      <div className={styles.contentContainer}>
        <div ref={chartRef} className={styles.chart} />
        <div className={styles.btn}>
          <Button onClick={toggleChart} text="그래프 변환" />
        </div>
      </div>
    </div>
  );
};

export default StockCharts;
