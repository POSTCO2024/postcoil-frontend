/* eslint-disable @typescript-eslint/no-this-alias */
import Highcharts from 'highcharts';
import draggablePoints from 'highcharts/modules/draggable-points';
import variwide from 'highcharts/modules/variwide';
import React, { useEffect } from 'react';

import styles from './DraggableChart.module.scss';

// 모듈 로드
draggablePoints(Highcharts);
variwide(Highcharts);

interface DataPoint {
  name: string;
  y: number; // Thickness에 해당하는 값
  z: number; // Working Time 해당하는 값
  x: number; // sequence number
  supplyCompleted?: boolean; // is the supply completed by user?
  startTime?: string; // work start time
  endTime?: string; // work end time
  rejected?: boolean; // is the point rejected by user?
}

const baseValues = {
  supplyCompleted: false,
  startTime: '',
  endTime: '',
  rejected: false,
};

const initialData: DataPoint[] = [
  {
    name: 'C1CAL0001A',
    y: 7.3,
    z: 30,
    x: 1,
  },
  { name: 'C1CAL0002B', y: 6.2, z: 45, x: 2 },
  { name: 'C1CAL0003A', y: 5.8, z: 50, x: 3 },
  { name: 'C1CAL0004B', y: 7.1, z: 25, x: 4 },
  { name: 'C1CAL0005A', y: 6.4, z: 35, x: 5 },
  { name: 'C1CAL0006B', y: 5.9, z: 40, x: 6 },
  { name: 'C1CAL0007A', y: 7.2, z: 20, x: 7 },
  { name: 'C1CAL0008B', y: 6.8, z: 15, x: 8 },
  { name: 'C1CAL0009A', y: 5.7, z: 55, x: 9 },
  { name: 'C1CAL0010B', y: 6.5, z: 50, x: 10 },

  { name: 'C1CAL0011A', y: 7.4, z: 60, x: 11 },
  { name: 'C1CAL0012B', y: 5.6, z: 22, x: 12 },
  { name: 'C1CAL0013A', y: 6.1, z: 48, x: 13 },
  { name: 'C1CAL0014B', y: 7.0, z: 36, x: 14 },
  { name: 'C1CAL0015A', y: 5.8, z: 34, x: 15 },
  { name: 'C1CAL0016B', y: 6.7, z: 43, x: 16 },
  { name: 'C1CAL0017A', y: 7.3, z: 29, x: 17 },
  { name: 'C1CAL0018B', y: 5.5, z: 18, x: 18 },
  { name: 'C1CAL0019A', y: 6.9, z: 50, x: 19 },
  { name: 'C1CAL0020B', y: 5.8, z: 55, x: 20 },

  { name: 'C1CAL0021A', y: 6.4, z: 39, x: 21 },
  { name: 'C1CAL0022B', y: 7.1, z: 49, x: 22 },
  { name: 'C1CAL0023A', y: 5.7, z: 28, x: 23 },
  { name: 'C1CAL0024B', y: 6.6, z: 60, x: 24 },
  { name: 'C1CAL0025A', y: 7.2, z: 45, x: 25 },
  { name: 'C1CAL0026B', y: 5.9, z: 53, x: 26 },
  { name: 'C1CAL0027A', y: 6.3, z: 20, x: 27 },
  { name: 'C1CAL0028B', y: 7.0, z: 25, x: 28 },
  { name: 'C1CAL0029A', y: 6.7, z: 40, x: 29 },
  { name: 'C1CAL0030B', y: 5.8, z: 10, x: 30 },
];

const baseData = initialData.map((data) => {
  let newData = { ...data, ...baseValues };

  if (data.x == 3) {
    newData = {
      ...newData,
      supplyCompleted: true,
      rejected: true,
    };
  } else if (data.x < 5) {
    newData = {
      ...newData,
      supplyCompleted: true,
      startTime: '24/08/20-00:00:00',
      endTime: '24/08/20-00:00:00',
    };
  } else if (data.x < 12) {
    newData = { ...newData, supplyCompleted: true };
  }

  return newData;
});

console.log(baseData);

interface PropsType {
  filteredData?: DataPoint[] | undefined;
}

const DraggableChart: React.FC = ({ filteredData }: PropsType) => {
  // TODO: utils 로 옮기기
  const data = (filteredData ? filteredData : baseData).map((point) => ({
    ...point,
    color: point.rejected
      ? '#ff0c00a8' // case1: rejected 재료
      : point.supplyCompleted === true && point.endTime === ''
        ? 'yellowgreen' // case2: 보급완료 재료
        : point.supplyCompleted
          ? '#b3b3b3' // case3: 작업완료 재료
          : undefined, // case4: 작업예정 재료
  }));

  useEffect(() => {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'variwide',
        margin: [0, 0, 0, 30], // 마진 설정
        spacing: [0, 0, 0, 0], // 패딩 설정
        borderWidth: 0,
        // backgroundColor: 'lightgray',
      },
      title: {
        text: 'Draggable Variwide Chart',
        style: { display: 'none' },
      },
      xAxis: {
        type: 'category',
        labels: {
          enabled: true, // X축 라벨 숨기기
        },
      },
      yAxis: {
        title: {
          text: 'Thickness',
        },
        reversed: true, // Y축 반전
        max: 15, // Y축 최대값 설정
      },

      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'variwide',
          data: data,
        },
      ],
      plotOptions: {
        series: {
          stickyTracking: false,
          dataLabels: {
            // enabled: true,
            format: '{point.y:.0f} mm / {point.z:.0f} mins',
            style: {
              fontSize: '1.2rem', // 데이터 레이블의 글씨 크기
            },
          },
          tooltip: {
            pointFormat:
              'Thickness: <b> {point.y} mm</b><br>' +
              'W_Time: <b> {point.z} mins</b><br>',
          },
        },
      },
      // responsive: {
      //   rules: [
      //     {
      //       condition: {
      //         maxWidth: 800,
      //       },
      //       chartOptions: {
      //         chart: {
      //           width: '100%', // 특정 ��면 크기에서 반��형 ��비 조정
      //           height: '50%', // 특정 화면 크기에서 반응형 높이 조정
      //         },
      //       },
      //     },
      //   ],
      // },
    };

    Highcharts.chart('container', chartOptions);
  }, [data]);

  return (
    <div className={styles.graph}>
      <div
        id="container"
        style={{ width: '100%', height: '100%', marginTop: '-20px' }}></div>
    </div>
  );
};

export default DraggableChart;
