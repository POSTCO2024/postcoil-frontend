// src/hooks/useChartData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

export const useChartData = () => {
  const [coilTypeOption, setCoilTypeOption] =
    useState<echarts.EChartsOption | null>(null);
  const [customerNameOption, setCustomerNameOption] =
    useState<echarts.EChartsOption | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8086/api/v1/dashboard/order',
        );
        if (response.status === 200) {
          const result = response.data.result;

          // coilType 데이터를 차트에 맞게 변환
          const coilTypeArray = Object.entries(result.coilType).map(
            ([name, value]) => ({
              name,
              value: Number(value),
            }),
          );

          // customerName 데이터를 차트에 맞게 변환
          const customerNameArray = Object.entries(result.customerName).map(
            ([name, value]) => ({
              name,
              value: Number(value),
            }),
          );

          // coilType 차트 옵션 설정
          setCoilTypeOption({
            title: {
              text: '품종',
              left: 'center',
              top: '30px',
              show: false,
            },
            tooltip: {
              trigger: 'item',
            },
            legend: {
              bottom: '0%',
              left: 'center',
            },
            series: [
              {
                name: 'Coil Types',
                type: 'pie',
                radius: ['30%', '60%'],
                data: coilTypeArray,
                label: {
                  formatter: '{b}: {d}%',
                },
              },
            ],
          });

          // customerName 차트 옵션 설정
          setCustomerNameOption({
            title: {
              text: '고객사',
              left: 'center',
              top: '30px',
              show: false,
            },
            tooltip: {
              trigger: 'item',
            },
            legend: {
              bottom: '0%',
              left: 'center',
            },
            series: [
              {
                name: 'Customer Names',
                type: 'pie',
                radius: ['30%', '60%'],
                data: customerNameArray,
                label: {
                  formatter: '{b}: {d}%',
                },
              },
            ],
          });
        }
      } catch (error) {
        console.error('API 요청 중 오류 발생', error);
      }
    };

    fetchData();
  }, []);

  return { coilTypeOption, customerNameOption };
};
