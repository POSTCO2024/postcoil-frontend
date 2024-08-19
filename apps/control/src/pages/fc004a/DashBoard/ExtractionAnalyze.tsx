import React from 'react';

import styles from './ExtractionAnalyze.module.scss';
import Barchart from './chart/BarChart';
import Piechart from './chart/PieChart';
import DonutChart from './chart/DonutChart';
import RowbarChart from './chart/RowbarChart';
import Status from './chart/Status';
import BarChartV2 from './chart/BarChartV2';

// BarChart
const barchartOption: echarts.EChartsOption = {
  title: {
    text: '재료',
    left: 'center',
    top: '30px',
  },
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
    text: '품질',
    // subtext: 'Fake Data',
    left: 'center',
    top: '30px',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    top: '50px',
    right: '10px',
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
  title: {
    text: '품종',
    left: 'center',
    top: '30px',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '10%',
    left: 'right',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['25%', '50%'],
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
  title: {
    text: '재료 진도',
    left: 'center',
    top: '30px',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {
    top: '20%',
    left: 'right',
  },
  grid: {
    left: '3%',
    right: '5%',
    top: '30%',
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

const barchartV2Option: echarts.EChartsOption = {
  title: {
    text: '스케줄',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: { bottom: '10px', right: '5px' },
  grid: {
    left: '3%',
    right: '4%',
    top: '50px',
    bottom: '15%',
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

const ExtractionAnalyze: React.FC = () => {
  return (
    <div className={styles.parentDiv}>
      awdawdwaawdwda
      <div className={styles.line1}>
        <div className={styles.small_card}>
          <h6>현재 작업중</h6>
          <h3>50</h3>
        </div>
        <div className={styles.small_card}>
          <h6>대기중</h6>
          <h3>13</h3>
        </div>
        <div className={styles.small_card}>
          <h6>작업 완료</h6>
          <h3>13</h3>
        </div>

        <div className={styles.small_card}>
          <h6>작업 시간</h6>
          <h3>00:15:03</h3>
        </div>
      </div>
      <div className={styles.line2}>
        <div className={styles.small_card}>
          {/* <img src={human} />
                    <div>addw</div> */}
          <Piechart option={piechartOption} />
        </div>
        <div className={styles.small_card}>
          {/* <img src={human} />
                    <div>addw</div> */}
          <BarChartV2 option={barchartV2Option} />
        </div>
        <div className={styles.small_card}>
          {/* <img src={human} />
                    <div>addw</div> */}
          <RowbarChart option={rowbarchartOption} />
        </div>
        <div className={styles.small_card}>
          {/* <img src={human} />
                    <div>addw</div> */}
          <h4>설비 이상</h4>
          <Status />
        </div>
      </div>
      <div className={styles.line2}>
        <div className={styles.small_card}>
          {/* <img src={human} />
                    <div>addw</div> */}
          <DonutChart option={donutcahrtOption} />
        </div>
        <div className={styles.small_card}>
          {/* <img src={human} />
                    <div>addw</div> */}
          <DonutChart option={donutcahrtOption} />
        </div>
        <div className={styles.small_card}>
          {/* <img src={human} />
                    <div>addw</div> */}
          <Barchart option={barchartOption} />
        </div>
        <div className={styles.small_card}>
          {/* <img src={human} />
                    <div>addw</div> */}
          <Barchart option={barchartOption} />
        </div>
      </div>
    </div>
  );
};

export default ExtractionAnalyze;
