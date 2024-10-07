import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { create } from 'zustand';

import { fetchOperationData } from '@/api/operationApi';
import { ClientDTO } from '@/config/scheduling/dto';
import {
  HoverState,
  ScrollState,
  StoreType,
} from '@/config/scheduling/storeConfig';

const websocketOperationUrl = import.meta.env.VITE_OPERATION_API_URL;
const websocketOperationEndpoint = import.meta.env
  .VITE_WEBSOCKET_OPERATION_ENDPOINT;
const webSocketOperationTopic = import.meta.env.VITE_WEBSOCKET_OPERATION_TOPIC;

export const useWorkInstructionStore = create<StoreType>((set) => ({
  data: null, // 1CAL 데이터 상태 초기화
  data2: null, // 2CAL 데이터 상태 초기화
  loading: false,
  error: null,
  processCode: '', // 현재 process Code
  scheduleNo: '', // 선택된 schedule 이름 저장
  scheduleStartTime: null, // 선택된 schedule의 시작 시간
  scExpectedDuration: null, // 선택된 schedule의 예상 시간
  countCoilTypeCode: null, // 선택된 schedule의 countCoilTypeCode
  workItems: null, // 선택된 schedule의 업데이트된 재료들 상태
  coilSupplyData: null, // 선택된 schedule의 업데이트된 CoilSupply 데이터 상태
  setData: (data: ClientDTO | string) => {
    // ClientDTO 타입인지 확인
    if (typeof data !== 'string') {
      return set({
        processCode: data.workInstructions.process,
        scheduleNo: data.workInstructions.scheduleNo,
        scheduleStartTime: data.workInstructions.startTime,
        scExpectedDuration: data.workInstructions.expectedDuration,
        countCoilTypeCode: data.countCoilTypeCode,
        workItems: data.workInstructions.items,
        coilSupplyData: data.coilSupply,
      });
    } else {
      // string 타입인 경우, 에러를 throw
      console.error('Expected ClientDTO but received a string');
    }
  }, // set selected Data 함수
  fetchData: async (value: string[]) => {
    set({ loading: true, error: null }); // 로딩 시작
    try {
      const result = await fetchOperationData({
        pageCode: 'uncompleted',
        processCode: value[0],
      }); // 데이터 fetch

      // API로 받은 데이터를 정렬 후 상태에 저장
      const sortedData = sortData(result as ClientDTO[]);

      // IN_PROGRESS 데이터가 있는지 확인
      const inProgressItem = sortedData.find(
        (item) => item.workInstructions.schStatus === 'IN_PROGRESS',
      );

      // PENDING 데이터가 있는지 확인
      const pendingItem = sortedData.find(
        (item) => item.workInstructions.schStatus === 'PENDING',
      );

      // 상태 업데이트
      const newState: StoreType = {
        processCode: value[0],
        loading: false,
        data: value[0] === '1CAL' ? sortedData : null, // 1CAL일 경우 data에 저장
        data2: value[0] === '2CAL' ? sortedData : null, // 2CAL일 경우 data2에 저장
      };

      if (inProgressItem) {
        newState.scheduleNo = inProgressItem.workInstructions.scheduleNo; // 선택된 schedule 이름 저장
        newState.scheduleStartTime = inProgressItem.workInstructions.startTime;
        newState.scExpectedDuration =
          inProgressItem.workInstructions.expectedDuration; // 예상 시간
        newState.workItems = inProgressItem.workInstructions.items; // 업데이트된 재료들 상태
        newState.countCoilTypeCode = inProgressItem.countCoilTypeCode; // countCoilTypeCode
        newState.coilSupplyData = inProgressItem.coilSupply; // 업데이트된 CoilSupply 데이터 상태
      } else if (pendingItem) {
        newState.scheduleNo = pendingItem.workInstructions.scheduleNo; // 선택된 schedule 이름 저장
        newState.scheduleStartTime = pendingItem.workInstructions.startTime; // 선택된 schedule의 시작 시간
        newState.scExpectedDuration =
          pendingItem.workInstructions.expectedDuration; // 예상 시간
        newState.workItems = pendingItem.workInstructions.items; // 업데이트된 재료들 상태
        newState.countCoilTypeCode = pendingItem.countCoilTypeCode; // countCoilTypeCode
        newState.coilSupplyData = pendingItem.coilSupply; // 업데이트된 CoilSupply 데이터 상태
      }

      set(newState); // 최종적으로 상태를 한 번에 업데이트 // 데이터 상태 업데이트 및 로딩 종료
    } catch (error) {
      set({ error: 'Failed to fetch schedule data in FS003', loading: false }); // 에러 발생 시 처리
    }
  },
  updateData: (newData: ClientDTO[]) => {
    // 웹소켓 데이터로 상태 업데이트
    set((state) => {
      const processCode = state.processCode; //newData[0].workInstructions.process;
      const selectedData = processCode === '1CAL' ? state.data : state.data2;

      console.log('>>>>>>>>>updateData 함수 시작>>>>>>>>>');
      // processCode가 스토어의 값과 일치하는 항목만 필터링
      const filteredData = newData.filter(
        (item) => item.workInstructions.process === processCode,
      );
      console.log('filteredData', filteredData);

      // 데이터가 null인 경우 fetchData 호출
      if (!selectedData) {
        // fetchData 호출하여 데이터 로딩
        set({ loading: true }); // 로딩 상태로 설정
        // fetchData를 직접 호출하여 데이터 가져오기
        (async () => {
          await state.fetchData!([processCode!]);
        })();
        return {}; // 상태를 변경하지 않고 null 반환
      }

      const updatedData = (selectedData as ClientDTO[]).filter((item) => {
        // 새로 들어온 데이터 중 해당 item의 workInstructionId와 일치하는 항목을 찾음
        const updatedItem = filteredData.find(
          (newItem) =>
            newItem.workInstructions.workInstructionId ===
            item.workInstructions.workInstructionId,
        );

        // 만약 새로 들어온 데이터의 schStatus가 "COMPLETED"라면 해당 항목 삭제
        if (updatedItem?.workInstructions.schStatus === 'COMPLETED') {
          return false; // 데이터에서 제거
        }

        return true; // 나머지 항목은 유지
      });

      // 새로운 데이터 처리
      filteredData.forEach((newItem) => {
        // schStatus가 "COMPLETED"인 새 항목은 추가하지 않음
        if (newItem.workInstructions.schStatus === 'COMPLETED') {
          return; // continue
        }

        const existingItemIndex = updatedData.findIndex(
          (item) =>
            item.workInstructions.workInstructionId ===
            newItem.workInstructions.workInstructionId,
        );

        console.log('existingItemIndex: ' + existingItemIndex);
        if (existingItemIndex !== -1) {
          // 기존 항목이 있으면 병합하여 업데이트
          updatedData[existingItemIndex] = {
            ...updatedData[existingItemIndex],
            ...newItem,
            workInstructions: {
              ...updatedData[existingItemIndex].workInstructions,
              ...newItem.workInstructions,
            },
            coilSupply: {
              ...updatedData[existingItemIndex].coilSupply,
              ...newItem.coilSupply,
            },
            countCoilTypeCode: {
              ...updatedData[existingItemIndex].countCoilTypeCode,
              // ...newItem.countCoilTypeCode, // 웹소켓으로는 countCoilTypeCode 업데이트 안하기 때문
            },
          };
        } else {
          // 새로 들어온 데이터는 배열의 마지막에 추가
          updatedData.push(newItem);
        }

        // IN_PROGRESS 상태인 항목 찾기
        if (newItem.workInstructions.schStatus === 'IN_PROGRESS') {
          // 만약 기존의 scheduleNo와 다른 경우 새로운 IN_PROGRESS 데이터로 상태 업데이트
          if (state.scheduleNo !== newItem.workInstructions.scheduleNo) {
            set({
              ...state,
              scheduleNo: newItem.workInstructions.scheduleNo,
              scheduleStartTime: newItem.workInstructions.startTime,
              scExpectedDuration: newItem.workInstructions.expectedDuration,
              countCoilTypeCode: newItem.countCoilTypeCode,
              workItems: newItem.workInstructions.items,
              coilSupplyData: newItem.coilSupply,
            });
          }
        }
      });
      const sortedData = sortData(updatedData);

      console.log('>>>>>>>>>updateData 함수 끝>>>>>>>>>');

      // 최종적으로 적절한 상태를 업데이트
      if (processCode === '1CAL') {
        return { ...state, data: sortedData, loading: false };
      } else if (processCode === '2CAL') {
        return { ...state, data2: sortedData, loading: false };
      }

      return {}; // 타입 오류 방지 위해 빈 객체 반환
    });
  },
}));

