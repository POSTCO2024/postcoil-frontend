export interface MaterialDTO {
  [x: string]: any;
  id: number | string;
  materialNo?: string;
  currProc?: string;
  width?: number | string;
  thickness?: number | string;
  nextProc?: string | null;

  // 작업대상재 필드
  goalWidth?: number | string;
  goalThickness?: number | string;
  goalLength?: number | string;
  temperature?: number | string;
  rollUnit?: string;

  // 스케줄 필드
  schedulePlanId?: string;
  isScheduled?: string;
  sequence?: number | string;
  isRejected?: string;
  expectedDuration?: number | string;
}

export interface ScheduleInfoDTO {
  id: string;
  scheduleNo: string;
  workStatus?: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface WorkScheduleDTO {
  id?: number | string;
  scheduleNo?: string;
  workStatus?: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  rejectQuantity?: number;
  planDateTime?: string;
  startTime?: string;
  endTime?: string;
  expectedDuration?: number | string;
  actualDuration?: number | string;
}

interface UpdateMaterial {
  materialId: number; // 각 자재의 ID
  sequence: number; // 자재의 순서
}

export interface ConfirmScheduleDTO {
  planId: number; // 각 계획의 ID
  confirmBy: string; // 확인자
  updateMaterials: UpdateMaterial[]; // 업데이트할 자재 배열
}
