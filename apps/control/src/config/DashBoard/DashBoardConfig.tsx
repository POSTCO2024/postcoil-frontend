//import { fetchData } from './DashBoardUtils';

// const apiUrl = '{URL}'
//
// const getBarChartData = async () => {
//     return await fetchData(apiUrl);
// }
//
// 사용: data: await getBarChartData()

// 실시간 모니터링
// mockData.ts
// export const mockData = {
//   workTotalCoils: 3,
//   workScheduledCoils: 1,
//   workTotalCompleteCoils: 4,
//   workStartTime: new Date().toISOString(), // 현재 시간
//   elapsedTime: '0:00:00',
// };
// DashBoardConfig.ts

export const mockData1PCM = {
  workTotalCoils: 13,
  workScheduledCoils: 4,
  workTotalCompleteCoils: 9,
  workStartTime: new Date('2024-10-04T01:30:00').toISOString(), // 시간 수정
  elapsedTime: '0:00:00',
};

export const mockData2PCM = {
  workTotalCoils: 9,
  workScheduledCoils: 2,
  workTotalCompleteCoils: 7,
  workStartTime: new Date().toISOString(),
  elapsedTime: '0:00:00',
};

export const mockData1CGL = {
  workTotalCoils: 15,
  workScheduledCoils: 5,
  workTotalCompleteCoils: 10,
  workStartTime: new Date().toISOString(),
  elapsedTime: '0:00:00',
};

export const mockData2CGL = {
  workTotalCoils: 30,
  workScheduledCoils: 7,
  workTotalCompleteCoils: 23,
  workStartTime: new Date().toISOString(),
  elapsedTime: '0:00:00',
};

export const mockData1EGL = {
  workTotalCoils: 9,
  workScheduledCoils: 8,
  workTotalCompleteCoils: 1,
  workStartTime: new Date().toISOString(),
  elapsedTime: '0:00:00',
};

export const mockData2EGL = {
  workTotalCoils: 10,
  workScheduledCoils: 2,
  workTotalCompleteCoils: 8,
  workStartTime: new Date().toISOString(),
  elapsedTime: '0:00:00',
};

// 임시 데이터 정의 - data 부분 API로 받기
// BarChart
export const barchartOption: echarts.EChartsOption = {
  title: {
    text: '재료',
    left: 'center',
    top: '30px',
    show: false,
  },
  xAxis: {
    type: 'category',
    data: ['100', '200', '300', '400', '500', '600', '700'],
  },
  yAxis: {
    type: 'value',
  },
  grid: {
    left: '20%', // 왼쪽 여백
    right: '20%', // 오른쪽 여백
    top: '10%', // 상단 여백
    bottom: '20%', // 하단 여백
    containLabel: true, // 이 옵션을 true로 설정하면 축의 라벨이 그리드 영역 안에 포함되도록 자동으로 조정됩니다.
  },
  series: [
    {
      data: [12, 25, 15, 10, 11, 21, 20],
      type: 'bar',
    },
  ],
};

// PieChart
export const piechartOption: echarts.EChartsOption = {
  title: {
    text: '품질',
    // subtext: 'Fake Data',
    left: 'center',
    top: '30px',
    show: false,
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    top: '50px',
    right: '10px',
  },
  grid: {
    left: '0%', // 왼쪽 여백
    right: '0%', // 오른쪽 여백
    top: '0%', // 상단 여백
    bottom: '0%', // 하단 여백
    containLabel: true, // 이 옵션을 true로 설정하면 축의 라벨이 그리드 영역 안에 포함되도록 자동으로 조정됩니다.
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 4, name: '에러재', itemStyle: { color: '#fb8383' } },
        { value: 46, name: '정상재', itemStyle: { color: '#7fdb85' } },
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
};

// Donut Chart
export const donutchartOption: echarts.EChartsOption = {
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
  grid: {
    left: '30%', // 왼쪽 여백
    right: '30%', // 오른쪽 여백
    top: '30%', // 상단 여백
    bottom: '20%', // 하단 여백
    containLabel: true, // 이 옵션을 true로 설정하면 축의 라벨이 그리드 영역 안에 포함되도록 자동으로 조정됩니다.
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      width: '70%',
      height: '70%',
      left: 'center',
      top: '5%',
      radius: ['25%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '1rem',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: 'AA' },
        { value: 735, name: 'BB' },
        { value: 580, name: 'CC' },
        { value: 484, name: 'DD' },
        { value: 300, name: 'EE' },
      ],
    },
  ],
};

// Rowbar Chart
export const rowbarchartOption: echarts.EChartsOption = {
  title: {
    text: '재료 진도',
    left: 'center',
    top: '30px',
    show: false,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {
    bottom: '0%',
    left: 'center',
  },
  grid: {
    left: '5%',
    right: '5%',
    top: '15%',
    bottom: '20%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: ['1PCM'],
  },

  series: [
    {
      name: 'H',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [12],
    },
    {
      name: 'J',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [20],
    },
    {
      name: 'D',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [27],
    },
    {
      name: 'E',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
      },
      emphasis: {
        focus: 'series',
      },
      data: [12],
    },
  ],
};

// Bar Chart 2
export const barchartV2Option1: echarts.EChartsOption = {
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
    data: ['공정'],
  },
  series: [
    {
      name: '1CAL',
      type: 'bar',
      data: [30],
      itemStyle: { color: '#FABC3F' },
    },
    {
      name: '2CAL',
      type: 'bar',
      data: [21],
      itemStyle: { color: '#87A2FF' },
    },
  ],
};

// Bar Chart 3
export const barchartV2Option2: echarts.EChartsOption = {
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
      data: [50],
      itemStyle: { color: '#FF8A8A' },
    },
    {
      name: 'B',
      type: 'bar',
      data: [55],
      itemStyle: { color: '#AEDEFC' },
    },
  ],
};

// Double BarChart
export const doublebarchartOption1: echarts.EChartsOption = {
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
  xAxis: [
    {
      type: 'category',
      data: ['300', '400', '500', '600', '700', '800', '900'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '폭(mm)', // y축 라벨 추가
      nameLocation: 'middle', // 라벨 위치를 중간에 설정
      nameGap: 25, // y축 라벨과 y축 사이의 간격 설정
      minInterval: 5, // y축 최소 간격 설정
    },
  ],
  series: [
    {
      name: '폭',
      type: 'bar',
      barWidth: '60%',
      data: [10, 22, 10, 13, 14, 5, 7],
    },
  ],
};

export const doublebarchartOption2: echarts.EChartsOption = {
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
    top: '10%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['0', '0.5', '1.0', '1.5', '2.0', '2.5', '3.0'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '두께(mm)', // y축 라벨 추가
      nameLocation: 'middle', // 라벨 위치를 중간에 설정
      nameGap: 25, // y축 라벨과 y축 사이의 간격 설정
      minInterval: 5, // y축 최소 간격 설정
    },
  ],
  series: [
    {
      name: '두께',
      type: 'bar',
      barWidth: '60%',
      data: [5, 12, 10, 13, 20, 11, 7],
    },
  ],
};
