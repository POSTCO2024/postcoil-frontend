import { MaterialDTO, ScheduleInfoDTO } from './DTO';

export interface StoreType {
  data: MaterialDTO[] | ScheduleInfoDTO[] | null; // 받아온 데이터
  loading: boolean; // 로딩 상태
  error: string | null; // 에러 상태
  fetchData: (value: string) => Promise<void>; // 데이터를 fetch하는 함수
  updateData?: (newData: any) => void; // 데이터 update하는 함수
  resetData?: () => void; // 데이터 reset하는 함수
  cleanData: () => void; // data를 비워주는 함수
  cache?: Record<string, MaterialDTO[]>; // 현재 데이터 상태를 저장할 캐시를 위한 객체
  originalCache?: Record<string, MaterialDTO[]>; // 원본 데이터 상태를 저장할 캐시를 위한 객체
  scheduleNo?: string; // schedule 이름 저장
  processCode?: string; // processCode 저장
}
