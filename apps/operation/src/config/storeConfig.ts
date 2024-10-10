import { ClientDTO, CoilSupplyDTO, WorkItemDTO } from './dto';

export interface StoreType {
  // data: WorkInstructionsDTO[] | ClientDTO[] | null;
  data: ClientDTO[] | null;
  data2?: ClientDTO[] | null; // websocket용
  loading: boolean; // 로딩 상태
  error?: string | null; // 에러 상태
  fetchData?: (value: string[]) => Promise<void>; // 데이터를 fetch하는 함수
  updateData?: (newData: any) => void; // 데이터 update하는 함수
  resetData?: () => void; // 데이터 reset하는 함수
  cleanData?: () => void; // data를 비워주는 함수
  setData?: (data: ClientDTO | string) => void; // websocket용 selected data 저장 || 스케줄이력 선택 data
  scheduleNo?: string; // schedule 이름 저장
  scheduleStartTime?: string | null; // schedule 시작 시간
  processCode?: string; // processCode 저장
  scExpectedDuration?: number | string | null; // 선택된 schedule의 예상 시간
  workItems?: WorkItemDTO[] | null; // 선택된 스케줄에 해당하는 재료들
  coilSupplyData?: CoilSupplyDTO | null; // websocket용
  countCoilTypeCode?: any; // 선택된 스케줄의 품종 통계
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
