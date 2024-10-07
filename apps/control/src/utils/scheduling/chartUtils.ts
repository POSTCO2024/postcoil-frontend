import {
  CoilSupplyDTO,
  MaterialDTO,
  WorkItemDTO,
} from '@/config/scheduling/dto';

export const transformedDataToDraggableChartData = (
  data: MaterialDTO[],
  name?: 'width' | 'thickness',
) => {
  // sequence 순서에 따라 data를 정렬
  const sortedData = data.sort(
    (a, b) => (a.sequence as number) - (b.sequence as number),
  );

  return sortedData.map((item) => ({
    name: item.id as string,
    description: item.materialNo as string,
    y:
      name === 'width'
        ? (item.goalWidth as number)
        : (item.thickness as number),
    z: item.expectedDuration as number,
    x: item.sequence as number,
    id: item.id as string,
    changed: item.changed,
    color: item.changed ? '#6464ff' : '#7da2f5',
  }));
};

export const transformedDataToTimelineChartData = (
  data: WorkItemDTO[],
  name?: 'width' | 'thickness',
) => {
  // sequence 순서에 따라 data를 정렬
  const sortedData = data.sort(
    (a, b) => (a.sequence as number) - (b.sequence as number),
  );

  return sortedData.map((item) => ({
    name: item.id as string,
    description: item.materialNo as string,
    y:
      name === 'width'
        ? (item.initialGoalWidth as number)
        : (item.initialThickness as number),
    z: item.expectedItemDuration as number,
    x: item.sequence as number,
    id: item.id as string,
    color: item.isRejected === 'Y' ? '#ff9382' : 'lightgray',
  }));
};

export const transformedDataToResultChartData = (
  data: WorkItemDTO[],
  coilSupplyData: CoilSupplyDTO,
  name?: 'width' | 'thickness',
) => {
  // sequence 순서에 따라 data를 정렬
  const sortedData = data.sort(
    (a, b) => (a.sequence as number) - (b.sequence as number),
  );

  // 색상을 배정하기 위한 인덱스 카운터 초기화
  let completedIndex = 0; // 작업 완료 인덱스
  let pendingIndex = 0; // 작업 예정 인덱스
  let supplyIndex = 0; // 보급 예정 인덱스
  let currentIndex = 0; // 전체 배열을 순회할 때 사용할 인덱스

  const newSuppliedCoils = // 보급완료
    coilSupplyData.suppliedCoils >=
    coilSupplyData.totalCoils - coilSupplyData.totalRejects
      ? coilSupplyData.totalCoils - coilSupplyData.totalRejects
      : coilSupplyData.suppliedCoils;

  const pendingSuppliedCoils =
    coilSupplyData.totalCoils - coilSupplyData.totalRejects - newSuppliedCoils; // 보급 예정

  const pendingProgressedCoils =
    newSuppliedCoils - coilSupplyData.totalProgressed; // 작업 예정

  return sortedData.map((item) => {
    let targetColor;

    // rejected 항목은 따로 색을 지정하고, 인덱스를 증가시키지 않음
    if (item.isRejected === 'Y') {
      targetColor = '#F1655E'; // case1: rejected 재료
      currentIndex++; // 리젝된 코일도 인덱스를 넘김
    } else {
      // 작업 완료 재료 색상 배정
      if (coilSupplyData.totalProgressed > completedIndex) {
        targetColor = '#b3b3b3'; // 작업 완료 재료
        completedIndex++; // 작업 완료 인덱스 증가
      }
      // 작업 예정 재료 색상 배정
      else if (pendingProgressedCoils > pendingIndex) {
        targetColor = '#84DC72'; // 작업 예정 재료
        pendingIndex++; // 작업 예정 인덱스 증가
      }
      // 보급 예정 재료 색상 배정
      else if (pendingSuppliedCoils > supplyIndex) {
        targetColor = '#7da2f5'; // 보급 예정 재료
        supplyIndex++; // 보급 예정 인덱스 증가
      }

      currentIndex++; // 다음 인덱스를 위해 증가
    }

    return {
      name: item.workItemId as string,
      description: item.materialNo as string,
      y:
        name === 'width'
          ? (item.initialGoalWidth as number)
          : (item.initialThickness as number),
      z: item.expectedItemDuration as number,
      x: item.sequence as number,
      id: item.workItemId as string,
      color: targetColor,
    };
  });
};
