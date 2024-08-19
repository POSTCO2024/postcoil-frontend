import React from 'react';
import Barchart from './chart/BarChart';
import Piechart from './chart/PieChart';
import DonutChart from './chart/DonutChart';
import RowbarChart from './chart/RowbarChart';

import styles from './DashBoard.module.scss';

// BarChart
const barchartOption: echarts.EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['100', '200', '300', '400', '500', '600', '700'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [12, 25, 15, 10, 11, 21, 20],
      type: 'bar',
    },
  ],
};

// PieChart
const piechartOption: echarts.EChartsOption = {
  title: {
    text: 'Referer of a Website',
    // subtext: 'Fake Data',
    // left: 'center'
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'right',
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
const donutcahrtOption: echarts.EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'right',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
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
const rowbarchartOption: echarts.EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: ['1PCM', '2PCM'],
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
      data: [12, 32],
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
      data: [20, 12],
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
      data: [27, 18],
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
      data: [10, 12],
    },
  ],
};

export const DashBoard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h3>분석 화면</h3>
      <div className={styles.chartContainer}>
        <Barchart option={barchartOption} />
        <Piechart option={piechartOption} />
        <DonutChart option={donutcahrtOption} />
        <RowbarChart option={rowbarchartOption} />
      </div>
    </div>
  );
};

export default DashBoard;
