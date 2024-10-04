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
  scExpectedDuration?: number | string;
  workStatus?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
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

export interface WorkItemDTO {
  id?: number | string;
  workItemId?: number | string;
  materialId: number;
  materialNo: string;
  targetId: number;
  workItemStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'; // 가능한 상태 추가
  sequence: number;
  isRejected: 'Y' | 'N';
  expectedItemDuration: number;
  startTime: string | null;
  endTime: string | null;
  initialWidth?: number;
  initialThickness: number;
  initialGoalWidth: number;
  initialGoalThickness?: number;
  temperature: number;
  preProc?: string;
  nextProc?: string;
  width?: number;
  thickness?: number;
  coilTypeCode?: string;
  weight?: number | string;
}

export interface WorkInstructionsDTO {
  id?: number;
  workInstructionId?: number;
  workNo: string;
  scheduleId: number;
  scheduleNo: string;
  process: string;
  rollUnit: string;
  totalQuantity: number;
  expectedDuration: number; // schedule 예상 소요 시간
  startTime: string | null; // ISO 8601 형식의 날짜 문자열
  endTime: string | null; // 종료 시간은 null일 수 있음
  schStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'; // 스케줄 상태
  items: WorkItemDTO[]; // WorkItem 배열
}

export interface CoilSupplyDTO {
  coilSupplyId: number | null;
  workInstructionId: number;
  workStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  totalCoils: number;
  suppliedCoils: number;
  totalProgressed: number;
  totalRejects: number;
}

export interface ClientDTO {
  workInstructions: WorkInstructionsDTO;
  coilSupply: CoilSupplyDTO;
  countCoilTypeCode: CoilTypeCode; // 품종을 몰라서~
}

interface CoilTypeCode {
  [key: string]: number;
}
