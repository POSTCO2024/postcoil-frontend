// src/hooks/useChartData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as echarts from 'echarts';

// 품종/고객사 비율(DonutChart)
export const useOrderData = (currProc: string) => {
  const [coilTypeOption, setCoilTypeOption] =
    useState<echarts.EChartsOption | null>(null);
  const [customerNameOption, setCustomerNameOption] =
    useState<echarts.EChartsOption | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8086/api/v1/dashboard/order?currProc=' + currProc,
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

// 폭/두께 분포(DoubleBarChart)
export const useMaterialData = (currProc: string) => {
  const [materialData, setMaterialData] = useState<{
    width: number[];
    thickness: number[];
  }>({ width: [], thickness: [] });
  const [chartOptions, setChartOptions] = useState<{
    width: any;
    thickness: any;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8086/api/v1/dashboard/distribution?currProc=' +
            currProc,
        ); // 폭과 두께 분포 API
        const { widthDistribution, thicknessDistribution } =
          response.data.result;

        // widthDistribution과 thicknessDistribution의 라벨과 데이터를 배열로 변환
        const widthLabels = Object.keys(widthDistribution);
        const widthValues = Object.values(widthDistribution) as number[];

        const thicknessLabels = Object.keys(thicknessDistribution);
        const thicknessValues = Object.values(
          thicknessDistribution,
        ) as number[];

        setMaterialData({
          width: widthValues,
          thickness: thicknessValues,
        });

        // 차트 옵션 설정
        setChartOptions({
          width: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '10%',
              right: '5%',
              bottom: '3%',
              top: '10%', // 그래프 위쪽 간격 넓히기
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              data: widthLabels, // API 응답에서 받은 폭 라벨
              axisTick: {
                alignWithLabel: true,
              },
            },
            yAxis: {
              type: 'value',
              name: '폭(mm)',

              nameLocation: 'middle', // 라벨 위치를 중간에 설정
              nameGap: 25, // y축 라벨과 y축 사이의 간격 설정
              minInterval: 5, // y축 최소 간격 설정
            },
            series: [
              {
                data: widthValues, // API 응답에서 받은 폭 데이터
                type: 'bar',
              },
            ],
          },
          thickness: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '10%',
              right: '5%',
              bottom: '3%',
              top: '10%', // 그래프 위쪽 간격 넓히기
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              data: thicknessLabels, // API 응답에서 받은 두께 라벨
              axisTick: {
                alignWithLabel: true,
              },
            },
            yAxis: {
              type: 'value',
              name: '두께(mm)',

              nameLocation: 'middle', // 라벨 위치를 중간에 설정
              nameGap: 25, // y축 라벨과 y축 사이의 간격 설정
              minInterval: 5, // y축 최소 간격 설정
            },
            series: [
              {
                data: thicknessValues, // API 응답에서 받은 두께 데이터
                type: 'bar',
              },
            ],
          },
        });
      } catch (error) {
        console.error('Error fetching material distribution data', error);
      }
    };

    fetchData();
  }, []);

  return { materialData, chartOptions };
};
