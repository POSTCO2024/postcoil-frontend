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
  y: number; // length에 해당하는 값
  z: number; // width에 해당하는 값
  x: number; // sequence number
  changed?: boolean; // is the point changed by user?
}

const initialData: DataPoint[] = [
  { name: '1', y: 50.2, z: 20, x: 1 },
  { name: '2', y: 42, z: 30, x: 2, changed: true },
  { name: '3', y: 39.2, z: 40, x: 3 },
  { name: '4', y: 38, z: 35, x: 4 },
  { name: '5', y: 35.6, z: 25, x: 5 },
];

interface PropsType {
  filteredData?: DataPoint[] | undefined;
}

const DraggableChart: React.FC = ({ filteredData }: PropsType) => {
  // TODO: utils 로 옮기기
  const data = (filteredData ? filteredData : initialData).map((point) => ({
    ...point,
    color: point.changed ? '#ff5f4c' : undefined, // changed: true인 항목에만 색상 적용
  }));

  useEffect(() => {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'variwide',
      },
      title: {
        text: 'Draggable Variwide Chart',
        style: { display: 'none' },
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        title: {
          text: 'Width',
        },
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

    Highcharts.chart('container', chartOptions);
  }, [data]);

  return (
    <div className={styles.graph}>
      <div id="container"></div>
    </div>
  );
};

export default DraggableChart;
