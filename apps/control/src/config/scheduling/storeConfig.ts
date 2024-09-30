import {
  MaterialDTO,
  ScheduleInfoDTO,
  WorkInstructionsDTO,
  WorkItemDTO,
} from './dto';

export interface StoreType {
  data: MaterialDTO[] | ScheduleInfoDTO[] | WorkInstructionsDTO[] | null; // 받아온 데이터
  loading: boolean; // 로딩 상태
  error: string | null; // 에러 상태
  fetchData: (value: string[]) => Promise<void>; // 데이터를 fetch하는 함수
  updateData?: (newData: any) => void; // 데이터 update하는 함수
  resetData?: () => void; // 데이터 reset하는 함수
  cleanData: () => void; // data를 비워주는 함수
  cache?: Record<string, MaterialDTO[]>; // 현재 데이터 상태를 저장할 캐시를 위한 객체
  originalCache?: Record<string, MaterialDTO[]>; // 원본 데이터 상태를 저장할 캐시를 위한 객체
  scheduleNo?: string; // schedule 이름 저장
  processCode?: string; // processCode 저장
  scExpectedDuration?: number | string | null; // 선택된 schedule의 예상 시간
  workItems?: WorkItemDTO[] | null; // 선택된 작업지시문 id
}

export interface DragState {
  isDragging: boolean;
  startDragging: () => void;
  stopDragging: () => void;
}

export interface ScrollState {
  scrollLeft: number;
  setScrollLeft: (position: number) => void;
}

export interface HoverState {
  hoveredPoint: any | null;
  setHoveredPoint: (point: any | null) => void;
}
