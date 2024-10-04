import { DataType } from '@postcoil/ui/config/TableConfig';

// Table Data Interface 정의
export interface MaterialDataType extends DataType {
  key?: string | number;
  id?: string;
  materialNo?: string;
  opCode?: string;
  currProc?: string;
  type?: string;
  status?: string;
  progress?: string;
  rollUnit?: string;
  outerDia?: number | string;
  innerDia?: number | string;
  width?: number | string;
  temperature?: number | string;
  length?: number | string;
  thickness?: number | string;
  weight?: number | string;
  passProc?: string | null;
  preProc?: string | null;
  nextProc?: string | null;
  storageLoc?: string;
  yard?: string | number;
  sequence?: number[] | string[] | string | number;
  goalWidth?: number | string;
  goalThickness?: number | string;
  changed?: boolean;
  // workInstructionItem 필요 컬럼 추가 240930 by ASH
  startTime?: string | null;
  endTime?: string | null;
  initialWidth?: number | string;
  initialThickness?: number | string;
  processedWidth?: number | string;
  processedThickness?: number | string;
}

export interface ScheduleDataType extends DataType {
  key?: string | number;
  id?: number | string;
  no?: number | string;
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
}

export interface ChartDataType extends Highcharts.Point {
  name: string;
  description?: string;
  y: number;
  z: number;
  x: number;
  id: string;
  color?: string;
  changed?: boolean;
}
