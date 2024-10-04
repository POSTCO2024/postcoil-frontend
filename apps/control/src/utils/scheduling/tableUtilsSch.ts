import { ColumnDataType } from '@postcoil/ui/config/TableConfig';

import { ScheduleDataType } from '@/config/scheduling/contentConfig';
import { WorkInstructionsDTO } from '@/config/scheduling/dto';

export const scheduleColumnData: ColumnDataType<ScheduleDataType>[] = [
  {
    title: 'no',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: '스케줄명',
    dataIndex: 'scheduleNo',
    key: 'scheduleNo',
  },
  { title: '공정코드', dataIndex: 'process', key: 'process' },
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
  {
    title: '작업 시작 시간',
    dataIndex: 'startTime',
    key: 'startTime',
    sortable: true,
  },
  {
    title: '작업 종료 시간',
    dataIndex: 'endTime',
    key: 'endTime',
    sortable: true,
  },
  {
    title: '작업 소요 시간',
    dataIndex: 'expectedDuration',
    key: 'expectedDuration',
  },
  {
    title: 'Reject 수',
    dataIndex: 'rejectQuantity',
    key: 'rejectQuantity',
    sortable: true,
  },
];

export const transformedScheduleData = (
  data: WorkInstructionsDTO[],
): ScheduleDataType[] => {
  // sequence가 null이 아�� ��목만 필터링하고, 정��
  if (data.length > 0) {
    data.sort(
      (a: { startTime: string | null }, b: { startTime: string | null }) => {
        const startTimeA = a.startTime ? new Date(a.startTime).getTime() : null;
        const startTimeB = b.startTime ? new Date(b.startTime).getTime() : null;

        if (startTimeA && startTimeB) {
          return startTimeA - startTimeB; // startTime 순으로 오름차순 정렬
        } else if (!startTimeA) {
          return 1; // startTime이 없는 항목을 뒤로 보냄
        } else if (!startTimeB) {
          return -1; // startTime이 없는 항목을 뒤로 보냄
        } else {
          return 0; // startTime이 둘 다 없으면 정렬하지 않음
        }
      },
    );
  }
  return data.map((item, index) => ({
    no: index + 1,
    key: item.id ? item.id : item.workInstructionId,
    id: item.id ? item.id : item.workInstructionId,
    workNo: item.workNo,
    scheduleId: item.scheduleId,
    scheduleNo: item.scheduleNo,
    process: item.process,
    rollUnit: item.rollUnit,
    totalQuantity: item.totalQuantity,
    expectedDuration: item.expectedDuration,
    startTime: item.startTime,
    endTime: item.endTime,
    schStatus: item.schStatus,
    rejectQuantity: item.items.filter((i) => i.isRejected === 'Y').length,
  }));
};
