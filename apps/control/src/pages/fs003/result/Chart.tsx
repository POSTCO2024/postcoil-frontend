import { useState, useEffect, useRef } from 'react';

import styles from './Chart.module.scss';

import Highcharts from '@/config/scheduling/highchartsSetup';
import {
  useHoverStore,
  useScrollStore,
  useWorkInstructionStore,
} from '@/store/fs003store';
import { transformedDataToResultChartData } from '@/utils/scheduling/chartUtils';

interface DataPoint {
  name: string;
  description?: string;
  y: number; // width | thickness 에 해당하는 값
  z: number; // working time 에 해당하는 값
  x: number; // sequence number
  id: string;
  changed?: boolean; // is the point changed by user?
  color?: string; // chart point color
}

interface PropsType {
  chartName: 'width' | 'thickness';
}

const Chart = ({ chartName }: PropsType) => {
  const id = 'resultChart-' + chartName;
  const scheduleNo = useWorkInstructionStore((state) => state.scheduleNo);

  const materialData = useWorkInstructionStore((state) => state.workItems);

  const coilSupplyData = useWorkInstructionStore(
    (state) => state.coilSupplyData!,
  );

  const { hoveredPoint, setHoveredPoint } = useHoverStore();

  const expectedDuration = useWorkInstructionStore(
    (state) => state.scExpectedDuration,
  );
  // const categories: string[] = [];
  // const interval = 0.5; // 간격

  // // 0부터 expectedDuration까지 interval 간격으로 라벨 생성
  // for (let i = 0; i <= (expectedDuration as number); i += interval) {
  //   categories.push(i.toFixed(1)); // 소수점 1자리까지 표시
  // }
  // z 값의 총합 계산
  const totalWorkingTime = useWorkInstructionStore(
    (state) => state.scExpectedDuration as number,
  );
  const totalHours = Math.floor(totalWorkingTime / 60); // 60분을 기준으로 시간 단위로 변환

  const categories: string[] = [];
  const interval = 1; // 1시간 간격

  // 0부터 totalHours까지 1시간 간격으로 라벨 생성
  for (let i = 0; i <= totalHours; i += interval) {
    categories.push(`${i}시간`);
  }

  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    if (materialData && materialData.length > 0) {
      const transformed = transformedDataToResultChartData(
        materialData,
        coilSupplyData,
        chartName,
      );
      setData(transformed);
    } else {
      setData([]);
    }
    console.log('data', data);
  }, [materialData]); // materialData가 변경될 때마다 실행

  // useEffect(() => {
  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'variwide',
      width: 72 + (expectedDuration as number) * 3, // 72: y축 라벨 너비
      // height: , // (9 / 16) * 100 + '%', // 16:9 ratio
      // scrollablePlotArea: {
      //   minWidth: 700, // Minimum width of the plot area
      //   scrollPositionX: 1, // Start scrolling at the right side
      // },
      marginTop: chartName === 'width' ? 30 : 0,
      marginBottom: chartName === 'width' ? 0 : 60,
    },
    title: {
      text: data.length > 0 ? scheduleNo : '',
      style: { display: 'none' },
      // style: { fontFamily: 'Helvetica Neue', fontWeight: '500' },
      verticalAlign: 'bottom',
    },
    xAxis: {
      // TODO: label 고치기
      // tickInterval: 1, // 틱 간격 설정
      // type: 'category',
      labels: {
        enabled: false, // 라벨을 표시하도록 설정
        useHTML: true, // HTML로 렌더링
        style: {
          fontSize: '11px', // 글꼴 크기 조정
        },
        // formatter: function () {
        //   // const index = this.pos as number; // 현재 라벨의 x축 위치 값
        //   // if (index % 1 === 0) {
        //   //   return categories[Math.floor(index)] || ''; // 1의 배수에 해당하는 카테고리 라벨 표시
        //   // } else {
        //   return (this.value as number).toFixed(1); // 나머지 부분은 빈 라벨로 처리
        // },
      },
      type: 'category', // x축을 category 타입으로 유지
      categories: categories, // 카테고리를 배열로 전달
      gridLineWidth: 1, // Add gridlines
      gridLineDashStyle: 'Dash',
    },
    yAxis: {
      title: {
        text: chartName === 'width' ? 'Width' : 'Thickness',
        useHTML: true,
        style: {
          fontWeight: 'bold',
          fontSize: '11px',
        },
      },
      labels: {
        enabled: true,
        useHTML: true, // HTML로 렌더링
        style: {
          textAlign: 'right', // 정렬 설정
          fontSize: '10px', // 글꼴 크기 조정
        },
        formatter: function () {
          const strValue = this.value.toString();
          if (strValue.length > 5) {
            return Math.floor(this.value as number).toString();
          }
          return `<span style="width: 25px; display: inline-block;">${strValue.padStart(5, ' ')}</span>`;
        },
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

        point: {
          events: {
            mouseOver: function () {
              setHoveredPoint(this); // 상태에 현재 포인터 정보를 저장
            },
            mouseOut: function () {
              setHoveredPoint(null); // 상태 초기화
            },
          },
        },
      },
      // {
      //   type: 'line',
      //   data: [
      //     // x값과 기준 y값을 설정
      //     [1, 2],
      //     [20, 9],
      //   ],
      //   lineWidth: 2, // 선 두께
      //   color: '#FF0000', // 선 색상
      //   dashStyle: 'Dash', // 선 스타일을 점선으로 설정
      //   marker: {
      //     enabled: false, // 마커 비활성화
      //   },
      // },
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
        return `<b>${point.description}</b><br/>${chartName}: <b>${point.y} mm</b><br/>작업 시간: <b>${point.z} 분</b>`;
      },
    },
  };

  // const chart = Highcharts.chart(id, chartOptions);
  useEffect(() => {
    const chart = Highcharts.chart(id, chartOptions);

    return () => {
      // 컴포넌트 언마운트 시 차트를 해제
      if (chart) {
        chart.destroy();
      }
    };
  }, [data, coilSupplyData]);
  //   return () => {
  //     // 컴포넌트 언마운트 시 차트를 해제
  //     if (chart) {
  //       chart.destroy();
  //     }
  //   };
  // }, [data]);

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
      className={styles.chart}
      ref={containerRef}
      onScroll={handleScroll}></div>
  );
};

export default Chart;
