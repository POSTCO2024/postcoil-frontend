import { Button } from '@postcoil/ui';
import axios from 'axios';
import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import styles from './StockCharts.module.scss';

const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;
const controlBaseUrl = import.meta.env.VITE_CONTROL_BASE_URL;

const StockCharts: React.FC = () => {
  const [treemapData, setTreemapData] = useState<any[]>([]);

  const transformFetchData = (data: { [key: string]: number }) => {
    const treemapData = Object.keys(data).map((key) => {
      return {
        name: key.replace(/A$/, '입측').replace(/B$/, '출측'),
        value: data[key],
      };
    });
    // treemapData.sort(function (a, b) {
    //   return a.value - b.value;
    // });
    return treemapData;
  };

  const fetchTreemapData = async () => {
    try {
      const response = await axios.get(
        `${controlApiUrl}${controlBaseUrl}/monitoring/materials`,
      );
      console.log('Stock : ' + JSON.stringify(response.data.result));
      const fetchData = transformFetchData(response.data.result);
      setTreemapData(fetchData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTreemapData();
  }, []);

  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);
  const [isTreemap, setIsTreemap] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current && treemapData.length > 0) {
      const instance = echarts.init(chartRef.current);
      chartInstanceRef.current = instance;
      instance.setOption(treemapOption);

      return () => {
        instance.dispose();
      };
    }
    return undefined;
  }, [treemapData]);

  useEffect(() => {
    if (chartInstanceRef.current && treemapData.length > 0) {
      chartInstanceRef.current.setOption(
        isTreemap ? treemapOption : barOption,
        true,
      );
    }
  }, [isTreemap, treemapData]);

  const treemapOption: echarts.EChartsOption = {
    series: [
      {
        type: 'treemap',
        data: treemapData.map((item: any, index: any) => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            // 색상 지정 후 하나씩 가져오기
            color: [
              '#EDF2FB',
              '#E2EAFC',
              '#D7E3FC',
              '#CCDBFD',
              '#C1D3FE',
              '#A5C0FF',
              '#8CAEFF',
              '#83A8FF',
              '#719CFF',
            ][index % 9],
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
          show: true,
          bottom: 20,
          height: 30,
        },
        roam: true, // 확대 기능 사용안함
        // nodeClick: false, // 클릭시 표 움직이는 기능 사용안함
        universalTransition: true,
      },
    ],
  };
  const barOption: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${params.name} : ${params.value} 개`;
      },
    },
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

  const toggleChart = () => {
    setIsTreemap((prev) => !prev);
  };

  return (
    <div className={styles.chartContainer}>
      <h3>공정별 입측/출측 코일 조회</h3>
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
