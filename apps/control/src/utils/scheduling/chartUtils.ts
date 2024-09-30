import { MaterialDTO, WorkItemDTO } from '@/config/scheduling/dto';

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
