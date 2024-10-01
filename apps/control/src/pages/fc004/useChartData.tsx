// src/hooks/useChartData.ts
import axios from 'axios';

const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;
const controlBaseUrl = import.meta.env.VITE_CONTROL_BASE_URL;

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
                name: 'Coil Types',
                type: 'pie',
                radius: ['30%', '60%'],
                data: coilTypeArray,
                label: {
                  formatter: '{b}: {d}%',
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
                name: 'Customer Names',
                type: 'pie',
                radius: ['30%', '60%'],
                data: customerNameArray,
                label: {
                  formatter: '{b}: {d}%',
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
            left: '3%',
            right: '4%',
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
          },
          series: [
            {
              name: 'Width',
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
            left: '3%',
            right: '4%',
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
          },
          series: [
            {
              name: 'Thickness',
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
