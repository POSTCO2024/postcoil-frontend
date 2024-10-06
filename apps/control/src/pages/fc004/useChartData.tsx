// src/hooks/useChartData.ts
import axios from 'axios';
import { EChartsOption } from 'echarts';
import React, { useEffect, useState } from 'react';

const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;
const controlBaseUrl = import.meta.env.VITE_CONTROL_BASE_URL;
const operationApiUrl = import.meta.env.VITE_OPERATION_API_URL;
const operationBaseUrl = import.meta.env.VITE_OPERATION_BASE_URL;

// 품종/고객사 비율(DonutChart)
export const useOrderData = () => {
  return async (currProc: string) => {
    try {
      const response = await axios.get(
        `${controlApiUrl}${controlBaseUrl}/dashboard/order?currProc=${currProc}`,
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
        return {
          coilTypeOptionResult: {
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
                name: '품종',
                type: 'pie',
                radius: ['30%', '60%'],
                data: coilTypeArray,
                label: {
                  formatter: '{b}',
                },
              },
            ],
          },
          // customerName 차트 옵션 설정
          customerNameOptionResult: {
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
                name: '고객사',
                type: 'pie',
                radius: ['30%', '60%'],
                data: customerNameArray,
                label: {
                  formatter: '{b}',
                },
              },
            ],
          },
        };
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생', error);
    }
    return null;
  };
};

// 폭/두께 분포(DoubleBarChart)
export const useWidthThicknessData = () => {
  return async (selectedProc: string) => {
    try {
      const response = await axios.get(
        `${controlApiUrl}${controlBaseUrl}/dashboard/distribution?currProc=${selectedProc}`,
      );
      if (response.status === 200) {
        const result = response.data.result;

        // width 데이터를 차트에 맞게 변환
        const widthCategories = Object.keys(result.widthDistribution);
        const widthData = Object.values(result.widthDistribution);

        // thickness 데이터를 차트에 맞게 변환
        const thicknessCategories = Object.keys(result.thicknessDistribution);
        const thicknessData = Object.values(result.thicknessDistribution);

        // width 차트 옵션 설정
        const widthOptionResult = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '10%',
            right: '7%',
            bottom: '3%',
            top: '10%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: widthCategories,
            axisTick: {
              alignWithLabel: true,
            },
          },
          yAxis: {
            type: 'value',
            name: '폭(mm)',
            nameLocation: 'middle',
            nameGap: 25,
            minInterval: 1,
          },
          series: [
            {
              name: '폭',
              type: 'bar',
              barWidth: '60%',
              data: widthData,
            },
          ],
        };

        // thickness 차트 옵션 설정
        const thicknessOptionResult = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '10%',
            right: '7%',
            bottom: '3%',
            top: '10%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: thicknessCategories,
            axisTick: {
              alignWithLabel: true,
            },
          },
          yAxis: {
            type: 'value',
            name: '두께(mm)',
            nameLocation: 'middle',
            nameGap: 25,
            minInterval: 1,
          },
          series: [
            {
              name: '두께',
              type: 'bar',
              barWidth: '60%',
              data: thicknessData,
            },
          ],
        };

        return {
          widthOptionResult,
          thicknessOptionResult,
        };
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생', error);
    }
    return null;
  };
};

// 롤 단위(BarChartV2)
export const useRollUnitData = () => {
  return async (selectedProc: string) => {
    try {
      const response = await axios.get(
        `${controlApiUrl}${controlBaseUrl}/dashboard/rollUnit?currProc=${selectedProc}`,
      );

      // console.log('API 응답 데이터:', response.data); // API 응답 확인

      if (response.status === 200) {
        const aData = response.data.result.acount ?? 0;
        const bData = response.data.result.bcount ?? 0;

        const rollUnitOptionResult = {
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
              data: [aData],
              itemStyle: { color: '#FF8A8A' },
            },
            {
              name: 'B',
              type: 'bar',
              data: [bData],
              itemStyle: { color: '#AEDEFC' },
            },
          ],
        };

        return rollUnitOptionResult; // Data + Option
      } else {
        console.log(
          '응답 상태가 200이거나 result가 없습니다:',
          response.status,
        );
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생: ', error);
    }
    return null;
  };
};

