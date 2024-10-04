import { create } from 'zustand';

import { fetchOperationData } from '@/api/operationApi';
import { WorkInstructionsDTO } from '@/config/scheduling/dto';
import {
  HoverState,
  ScrollState,
  StoreType,
} from '@/config/scheduling/storeConfig';

export const useWorkInstructionStore = create<StoreType>((set) => ({
  data: null, // 데이터 상태 초기화
  loading: false, // 로딩 상태
  error: null, // 에러 상태
  processCode: '', // 현재 process Code
  scheduleNo: '',
  scExpectedDuration: null,
  workItems: null,
  fetchData: async (value) => {
    set({ loading: true, error: null }); // 로딩 시작
    try {
      const result = await fetchOperationData({
        pageCode: 'completed',
        processCode: value[0],
        requestParams: `&startDate=${value[1]}&endDate=${value[2]}`,
      }); // 데이터 fetch

      set({
        data: result as WorkInstructionsDTO[],
        processCode: value[0],
        scheduleNo: result[0].scheduleNo,
        scExpectedDuration: result[0].expectedDuration,
        loading: false,
        workItems: result[0].items,
      }); // 데이터 상태 업데이트 및 로딩 종료
    } catch (error) {
      set({ error: 'Failed to fetch schedule data in FS004', loading: false }); // 에러 발생 시 처리
    }
  },
  cleanData: () => {
    set((state) => ({
      ...state,
      data: null,
      scheduleNo: '',
      scExpectedDuration: null,
      processCode: '',
      workItems: null,
    })); // 데이터 상태를 null로 변경
  },
  setSelectedData: (scheduleNo: string) => {
    set((state) => {
      const selectedData = (state.data as WorkInstructionsDTO[])?.find(
        (item) => item.scheduleNo === scheduleNo,
      ); // 조건에 맞는 첫 번째 데이터 찾기

      return {
        ...state,
        scheduleNo: scheduleNo,
        scExpectedDuration: selectedData?.expectedDuration, // 해당 데이터의 expectedDuration
        workItems: selectedData?.items, // 해당 데이터의 items 배열
      };
    });
  },
}));

export const useScrollStore = create<ScrollState>((set) => ({
  scrollLeft: 0,
  setScrollLeft: (position) => set({ scrollLeft: position }),
}));

export const useHoverStore = create<HoverState>((set) => ({
  hoveredPoint: null,
  setHoveredPoint: (point) => set({ hoveredPoint: point }),
}));
