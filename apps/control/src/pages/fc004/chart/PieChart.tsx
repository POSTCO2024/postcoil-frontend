import * as echarts from 'echarts';
import React, { useEffect, useRef, useState } from 'react';

import styles from './PieChart.module.scss';
import axios from 'axios';

interface ApiResponse<T = any> {
  status: number;
  resultMsg: string;
  result: T;
}

interface DataType {
  errorCount: number;
  normalCount: number;
}

export const Piechart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<DataType | null>(null); // API response

  // API 호출 함수
  const fetchErrorNormalCount = async () => {
    const url = `http://localhost:8086/api/v1/dashboard/error_count`;
    try {
      const response = await axios.get<ApiResponse<DataType>>(url);
      if (response.data.status === 200) {
        setData(response.data.result);
      } else {
        console.error('Error:', response.data.resultMsg);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // 차트 초기화 및 옵션 설정 함수
  const initializeChart = () => {
    if (chartRef.current && data) {
      const myChart = echarts.init(chartRef.current);
      const newOption = {
        color: ['#fb8383', '#7fdb85'],
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            data: [
              { value: data.errorCount, name: '에러재' },
              { value: data.normalCount, name: '정상재' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        legend: {
          orient: 'vertical',
          bottom: '0px',
          right: '15px',
        },
      };
      myChart.setOption(newOption);
      return myChart; // 차트 인스턴스 반환
    }
    return null;
  };

  useEffect(() => {
    fetchErrorNormalCount(); // 컴포넌트 마운트 시 API 호출
  }, []);

  useEffect(() => {
    const myChart = initializeChart(); // 데이터가 변경될 때 차트 업데이트
    return () => {
      if (myChart) {
        myChart.dispose(); // 차트 인스턴스 파기
      }
    };
  }, [data]);

  return (
    <div className={styles.piechartContainer}>
      {/* <h3>Piechart</h3> */}
      {/* ECharts 차트를 렌더링할 컨테이너 */}
      <h4>품질</h4>
      <div ref={chartRef} id="piechart" className={styles.chartContainer}></div>
    </div>
  );
};

export default Piechart;
