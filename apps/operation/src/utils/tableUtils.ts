// Columns 정의
import { ColumnDataType } from '@postcoil/ui/config/TableConfig';

import { MaterialDataType } from '@/config/contentConfig';
import { WorkItemDTO } from '@/config/dto';
// import { Tag } from 'antd';

export const materialColumnData: ColumnDataType<MaterialDataType>[] = [
  {
    title: '재료번호',
    dataIndex: 'materialNo',
    key: 'materialNo',
    // fixed: true,
  },
  { title: '공정코드', dataIndex: 'currProc', key: 'currProc' },
  {
    title: '롤단위',
    dataIndex: 'rollUnit',
    key: 'rollUnit',
    sortable: true,
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
  { title: '폭', dataIndex: 'width', key: 'width', sortable: true },
  {
    title: '두께',
    dataIndex: 'thickness',
    key: 'thickness',
    sortable: true,
  },
  {
    title: '온도',
    dataIndex: 'temperature',
    key: 'temperature',
    sortable: true,
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
  },
  {
    title: '목표폭',
    dataIndex: 'goalWidth',
    key: 'goalWidth',
    sortable: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '목표두께',
    dataIndex: 'goalThickness',
    key: 'goalThickness',
    sortable: true,
  },
];

export const coilTypeColumnData = [
  { title: '품종', dataIndex: 'type', key: 'type' },
  { title: '개수', dataIndex: 'count', key: 'count' },
];

export const workItemColumnData: ColumnDataType<MaterialDataType>[] = [
  {
    title: 'Seq.',
    dataIndex: 'sequence',
    key: 'sequence',
  },
  {
    title: '재료번호',
    dataIndex: 'materialNo',
    key: 'materialNo',
    // fixed: true,
  },
  {
    title: '입측 폭',
    dataIndex: 'initialWidth',
    key: 'initialWidth',
    sortable: true,
  },
  {
    title: '입측 두께',
    dataIndex: 'initialThickness',
    key: 'initialThickness',
    // sortable: true,
  },
  {
    title: '목표폭',
    dataIndex: 'goalWidth',
    key: 'goalWidth',
    sortable: true,
    defaultSortOrder: 'descend',
  },
  {
    title: '목표두께',
    dataIndex: 'goalThickness',
    key: 'goalThickness',
    sortable: true,
  },
  {
    title: '출측 폭',
    dataIndex: 'processedWidth',
    key: 'processedWidth',
    sortable: true,
  },
  {
    title: '출측 두께',
    dataIndex: 'processedThickness',
    key: 'processedThickness',
    // sortable: true,
  },
  {
    title: '온도',
    dataIndex: 'temperature',
    key: 'temperature',
    sortable: true,
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
  },
  {
    title: '품종',
    dataIndex: 'coilTypeCode',
    key: 'coilTypeCode',
  },
  {
    title: '작업 시작 시간',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: '작업 종료 시간',
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: '작업 소요 시간',
    dataIndex: 'expectedDuration',
    key: 'expectedDuration',
  },
  {
    title: 'Reject 여부',
    dataIndex: 'isRejected',
    key: 'isRejected',
    otherProps: {
      filters: [
        {
          text: 'Y',
          value: 'Y',
        },
        {
          text: 'N',
          value: 'N',
        },
      ],
      onFilter: (value: string, record: { rollUnit: string[] }) =>
        record.rollUnit.indexOf(value) === 0,
    },
  },
];

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

  return data.map((item) => ({
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
    processedWidth: formatIfMoreThanThreeDecimals(item.width!),
    processedThickness: formatIfMoreThanThreeDecimals(item.thickness!),
    temperature: formatIfMoreThanThreeDecimals(item.temperature),
    nextProc: item.nextProc,
    coilTypeCode: item.coilTypeCode,
    weight: formatIfMoreThanThreeDecimals(item.weight as number),
  }));
};