// API로 받은 데이터를 정렬 후 상태에 저장
const sortData = (result: ClientDTO[]) =>
  result.sort((a, b) => {
    // schStatus 기준으로 먼저 정렬 (IN_PROGRESS 우선)
    if (
      a.workInstructions.schStatus === 'IN_PROGRESS' &&
      b.workInstructions.schStatus === 'PENDING'
    )
      return -1;
    if (
      a.workInstructions.schStatus === 'PENDING' &&
      b.workInstructions.schStatus === 'IN_PROGRESS'
    )
      return 1;
    // 같은 schStatus라면 scheduleId 기준으로 오름차순 정렬
    return a.workInstructions.workInstructionId
      ? a.workInstructions.workInstructionId -
          b.workInstructions.workInstructionId!
      : a.workInstructions.id! - b.workInstructions.id!;
  });

// WebSocket 초기화 함수
export const initializeWebSocket = (
  websocketUrl = websocketOperationUrl,
  endPoint = websocketOperationEndpoint,
  topicUrl = webSocketOperationTopic
    ? webSocketOperationTopic
    : '/topic/work-instruction',
) => {
  const socket = new SockJS(websocketUrl + endPoint);
  const stompClient = new Client({
    webSocketFactory: () => socket as any,
    debug: (str) => {
      console.log(str);
    },
    onConnect: () => {
      console.log('WebSocket 연결 성공');
      // 수신할 주제에 구독
      stompClient.subscribe(topicUrl, (msg) => {
        const parsedMessage = JSON.parse(msg.body);
        console.log('parsedMessage : ', JSON.stringify(parsedMessage));

        // parsedMessage가 수신될 때 updateData 호출
        const updateData = useWorkInstructionStore.getState().updateData!;
        updateData(parsedMessage);
      });
    },
    onDisconnect: () => {
      console.log('WebSocket 연결 해제');
    },
    onStompError: (error) => {
      console.error('STOMP 오류: ', error);
    },
  });

  stompClient.activate();

  // 컴포넌트 언마운트 시 WebSocket 연결 해제
  return () => {
    if (stompClient) {
      stompClient.deactivate();
    }
  };
};

export const useScrollStore = create<ScrollState>((set) => ({
  scrollLeft: 0,
  setScrollLeft: (position) => set({ scrollLeft: position }),
}));

export const useHoverStore = create<HoverState>((set) => ({
  hoveredPoint: null,
  setHoveredPoint: (point) => set({ hoveredPoint: point }),
}));
