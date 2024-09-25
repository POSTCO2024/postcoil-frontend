import { MaterialDTO } from '@/config/scheduling/DTO';

export const transformedDataToChartData = (
  data: MaterialDTO[],
  name?: 'width' | 'thickness',
) => {
  // sequence 순서에 따라 data를 정렬
  const sortedData = data.sort(
    (a, b) => (a.sequence as number) - (b.sequence as number),
  );

  return sortedData.map((item) => ({
    name: item.materialNo as string,
    y: name === 'width' ? (item.width as number) : (item.thickness as number),
    z: item.expectedDuration as number,
    x: item.sequence as number,
    id: item.id as string,
    changed: item.changed,
    color: item.changed ? '#6464ff' : '#7da2f5',
  }));
};
