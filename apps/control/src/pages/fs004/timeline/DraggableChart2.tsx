/* eslint-disable @typescript-eslint/no-this-alias */
import Highcharts from 'highcharts';
import draggablePoints from 'highcharts/modules/draggable-points';
import variwide from 'highcharts/modules/variwide';
import React, { useEffect } from 'react';

import styles from './DraggableChart2.module.scss';

// 모듈 로드
draggablePoints(Highcharts);
variwide(Highcharts);

interface DataPoint {
  name: string;
  y: number; // length에 해당하는 값
  z: number; // width에 해당하는 값
  x: number; // sequence number
  changed?: boolean; // is the point changed by user?
}

const initialData: DataPoint[] = [
  { name: 'C1CAL0001A', y: 50.2, z: 30, x: 1 },
  { name: 'C1CAL0002B', y: 48.8, z: 45, x: 2, changed: true },
  { name: 'C1CAL0003A', y: 47.5, z: 50, x: 3 },
  { name: 'C1CAL0004B', y: 46.2, z: 25, x: 4 },
  { name: 'C1CAL0005A', y: 45.0, z: 35, x: 5 },
  { name: 'C1CAL0006B', y: 43.8, z: 40, x: 6 },
  { name: 'C1CAL0007A', y: 42.6, z: 20, x: 7 },
  { name: 'C1CAL0008B', y: 41.5, z: 15, x: 8 },
  { name: 'C1CAL0009A', y: 40.4, z: 55, x: 9 },
  { name: 'C1CAL0010B', y: 39.3, z: 50, x: 10 },

  { name: 'C1CAL0011A', y: 38.3, z: 60, x: 11 },
  { name: 'C1CAL0012B', y: 37.2, z: 22, x: 12 },
  { name: 'C1CAL0013A', y: 36.2, z: 48, x: 13 },
  { name: 'C1CAL0014B', y: 35.2, z: 36, x: 14 },
  { name: 'C1CAL0015A', y: 34.2, z: 34, x: 15 },
  { name: 'C1CAL0016B', y: 33.2, z: 43, x: 16 },
  { name: 'C1CAL0017A', y: 32.3, z: 29, x: 17 },
  { name: 'C1CAL0018B', y: 31.3, z: 18, x: 18 },
  { name: 'C1CAL0019A', y: 30.4, z: 50, x: 19 },
  { name: 'C1CAL0020B', y: 29.5, z: 55, x: 20 },

  { name: 'C1CAL0021A', y: 28.7, z: 39, x: 21 },
  { name: 'C1CAL0022B', y: 27.8, z: 49, x: 22 },
  { name: 'C1CAL0023A', y: 27.0, z: 28, x: 23 },
  { name: 'C1CAL0024B', y: 26.2, z: 60, x: 24 },
  { name: 'C1CAL0025A', y: 25.4, z: 45, x: 25 },
  { name: 'C1CAL0026B', y: 24.6, z: 53, x: 26 },
  { name: 'C1CAL0027A', y: 23.9, z: 20, x: 27 },
  { name: 'C1CAL0028B', y: 23.1, z: 25, x: 28 },
  { name: 'C1CAL0029A', y: 22.4, z: 40, x: 29 },
  { name: 'C1CAL0030B', y: 21.7, z: 10, x: 30 },
];

interface PropsType {
  filteredData?: DataPoint[] | undefined;
}

const DraggableChart2: React.FC = ({ filteredData }: PropsType) => {
  // TODO: utils 로 옮기기
  const data = (filteredData ? filteredData : initialData).map((point) => ({
    ...point,
    color: point.changed ? '#ff9382' : 'lightgray', // changed: true인 항목에만 색상 적용
  }));

  useEffect(() => {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'variwide',
        margin: [0, 0, 20, 30], // 마진 설정
        spacing: [0, 0, 0, 0], // 패딩 설정
      },
      title: {
        text: 'Draggable Variwide Chart',
        style: { display: 'none' },
      },
      xAxis: {
        type: 'category',
        labels: {
          enabled: false, // X축 라벨 숨기기
        },
      },
      yAxis: {
        title: {
          text: 'Width',
        },
        // reversed: true, // Y축 반전
        // min: -20, // Y축 최소값 설정
        // max: 30, // Y축 최대값 설정
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
            enabled: true,
            format: '{point.y:.0f} mm / {point.z:.0f} mins',
            style: {
              fontSize: '1.2rem', // 데이터 레이블의 글씨 크기
            },
          },
          tooltip: {
            pointFormat:
              'Width: <b> {point.y} mm</b><br>' +
              'W_Time: <b> {point.z} mins</b><br>',
          },
        },
      },
    };

    Highcharts.chart('container2', chartOptions);
  }, [data]);

  return (
    <div className={styles.graph2}>
      <div id="container2" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default DraggableChart2;
