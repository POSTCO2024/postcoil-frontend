// Columns 정의
import { ColumnDataType } from '@postcoil/ui/config/TableConfig';
import { Tag } from 'antd';

import { MaterialDataType } from '@/config/scheduling/contentConfig';
import { MaterialDTO, WorkItemDTO } from '@/config/scheduling/dto';
// import { Tag } from 'antd';

export const materialColumnData: ColumnDataType<MaterialDataType>[] = [
  {
    title: '재료번호',
    dataIndex: 'materialNo',
    key: 'materialNo',
    fixed: true,
    width: 100,
  },
  { title: '공정코드', dataIndex: 'currProc', key: 'currProc', width: 90 },
  {
    title: '롤단위',
    dataIndex: 'rollUnit',
    key: 'rollUnit',
    sortable: true,
    width: 110,
    otherProps: {
      filters: [
        {
          text: 'A',
          value: 'A',
        },
        {
          text: 'B',
          value: 'B',
        },
      ],
      onFilter: (value: string, record: { rollUnit: string[] }) =>
        record.rollUnit.indexOf(value) === 0,
    },
  },
  { title: '폭', dataIndex: 'width', key: 'width', sortable: true, width: 90 },
  {
    title: '두께',
    dataIndex: 'thickness',
    key: 'thickness',
    sortable: true,
    width: 90,
  },
  {
    title: '목표폭',
    dataIndex: 'goalWidth',
    key: 'goalWidth',
    sortable: true,
    defaultSortOrder: 'descend',
    width: 90,
  },
  {
    title: '목표두께',
    dataIndex: 'goalThickness',
    key: 'goalThickness',
    sortable: true,
    width: 100,
  },
  {
    title: '온도',
    dataIndex: 'temperature',
    key: 'temperature',
    sortable: true,
    width: 80,
  },
  {
    title: '작업 예상 소요 시간',
    dataIndex: 'expectedDuration',
    key: 'expectedDuration',
    width: 90,
  },
  {
    title: '차공정',
    dataIndex: 'nextProc',
    key: 'nextProc',
    sortable: true,
    width: 110,
    otherProps: {
      filters: [
        {
          text: 'CGL',
          value: ['1CGL', '2CGL'],
        },
        {
          text: 'EGL',
          value: ['1EGL', '2EGL'],
        },
        {
          text: '포장',
          value: ['101', '201'],
        },
      ],
      onFilter: (value: string[], record: { nextProc: string[] }) => {
        // 배열의 교집합을 구해서 필터링
        return value.some((item) => record.nextProc.includes(item));
      },
    },
  },
];

export const coilTypeColumnData = [
  { title: '품종', dataIndex: 'type', key: 'type' },
  { title: '개수', dataIndex: 'count', key: 'count' },
];

export const workItemColumnData: ColumnDataType<MaterialDataType>[] = [
  {
    title: '순서', //'Seq.',
    dataIndex: 'sequence',
    key: 'sequence',
    fixed: true,
    width: 50,
  },
  {
    title: '재료번호',
    dataIndex: 'materialNo',
    key: 'materialNo',
    fixed: true,
    width: 90,
  },
  {
    title: '입측 폭',
    dataIndex: 'initialWidth',
    key: 'initialWidth',
    sortable: true,
    width: 80,
  },
  {
    title: '입측 두께',
    dataIndex: 'initialThickness',
    key: 'initialThickness',
    // sortable: true,
    width: 80,
  },
  {
    title: '목표폭',
    dataIndex: 'goalWidth',
    key: 'goalWidth',
    sortable: true,
    defaultSortOrder: 'descend',
    width: 80,
  },
  {
    title: '목표두께',
    dataIndex: 'goalThickness',
    key: 'goalThickness',
    // sortable: true,
    width: 80,
  },
  {
    title: '출측 폭',
    dataIndex: 'processedWidth',
    key: 'processedWidth',
    sortable: true,
    width: 80,
  },
  {
    title: '출측 두께',
    dataIndex: 'processedThickness',
    key: 'processedThickness',
    // sortable: true,
    width: 80,
  },
  {
    title: '온도',
    dataIndex: 'temperature',
    key: 'temperature',
    sortable: true,
    width: 80,
  },
  {
    title: '차공정',
    dataIndex: 'nextProc',
    key: 'nextProc',
    sortable: true,
    otherProps: {
      filters: [
        {
          text: 'CGL',
          value: '1CGL' || '2CGL',
        },
        {
          text: 'EGL',
          value: '1EGL' || '2EGL',
        },
        {
          text: '포장',
          value: '101' || '201',
        },
      ],
      onFilter: (value: string, record: { nextProc: string[] }) =>
        record.nextProc.indexOf(value) === 0,
    },
    width: 100,
  },
  {
    title: '품종',
    dataIndex: 'coilTypeCode',
    key: 'coilTypeCode',
    width: 80,
  },
  {
    title: '작업 소요 시간',
    dataIndex: 'expectedDuration',
    key: 'expectedDuration',
    width: 120,
  },
  {
    title: '작업 시작 시간',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 200,
  },
  {
    title: '작업 종료 시간',
    dataIndex: 'endTime',
    key: 'endTime',
    width: 200,
  },

  {
    title: 'Reject 여부',
    dataIndex: 'isRejected',
    key: 'isRejected',
    render: (key: string, record) =>
      record.isRejected === 'Y' ? (
        <Tag key={key} color="red">
          Reject
        </Tag>
      ) : (
        <Tag color="green">OK</Tag>
      ),
    otherProps: {
      filters: [
        {
          text: <Tag color="red">Reject</Tag>,
          value: 'Y',
        },
        {
          text: <Tag color="green">OK</Tag>,
          value: 'N',
        },
      ],
      onFilter: (value: string, record: { isRejected: string[] }) =>
        record.isRejected.indexOf(value) === 0,
    },
    width: 120,
  },
];

