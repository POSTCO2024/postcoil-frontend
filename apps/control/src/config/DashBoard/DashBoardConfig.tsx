//import { fetchData } from './DashBoardUtils';

// const apiUrl = '{URL}'
//
// const getBarChartData = async () => {
//     return await fetchData(apiUrl);
// }
//
// 사용: data: await getBarChartData()

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
        { value: 1048, name: '에러재' },
        { value: 735, name: '정상재' },
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
    left: '0%',
    right: '0%',
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
export const barchartV2Option: echarts.EChartsOption = {
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
    left: '0%',
    right: '0%',
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
    },
    {
      name: '2CAL',
      type: 'bar',
      data: [21],
    },
  ],
};
