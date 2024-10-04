import { ColumnDataType, DataType } from '@postcoil/ui/config/TableConfig';

export const mockCoilTypeCodeData = [
  { key: '1', id: '1', type: 'AA', count: '5' },
  { key: '2', id: '2', type: 'BB', count: '10' },
  { key: '3', id: '3', type: 'CC', count: '3' },
  { key: '4', id: '4', type: 'DD', count: '4' },
  { key: '5', id: '4', type: 'EE', count: '14' },
  { key: '6', id: '4', type: 'FF', count: '9' },
];

export const mockWorkInstructions = [
  {
    id: 50,
    workNo: 'W1C001EYB',
    scheduleId: 1,
    scheduleNo: 'S1CAL001B',
    process: '1CAL',
    rollUnit: 'B',
    totalQuantity: 2,
    expectedDuration: 34,
    startTime: null,
    endTime: null,
    schStatus: 'PENDING',
    items: [
      {
        id: 51,
        materialId: 68,
        materialNo: 'CB955910',
        targetId: 157,
        workItemStatus: 'PENDING',
        sequence: 2,
        isRejected: 'N',
        expectedItemDuration: 19,
        startTime: null,
        endTime: null,
        initialThickness: 1.03,
        initialGoalWidth: 1100,
      },
      {
        id: 52,
        materialId: 6,
        materialNo: 'CU250563',
        targetId: 194,
        workItemStatus: 'PENDING',
        sequence: 1,
        isRejected: 'N',
        expectedItemDuration: 15,
        startTime: null,
        endTime: null,
        initialThickness: 1.66,
        initialGoalWidth: 1026,
      },
    ],
  },
  {
    id: 51,
    workNo: 'W1C002EYB',
    scheduleId: 1,
    scheduleNo: 'S1CAL002B',
    process: '1CAL',
    rollUnit: 'B',
    totalQuantity: 2,
    expectedDuration: 34,
    startTime: '2024-09-28 15:04:38',
    endTime: null,
    schStatus: 'IN_PROGRESS',
    items: [
      {
        id: 54,
        materialId: 2,
        materialNo: 'CB955911',
        targetId: 12,
        workItemStatus: 'IN_PROGRESS',
        sequence: 1,
        isRejected: 'N',
        expectedItemDuration: 20,
        startTime: '2024-09-28 15:04:38',
        endTime: null,
        initialThickness: 1.03,
        initialGoalWidth: 1100,
      },
      {
        id: 59,
        materialId: 26,
        materialNo: 'CU250562',
        targetId: 15,
        workItemStatus: 'PENDING',
        sequence: 2,
        isRejected: 'N',
        expectedItemDuration: 25,
        startTime: null,
        endTime: null,
        initialThickness: 1.66,
        initialGoalWidth: 1026,
      },
    ],
  },
];

interface SchDataType extends DataType {
  key?: string;
  no: string | number;
  scheduleId: string;
  createdDate: string;
  rollID: string;
  facility: string;
  startTime: string;
  endTime: string;
  rejectCount?: string | number;
}

// Table 임의 데이터
export const columnsData: ColumnDataType<SchDataType>[] = [
  {
    title: 'no',
    dataIndex: 'no',
    sortable: {
      compare: (a, b) => a.no - b.no,
      multiple: 3,
    },
  },
  {
    title: '스케줄ID',
    dataIndex: 'scheduleId',
  },
  {
    title: '생성일자',
    dataIndex: 'createdDate',
    sortable: {
      compare: (a, b) => a.createdDate - b.createdDate,
      multiple: 1,
    },
  },
  {
    title: '롤단위',
    dataIndex: 'rollID',
    sortable: {
      compare: (a, b) => a.rollID - b.rollID,
      multiple: 0,
    },
  },
  {
    title: '해당공정',
    dataIndex: 'facility',
    sortable: {
      compare: (a, b) => a.facility - b.facility,
      multiple: 4,
    },
  },
  {
    title: '작업 시작 시간',
    dataIndex: 'startTime',
    sortable: {
      compare: (a, b) => a.startTime - b.startTime,
      multiple: 5,
    },
  },
  {
    title: '작업 종료 시간',
    dataIndex: 'endTime',
    sortable: {
      compare: (a, b) => a.endTime - b.endTime,
      multiple: 6,
    },
  },
  {
    title: 'Reject수',
    dataIndex: 'rejectCount',
    sortable: {
      compare: (a, b) => a.endTime - b.endTime,
      multiple: 6,
    },
  },
];

export const baseData: SchDataType[] = [
  {
    no: 1,
    scheduleId: '1CAL001A',
    createdDate: '2024-08-20',
    rollID: 'A',
    facility: '1CAL',
    startTime: '2024-08-21 18:00:21',
    endTime: '2024-08-21 21:00:21',
    rejectCount: '1',
  },
  {
    no: 2,
    scheduleId: '1CAL002A',
    createdDate: '2024-08-20',
    rollID: 'A',
    facility: '1CAL',
    startTime: '2024-08-21 21:00:21',
    endTime: '2024-08-21 00:00:21',
    rejectCount: '0',
  },
  {
    no: 3,
    scheduleId: '1CAL003A',
    createdDate: '2024-08-20',
    rollID: 'A',
    facility: '1CAL',
    startTime: '2024-08-21 00:00:21',
    endTime: '2024-08-22 03:00:21',
    rejectCount: '0',
  },
  {
    no: 4,
    scheduleId: '1CAL004A',
    createdDate: '2024-08-21',
    rollID: 'A',
    facility: '1CAL',
    startTime: '2024-08-22 03:00:21',
    endTime: '2024-08-22 06:00:21',
    rejectCount: '0',
  },
];
