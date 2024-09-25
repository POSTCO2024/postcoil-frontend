/* eslint-disable @typescript-eslint/no-this-alias */
import { Button } from 'antd';
import { PointDragDropObject } from 'highcharts';
import React, { useState, useEffect } from 'react';

import styles from './DraggableChart.module.scss';

import { MaterialDTO } from '@/config/scheduling/DTO';
import Highcharts from '@/config/scheduling/highchartsSetup';
import { useMaterialStore } from '@/store/fs002store';
import { transformedDataToChartData } from '@/utils/scheduling/chartUtils';

interface DataPoint {
  name: string;
  y: number; // width 에 해당하는 값
  z: number; // working time 에 해당하는 값
  x: number; // sequence number
  id: string;
  changed?: boolean; // is the point changed by user?
  color?: string; // chart point color
}

interface NewPointDragDropObject extends PointDragDropObject {
  x: number;
}

const DraggableChart: React.FC = () => {
  const materialData = useMaterialStore((state) => state.data);
  const title = useMaterialStore((state) => state.scheduleNo);
  const updateData = useMaterialStore((state) => state.updateData!);
  const resetData = useMaterialStore((state) => state.resetData!);

  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    if (materialData && materialData.length > 0) {
      const transformed = transformedDataToChartData(materialData, 'width');
      setData(transformed);
    } else {
      setData([]);
    }
    console.log('data', data);
  }, [materialData]); // materialData가 변경될 때마다 실행

  useEffect(() => {
    const chartOptions: Highcharts.Options = {
      chart: {
        type: 'variwide',
      },
      title: {
        text: data.length > 0 ? title : '',
        // style: { display: 'none' },
        style: { fontFamily: 'Helvetica Neue', fontWeight: '500' },
        verticalAlign: 'bottom',
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
                    color: '#6464ff', // 반투명 보라색으로 변경
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
                  changed: true,
                });

                // x 값을 1부터 순서대로 재정렬
                const sortedData = updatedData.map((point, index) => ({
                  ...point,
                  x: index + 1,
                }));

                // 상태 업데이트
                setData(sortedData);

                // 기존의 materialData 유지하면서, 필요한 값만 업데이트
                const updatedMaterialData = sortedData.map((sortedPoint) => {
                  const originalPoint = materialData!.find(
                    (p: MaterialDTO) => p.id === sortedPoint.id,
                  );

                  return {
                    ...originalPoint, // 기존 materialData 값 유지
                    changed: sortedPoint.changed, // sortedData에서 changed 가져옴
                  };
                });

                updateData(updatedMaterialData); // Zustand를 이용한 데이터 업데이트
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
          dataLabels: {
            // enabled: true,
            format: '{point.y:.0f} mm / {point.z:.0f} mins',
            style: {
              fontSize: '1.2rem', // 데이터 레이블의 글씨 크기
            },
          },
          tooltip: {
            pointFormat:
              'Width: <b> {point.y} mm</b><br>' +
              'Working Time: <b> {point.z} mins</b><br>',
          },
        },
      },
    };

    Highcharts.chart('draggableChart', chartOptions);
  }, [data]);

  const handleReset = () => {
    resetData(); // 원본 데이터로 복원
  };

  return (
    <div className={styles.graph}>
      <Button className={styles.btn} onClick={handleReset}>
        Reset
      </Button>
      <div id="draggableChart"></div>
    </div>
  );
};

export default DraggableChart;
