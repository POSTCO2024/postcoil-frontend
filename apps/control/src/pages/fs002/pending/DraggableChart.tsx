/* eslint-disable @typescript-eslint/no-this-alias */
import { Button } from 'antd';
import Highcharts, { PointDragDropObject } from 'highcharts';
import draggablePoints from 'highcharts/modules/draggable-points';
import variwide from 'highcharts/modules/variwide';
import React, { useState, useEffect } from 'react';

import styles from './DraggableChart.module.scss';

// 모듈 로드
draggablePoints(Highcharts);
variwide(Highcharts);

interface DataPoint {
  name: string;
  y: number; // length에 해당하는 값
  z: number; // width에 해당하는 값
  x: number; // sequence number
}

interface NewPointDragDropObject extends PointDragDropObject {
  x: number;
}

const initialData: DataPoint[] = [
  { name: '1', y: 50.2, z: 20, x: 1 },
  { name: '2', y: 42, z: 30, x: 2 },
  { name: '3', y: 39.2, z: 40, x: 3 },
  { name: '4', y: 38, z: 35, x: 4 },
  { name: '5', y: 35.6, z: 25, x: 5 },
];

interface PropsType {
  filteredData?: DataPoint[] | undefined;
}

const DraggableChart: React.FC = ({ filteredData }: PropsType) => {
  const clonedData = filteredData ? filteredData : initialData;

  const [data, setData] = useState(clonedData.map((point) => ({ ...point })));

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
          dragDrop: {
            draggableY: true,
            draggableX: true,
            liveRedraw: false,
          },
          point: {
            events: {
              dragStart: function () {
                // 드래그된 막대의 그래픽 요소
                const draggedGraphic = this.graphic!;

                // 드래그 시작 시 guideBox (rect) 요소를 찾음
                const guideBox =
                  draggedGraphic.element.parentElement?.lastElementChild; //rect
                if (guideBox) {
                  // 새로운 x 및 width 값
                  const newX = draggedGraphic.getBBox().x;
                  const newWidth = draggedGraphic.getBBox().width as number;

                  // guideBox의 x 및 width 속성을 업데이트
                  guideBox.setAttribute('x', newX.toString());
                  guideBox.setAttribute('width', newWidth.toString());
                }
              },
              drag: function () {
                const point = this;

                const draggedGraphic = point.graphic; // 드래그 중인 막대의 SVG 요소에 접근
                if (draggedGraphic) {
                  // 예: 드래그 중인 막대의 색상을 변경
                  draggedGraphic.attr({
                    fill: 'rgba(255,0,0,0.5)', // 임시로 빨간색 반투명으로 변경
                  });
                }
              },

              drop: function (e) {
                const draggedPoint = this as Highcharts.Point;
                const updatedData = [...data];
                const newPoint = e.newPoint! as NewPointDragDropObject;

                const selectedX = newPoint.x;

                // 드래그된 포인트의 현재 인덱스
                const pointIndex = updatedData.findIndex(
                  (p) => p.name === draggedPoint.name,
                );

                // 변경되었다면
                if (pointIndex != selectedX - 1) {
                  this.update({
                    color: 'rgba(0, 0, 256, 0.6)', // 반투명 보라색으로 변경
                  });
                }

                // 드래그된 위치에서의 x 값 (1과 데이터 길이 사이로 제한)
                const newX = Math.max(
                  1,
                  Math.min(selectedX, updatedData.length),
                );

                // 기존 위치에서 포인트 제거
                const [movedPoint] = updatedData.splice(pointIndex, 1);

                // newX에 위치한 인덱스에 포인트 삽입
                updatedData.splice(newX - 1, 0, {
                  ...movedPoint,
                  x: newX,
                });

                // x 값을 1부터 순서대로 재정렬
                const sortedData = updatedData.map((point, index) => ({
                  ...point,
                  x: index + 1,
                }));

                // 상태 업데이트
                setData(sortedData);
              },
            },
          },
        },
      ],
      plotOptions: {
        series: {
          stickyTracking: false,
          dragDrop: {
            dragMinY: 0,
            liveRedraw: true,
            guideBox: {
              default: {
                className: 'guidebox',
              },
            },
          },
        },
      },
    };

    Highcharts.chart('container', chartOptions);
  }, [data]);

  const resetData = () => {
    setData(
      clonedData.map((point) => ({
        ...point,
      })),
    );
  };

  return (
    <div className={styles.graph}>
      <Button className={styles.btn} onClick={resetData}>
        Reset
      </Button>
      <div id="container"></div>
    </div>
  );
};

export default DraggableChart;
