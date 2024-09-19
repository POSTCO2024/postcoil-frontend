export interface MaterialDTO {
  [x: string]: any;
  id: number | string;
  materialNo?: string;
  status?: string;
  // fCode?: string;
  // opCode?: string;
  currProc?: string;
  // type?: string;
  // progress?: string;
  // outerDia?: number | string;
  // innerDia?: number | string;
  width?: number | string;
  thickness?: number | string;
  // length?: number | string;
  // weight?: number | string;
  // totalWeight?: number | string;
  // passProc?: string | null;
  // remProc?: string | null;
  // preProc?: string | null;
  nextProc?: string | null;
  storageLoc?: string;
  // yard?: number | string;
  // coilTypeCode?: string;

  // 작업대상재 필드
  goalWidth?: number | string;
  goalThickness?: number | string;
  goalLength?: number | string;
  temperature?: number | string;
  rollUnit?: string;
  // targetId?: number | string;

  // 스케줄 필드
  // workTime?: number | string;
  // scheduleId?: number | string;
  // scheduleNo?: string;
  // sequence?: number[] | string[];
}

export interface ScheduleInfoDTO {
  id?: number | string;
  no?: string;
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
