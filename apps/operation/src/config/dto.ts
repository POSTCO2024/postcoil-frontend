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
  width?: number | string;
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
