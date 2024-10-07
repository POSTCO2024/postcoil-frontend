import { ColumnDataType } from '@postcoil/ui/config/TableConfig';
import { Checkbox, Form } from 'antd';

import {
  CompletedModalDataType,
  ConfirmModalDataType,
  PlanModalDataType,
} from '@/config/scheduling/contentConfig';
import { MaterialDTO, ScheduleInfoDTO } from '@/config/scheduling/dto';

export const planModalColumnData: ColumnDataType<PlanModalDataType>[] = [
  {
    title: '스케줄 적용 기준',
    dataIndex: 'scheduleCriteria',
    key: 'scheduleCriteria',
  },
  {
    title: '롤단위',
    dataIndex: 'rollUnit',
    key: 'rollUnit',
  },
  {
    title: '재료 개수',
    dataIndex: 'countMaterials',
    key: 'countMaterials',
  },
];

export const transformedPlanModalData = (
  data: MaterialDTO[],
): PlanModalDataType[] => {
  if (data.length > 0) {
    const rollUnitA = data.filter((item) => item.rollUnit === 'A');
    const rollUnitB = data.filter((item) => item.rollUnit === 'B');

    // Description 공통 데이터
    const commonDescription = [
      { 번호: 1, 설명: '목표폭으로 내림차순 정렬' },
      { 번호: 2, 설명: '동일 목표폭으로 그룹핑' },
      { 번호: 3, 설명: '코일두께로 오름차순 정렬' },
      { 번호: 4, 설명: '코일두께로 sin 곡선 생성' },
      { 번호: 5, 설명: '동일 코일두께로 그룹핑' },
      { 번호: 6, 설명: '동일 소둔온도로 그룹핑' },
      { 번호: 7, 설명: '동일 품명으로 그룹핑' },
    ];

    // rollUnit 데이터 생성 함수
    const createRollUnitData = (
      rollUnit: MaterialDTO[],
      rollUnitId: string,
    ): PlanModalDataType => ({
      key: rollUnitId,
      id: rollUnitId,
      rollUnit: rollUnitId,
      countMaterials: rollUnit.length,
      scheduleCriteria: `${data[0].currProc}_${rollUnitId} 스케줄 기준`,
      description: commonDescription,
    });

    // 빈 배열은 제외한 결과 반환
    const result: PlanModalDataType[] = [];

    if (rollUnitA.length > 0) {
      result.push(createRollUnitData(rollUnitA, 'A'));
    }

    if (rollUnitB.length > 0) {
      result.push(createRollUnitData(rollUnitB, 'B'));
    }

    return result; // 결과 반환
  }

  return []; // 데이터가 없을 경우 빈 배열 반환
};

export const completedModalColumnData: ColumnDataType<CompletedModalDataType>[] =
  [
    {
      title: '', //'스케줄명',
      dataIndex: 'scheduleNo',
      key: 'scheduleNo',
    },
    {
      title: '', //'롤단위',
      dataIndex: 'rollUnit',
      key: 'rollUnit',
    },
    {
      title: '선택 재료 개수',
      dataIndex: 'countMaterials',
      key: 'countMaterials',
    },
    {
      title: '편성 재료 개수',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '미편성 재료 개수',
      dataIndex: 'unInsertionQuantity',
      key: 'unInsertionQuantity',
    },
    {
      title: '자동 미편성 삽입 재료 개수',
      dataIndex: 'autoInsertionQuantity',
      key: 'autoInsertionQuantity',
    },
  ];

export const transformedCompletedModalData = (
  prevData: MaterialDTO[],
  completedScheduleA: ScheduleInfoDTO[],
  completedScheduleB: ScheduleInfoDTO[],
): CompletedModalDataType[] | undefined => {
  if (prevData.length > 0) {
    const rollUnitA = prevData.filter((item) => item.rollUnit === 'A');
    const rollUnitB = prevData.filter((item) => item.rollUnit === 'B');

    // rollUnit별 데이터 계산 로직
    const calculateData = (
      rollUnitData: MaterialDTO[],
      completedData: MaterialDTO[],
    ) => {
      const countMaterials = rollUnitData.length;

      // 편성된 개수: rollUnitData에 있는 id 중 completedData에도 있는 경우
      const quantity = rollUnitData.filter((item) =>
        completedData.some((completed) => completed.id === item.id),
      ).length;

      // 미편성 개수: rollUnitData에 있는데 completedData에는 없는 경우
      const unInsertionMaterials = rollUnitData.filter(
        (item) => !completedData.some((completed) => completed.id === item.id),
      );

      // 자동 삽입 개수: rollUnitData에는 없는데 completedData에 있는 경우
      const autoInsertionMaterials = completedData.filter(
        (completed) => !rollUnitData.some((item) => item.id === completed.id),
      );

      // 미편성된 재료와 자동 삽입된 재료의 <p> 태그를 조건부 생성
      const description: string[] = [];

      if (unInsertionMaterials.length > 0) {
        description.push(
          `미편성된 재료: ${unInsertionMaterials
            .map((item) => item.materialNo)
            .join(', ')}`,
        );
      }

      if (autoInsertionMaterials.length > 0) {
        description.push(
          `자동 삽입된 재료: ${autoInsertionMaterials
            .map((item) => item.materialNo)
            .join(', ')}`,
        );
      }

      return {
        countMaterials: countMaterials,
        quantity: quantity,
        unInsertionQuantity: unInsertionMaterials.length,
        autoInsertionQuantity: autoInsertionMaterials.length,
        description: description, // 최종 description 문자열
      };
    };

    // A 롤유닛 데이터 계산
    const rollUnitAData =
      completedScheduleA.length > 0
        ? {
            key: 'A',
            id: 'A',
            rollUnit: 'A',
            scheduleNo: completedScheduleA[0].scheduleNo,
            ...calculateData(rollUnitA, completedScheduleA[0].materials!),
          }
        : undefined;

    // B 롤유닛 데이터 계산
    const rollUnitBData =
      completedScheduleB.length > 0
        ? {
            key: 'B',
            id: 'B',
            rollUnit: 'B',
            scheduleNo: completedScheduleB[0].scheduleNo,
            ...calculateData(rollUnitB, completedScheduleB[0].materials!),
          }
        : undefined;

    // 빈 배열 혹은 undefined 값은 제외하고 결과 반환
    return [rollUnitAData, rollUnitBData].filter((item) => item !== undefined)
      .length > 0
      ? [rollUnitAData, rollUnitBData].filter((item) => item !== undefined)
      : [];
  }
};

export const confirmModalColumnData: ColumnDataType<ConfirmModalDataType>[] = [
  {
    title: '',
    dataIndex: 'key',
    key: 'select',
    render: (key: string, record) => (
      <Form.Item name={key} valuePropName="checked" style={{ marginBottom: 0 }}>
        <Checkbox disabled={record.quantity === undefined} />
      </Form.Item>
    ),
  },
  {
    title: '스케줄명',
    dataIndex: 'scheduleNo',
    key: 'scheduleNo',
  },
  {
    title: '총 개수',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 80,
  },
  {
    title: '데이터 확인 여부',
    dataIndex: 'isSequenceChanged',
    key: 'isSequenceChanged',
  },
];