export const transformedData = (data: MaterialDTO[]): MaterialDataType[] => {
  // sequence가 null이 아닌 항목만 필터링하고, 정렬
  if (
    data.length > 0 &&
    data[0].sequence !== null &&
    (data[0].sequence as number) > 0
  ) {
    data.sort((a, b) => (a.sequence as number) - (b.sequence as number)); // type assertion 사용
  }

  return data.map((item) => ({
    key: item.id,
    id: item.id as string,
    materialNo: item.materialNo,
    currProc: item.currProc,
    temperature: item.temperature,
    rollUnit: item.rollUnit,
    width: item.width,
    thickness: item.thickness,
    nextProc: item.nextProc,
    goalWidth: item.goalWidth,
    goalThickness: item.goalThickness,
    sequence: item.sequence,
    isScheduled: item.isScheduled,
    isRejected: item.isRejected,
    expectedDuration: item.expectedDuration,
    schedulePlanId: item.schedulePlanId,
    changed: item.changed,
  }));
};

export const transformedCoilTypeCodeData = (countCoilTypeCode: {
  [type: string]: number | string;
}) =>
  Object.entries(countCoilTypeCode).map(([type, count], index) => ({
    key: (index + 1).toString(),
    id: (index + 1).toString(),
    type: type,
    count: count,
  }));

export const transformedWorkItemData = (
  data: WorkItemDTO[],
): MaterialDataType[] => {
  // sequence가 null이 아닌 항목만 필터링하고, 정렬
  if (
    data.length > 0 &&
    data[0].sequence !== null &&
    (data[0].sequence as number) > 0
  ) {
    data.sort((a, b) => (a.sequence as number) - (b.sequence as number));
  }

  const formatIfMoreThanThreeDecimals = (value: number | string) => {
    if (value != null) {
      const decimalCount = value.toString().split('.')[1]?.length || 0;
      return decimalCount > 3
        ? Math.round((value as number) * 1000) / 1000
        : value;
    }
    return undefined;
  };

  return data.map((item) => {
    const shouldDisplayDimensions =
      item.endTime !== null && item.endTime !== '';
    return {
      key: item.id,
      id: item.id as string,
      materialNo: item.materialNo,
      sequence: item.sequence,
      isRejected: item.isRejected,
      expectedDuration: item.expectedItemDuration,
      startTime: item.startTime,
      endTime: item.endTime,
      goalWidth: formatIfMoreThanThreeDecimals(item.initialGoalWidth),
      goalThickness: formatIfMoreThanThreeDecimals(item.initialGoalThickness!),
      initialWidth: formatIfMoreThanThreeDecimals(item.initialWidth!),
      initialThickness: formatIfMoreThanThreeDecimals(item.initialThickness),
      width: formatIfMoreThanThreeDecimals(item.width!),
      thickness: formatIfMoreThanThreeDecimals(item.thickness!),
      processedWidth: shouldDisplayDimensions
        ? formatIfMoreThanThreeDecimals(item.width!)
        : undefined, // endTime이 null 또는 ''이면 비움
      processedThickness: shouldDisplayDimensions
        ? formatIfMoreThanThreeDecimals(item.thickness!)
        : undefined, // endTime이 null 또는 ''이면 비움
      temperature: shouldDisplayDimensions
        ? formatIfMoreThanThreeDecimals(item.temperature)
        : undefined,
      nextProc: item.nextProc,
      coilTypeCode: item.coilTypeCode,
      weight: formatIfMoreThanThreeDecimals(item.weight as number),
    };
  });
};