// 차공정 (nextProc)
export const fetchNextProcData = async (
  selectedProc: string,
): Promise<EChartsOption | null> => {
  try {
    const response = await axios.get(
      `${operationApiUrl}${operationBaseUrl}/monitoring/analyze?SchProcess=${selectedProc}`,
    );

    if (response.status === 200 && response.data.result.totalDashboard) {
      // console.log(response);
      const nextProc = response.data.result.totalDashboard[0].nextProc;

      // 차공정 (nextProc) 데이터를 차트 옵션으로 변환
      const nextProcOption: EChartsOption = {
        title: { text: '스케줄', left: 'center', show: false },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { bottom: '0%', left: 'center' },
        grid: {
          left: '5%',
          right: '5%',
          top: '15%',
          bottom: '20%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value', // 명확하게 value 축으로 설정
            axisLabel: {
              formatter: '{value}', // 값의 형식 지정
            },
            axisLine: {
              // 축의 선 스타일 정의
              show: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'category', // 명확하게 category 축으로 설정
            data: ['공정'],
            axisLabel: {
              formatter: (value: string) => value, // 범주 이름의 형식 지정
            },
            axisLine: {
              // 축의 선 스타일 정의
              show: true,
            },
          },
        ],
        series: Object.keys(nextProc).map((procName) => ({
          name: procName,
          type: 'bar',
          data: [nextProc[procName]],
          itemStyle: { color: procName === '101' ? '#FABC3F' : '#87A2FF' },
        })),
      };
      return nextProcOption;
    }
  } catch (error) {
    console.error('API 요청 중 오류 발생', error);
  }
  return null;
};

// 재료진도 (currProcess)
export const fetchCurrProcessData = async (
  selectedProc: string,
): Promise<EChartsOption | null> => {
  try {
    const response = await axios.get(
      `${operationApiUrl}${operationBaseUrl}/monitoring/analyze?SchProcess=${selectedProc}`,
    );

    if (response.status === 200 && response.data.result.totalDashboard) {
      const currProcess = response.data.result.totalDashboard[0].currProcess;

      // 재료진도 (currProcess) 데이터를 차트 옵션으로 변환
      const currProcessOption: EChartsOption = {
        title: { text: '재료 진도', left: 'center', top: '30px', show: false },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        legend: { bottom: '0%', left: 'center' },
        grid: {
          left: '5%',
          right: '5%',
          top: '15%',
          bottom: '20%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value', // x축을 'value'로 명확하게 지정
            axisLabel: {
              formatter: '{value}', // x축의 값 형식 지정
            },
            axisLine: {
              // x축 선 스타일 정의
              show: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'category', // y축을 'category'로 명확하게 지정
            data: ['1PCM'], // y축에 표시될 카테고리 데이터
            axisLabel: {
              formatter: (value: string) => value, // y축 값의 형식 지정
            },
            axisLine: {
              // y축 선 스타일 정의
              show: true,
            },
          },
        ],
        series: Object.keys(currProcess).map((procName) => ({
          name: procName,
          type: 'bar',
          stack: 'total', // 데이터를 쌓아서 표현
          label: { show: true }, // 데이터 값 라벨 표시
          emphasis: { focus: 'series' }, // 시리즈 강조 설정
          data: [currProcess[procName]], // 시리즈에 맞는 데이터 설정
        })),
      };
      return currProcessOption;
    }
  } catch (error) {
    console.error('API 요청 중 오류 발생', error);
  }
  return null;
};

// useChartData.ts 파일에서 커스텀 훅으로 정의
export const useNextProcDataFetch = (selectedProc: string) => {
  const [nextProcOption, setNextProcOption] = useState<EChartsOption | null>(
    null,
  );

  useEffect(() => {
    const fetchNextProcDataAsync = async () => {
      const result = await fetchNextProcData(selectedProc);
      setNextProcOption(result);
    };
    fetchNextProcDataAsync();
  }, [selectedProc]);

  return nextProcOption;
};

export const useCurrProcessDataFetch = (selectedProc: string) => {
  const [currProcessOption, setCurrProcessOption] =
    useState<EChartsOption | null>(null);

  useEffect(() => {
    const fetchCurrProcessDataAsync = async () => {
      const result = await fetchCurrProcessData(selectedProc);
      setCurrProcessOption(result);
    };
    fetchCurrProcessDataAsync();
  }, [selectedProc]);

  return currProcessOption;
};
