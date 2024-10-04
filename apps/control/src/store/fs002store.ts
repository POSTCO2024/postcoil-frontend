import { create } from 'zustand';

import { fetchScheduleData } from '@/api/scheduleApi';
import { MaterialDTO, ScheduleInfoDTO } from '@/config/scheduling/dto';
import {
  DragState,
  HoverState,
  ScrollState,
  StoreType,
} from '@/config/scheduling/storeConfig';

export const useScheduleStore = create<StoreType>((set) => ({
  data: null, // 데이터 상태 초기화
  loading: false, // 로딩 상태
  error: null, // 에러 상태
  processCode: '', // 현재 process Code
  fetchData: async (value: string[]) => {
    set({ loading: true, error: null }); // 로딩 시작
    const { processCode } = useScheduleStore.getState(); // processCode를 받아오기
    try {
      const result: ScheduleInfoDTO[] = await fetchScheduleData({
        pageCode: 'pending',
        processCode: value[0] ? value[0] : processCode,
      }); // 데이터 fetch
      set({
        data: result,
        processCode: value[0] ? value[0] : processCode,
        loading: false,
      }); // 데이터 상태 업데이트 및 로딩 종료
    } catch (error) {
      set({ error: 'Failed to fetch schedule data in FS002', loading: false }); // 에러 발생 시 처리
    }
  },
  cleanData: () => {
    set((state) => ({ ...state, data: null, processCode: '' })); // 데이터 상태를 null로 변경
  },
}));

export const useMaterialStore = create<StoreType>((set) => ({
  data: null, // 현재 화면에 보여줄 데이터 상태
  loading: false, // 로딩 상태
  error: null, // 에러 상태
  cache: {}, // 원본 데이터를 저장할 상태
  originalCache: {},
  scheduleNo: '', // 선택된 schedule 이름 저장
  scExpectedDuration: null, // 선택된 schedule의 예상 시간
  fetchData: async (value: string[]) => {
    set({ loading: true, error: null }); // 로딩 시작
    // 먼저 캐시에서 데이터 확인
    const cache = useMaterialStore.getState().cache!;
    if (cache[value[0]]) {
      // 캐시에 데이터가 있다면, 캐시된 데이터를 사용
      // scheduleId에 해당하는 scheduleNo를 찾아서 displayTitle에 설정
      const scheduleId = cache[value[0]][0]?.schedulePlanId;
      const scheduleData = useScheduleStore.getState().data as MaterialDTO[];
      const matchedSchedule = scheduleData?.find(
        (item) => item.id === scheduleId,
      );

      set({
        data: cache[value[0]],
        loading: false,
        scheduleNo: matchedSchedule!.scheduleNo,
        scExpectedDuration: matchedSchedule!.scExpectedDuration,
      });

      return;
    }

    try {
      const result: MaterialDTO[] = await fetchScheduleData({
        pageCode: 'pending',
        processCode: 'schedule',
        requestParams: `?id=${value}`, // requestParams 추가 (schedule id에 해당하는 materials 받아오기)
      }); // 데이터 fetch

      // 원본 데이터를 저장하면서 동시에 data에 할당, changed는 false로 설정
      const initialData = result.map((item: any) => ({
        ...item,
        changed: false,
      }));

      // scheduleId에 해당하는 scheduleNo를 찾아서 displayTitle에 설정
      const scheduleId = result[0]?.schedulePlanId;
      const scheduleData = useScheduleStore.getState().data as MaterialDTO[];
      const matchedSchedule = scheduleData?.find(
        (item) => item.id === scheduleId,
      );

      set((state) => ({
        data: initialData,
        cache: { ...state.cache, [value[0]]: initialData }, // 캐시에 데이터 저장
        originalCache: { ...state.originalCache, [value[0]]: initialData }, // 원본 데이터 저장
        loading: false,
        scheduleNo: matchedSchedule!.scheduleNo,
        scExpectedDuration: matchedSchedule!.scExpectedDuration,
      }));
    } catch (error) {
      set({ error: 'Failed to fetch material data in FS002', loading: false }); // 에러 발생 시 처리
    }
  },
  updateData: (newData) =>
    set((state) => {
      const updatedData = newData.map((item: any, index: number) => ({
        ...item,
        sequence: index + 1, // 드래그 후 새로운 순서로 sequence 업데이트
      }));
      return {
        ...state,
        data: updatedData,
        cache: { ...state.cache, [newData[0].schedulePlanId]: updatedData },
      };
    }),
  resetData: () =>
    // 원본 데이터를 다시 복원하는 함수, 복원 시 changed는 모두 false로 설정
    set((state) => {
      // 현재 `data`의 `schedulePlanId`를 사용하여 `originalCache`에서 데이터 검색
      const schedulePlanId = (state.data?.[0] as MaterialDTO)?.schedulePlanId;

      if (schedulePlanId && state.originalCache![schedulePlanId]) {
        // `originalCache`에서 해당 `schedulePlanId`에 맞는 데이터를 가져와서 `data`와 `cache` 업데이트
        const originalData = state.originalCache![schedulePlanId].map(
          (item: any) => ({
            ...item,
            changed: false, // reset 시 changed 값을 false로 초기화
          }),
        );

        return {
          ...state,
          data: originalData, // data를 originalCache의 값으로 설정
          cache: { ...state.cache, [schedulePlanId]: originalData }, // 캐시도 업데이트
        };
      }
      return state; // 해당 `schedulePlanId`에 맞는 데이터를 찾지 못한 경우 상태를 그대로 유지
    }),
  cleanData: () => {
    set((state) => ({
      ...state,
      data: null,
      scheduleNo: '',
      scExpectedDuration: null,
    })); // 데이터 상태를 null로 변경
  },
}));

export const useDragStore = create<DragState>((set) => ({
  isDragging: false,
  startDragging: () => set({ isDragging: true }),
  stopDragging: () => set({ isDragging: false }),
}));

export const useScrollStore = create<ScrollState>((set) => ({
  scrollLeft: 0,
  setScrollLeft: (position) => set({ scrollLeft: position }),
}));

export const useHoverStore = create<HoverState>((set) => ({
  hoveredPoint: null,
  setHoveredPoint: (point) => set({ hoveredPoint: point }),
}));
