/* eslint-disable @typescript-eslint/no-this-alias */
import { PointDragDropObject } from 'highcharts';
import { useState, useEffect, useRef } from 'react';

import styles from './DraggableChart.module.scss';

import { MaterialDTO } from '@/config/scheduling/dto';
import Highcharts from '@/config/scheduling/highchartsSetup';
import {
  useHoverStore,
  useMaterialStore,
  useScrollStore,
} from '@/store/fs002store';
import { transformedDataToChartData } from '@/utils/scheduling/chartUtils';

interface DataPoint {
  name: string;
  y: number; // width | thickness 에 해당하는 값
  z: number; // working time 에 해당하는 값
  x: number; // sequence number
  id: string;
  changed?: boolean; // is the point changed by user?
  color?: string; // chart point color
}

interface NewPointDragDropObject extends PointDragDropObject {
  x: number;
}

interface PropsType {
  chartName: 'width' | 'thickness';
}

const DraggableChart = ({ chartName }: PropsType) => {
  const id = 'draggableChart-' + chartName;
  const materialData = useMaterialStore((state) => state.data);
  const title = useMaterialStore((state) => state.scheduleNo);
  const updateData = useMaterialStore((state) => state.updateData!);
  const { hoveredPoint, setHoveredPoint } = useHoverStore();

  const expectedDuration = useMaterialStore(
    (state) => state.scExpectedDuration,
  );

  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    if (materialData && materialData.length > 0) {
      const transformed = transformedDataToChartData(materialData, chartName);
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
        width: (expectedDuration as number) * 3,
        height: 200, // (9 / 16) * 100 + '%', // 16:9 ratio
        // scrollablePlotArea: {
        //   minWidth: 700, // Minimum width of the plot area
        //   scrollPositionX: 1, // Start scrolling at the right side
        // },
        marginTop: chartName === 'width' ? 30 : 0,
        marginBottom: chartName === 'width' ? 0 : 50,
      },
      title: {
        text: data.length > 0 ? title : '',
        style: { display: 'none' },
        // style: { fontFamily: 'Helvetica Neue', fontWeight: '500' },
        verticalAlign: 'bottom',
      },
      xAxis: {
        type: 'category',
        labels: {
          enabled: true, // 라벨을 표시하도록 설정
          formatter: function (): string {
            // 첫 번째와 마지막 인덱스일 때만 라벨을 표시
            const index = this.pos; // 현재 포인트의 인덱스
            const dataLength = data.length; // 데이터의 길이

            if (index === 0 || index === dataLength - 1) {
              return this.value as string; // 첫 번째 또는 마지막 인덱스일 때 라벨 표시
            }
            return ''; // 다른 인덱스는 빈 문자열로 설정하여 표시하지 않음
          },
        },
        categories: data.map(() =>
          ((expectedDuration as number) / 60).toString(),
        ), // x축 라벨로 사용할 값
      },
      yAxis: {
        title: {
          text: chartName,
        },
        labels: {
          enabled: false,
        },
        reversed: chartName === 'width' ? false : true, // Y축 반전 여부
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
              mouseOver: function () {
                setHoveredPoint(this); // 상태에 현재 포인터 정보를 저장
              },
              mouseOut: function () {
                setHoveredPoint(null); // 상태 초기화
              },
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
                const newPoint = e.newPoint as NewPointDragDropObject;

                // Check if the drop position is the same as the original position
                if (draggedPoint.x === newPoint.x) {
                  // Do nothing if the position hasn't changed
                  return;
                }

                const selectedX = newPoint.x;

                // 드래그된 포인트의 현재 인덱스
                const pointIndex = updatedData.findIndex(
                  (p) => p.name === draggedPoint.name,
                );

                // 변경되었다면
                if (pointIndex !== selectedX - 1) {
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
            distance: 8,
            headerFormat: '<b>{point.key}</b> <br/>',
            pointFormat:
              chartName +
              ': <b> {point.y} mm</b> <br/>' +
              'working Time: <b> {point.z} mins</b> <br/>',
          },
        },
      },
      tooltip: {
        shared: true,
        formatter: function () {
          // 상태에 저장된 hoveredPoint와 현재 포인터를 비교하여 두 차트에서 동시 호버 구현
          const point = hoveredPoint || this.point;
          return `<b>${point.name}</b><br/>${chartName}: <b>${point.y} mm</b><br/>작업 시간: <b>${point.z} 분</b>`;
        },
      },
    };

    const chart = Highcharts.chart(id, chartOptions);

    return () => {
      // 컴포넌트 언마운트 시 차트를 해제
      if (chart) {
        chart.destroy();
      }
    };
  }, [data]);

  const { scrollLeft, setScrollLeft } = useScrollStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  // x축 스크롤 동기화
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft;
    }
  }, [scrollLeft]);

  // useEffect(() => {
  //   if (hoveredPoint) {
  //     console.log(`Hovered point: ${hoveredPoint}`);
  //     // You can add logic to highlight or handle hover state across charts here
  //   }
  // }, [hoveredPoint]);

  return (
    <div
      id={id}
      className={styles.draggableChart}
      ref={containerRef}
      onScroll={handleScroll}></div>
  );
};

export default DraggableChart;
