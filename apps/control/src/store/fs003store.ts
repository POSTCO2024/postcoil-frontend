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

// export interface MaterialDTO {
//   [x: string]: any;
//   id: number | string;
//   materialId?: number | string;
//   materialNo?: string;
//   currProc?: string;
//   width?: number | string;
//   thickness?: number | string;
//   nextProc?: string | null;

//   // 작업대상재 필드
//   goalWidth?: number | string;
//   goalThickness?: number | string;
//   temperature?: number | string;
//   rollUnit?: string;

//   // 스케줄 필드
//   schedulePlanId?: string;
//   isScheduled?: string;
//   sequence?: number | string;
//   isRejected?: string;
//   expectedDuration?: number | string;
// }

// export interface ScheduleInfoDTO {
//   id: string;
//   scheduleNo: string;
//   scExpectedDuration?: number | string;
//   workStatus?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
//   process?: string;
//   rollUnit?: string;
//   quantity?: number;
//   isConfirmed?: string;
//   materials?: MaterialDTO[];
// }

// interface UpdateMaterial {
//   materialId: number; // 각 자재의 ID
//   sequence: number; // 자재의 순서
// }

// export interface ConfirmScheduleDTO {
//   planId: number; // 각 계획의 ID
//   confirmBy: string; // 확인자
//   updateMaterials: UpdateMaterial[]; // 업데이트할 자재 배열
// }

// export interface WorkItemDTO {
//   id?: number | string;
//   workItemId?: number | string;
//   materialId: number;
//   materialNo: string;
//   targetId: number;
//   workItemStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'; // 가능한 상태 추가
//   sequence: number;
//   isRejected: 'Y' | 'N';
//   expectedItemDuration: number;
//   startTime: string | null;
//   endTime: string | null;
//   initialWidth?: number;
//   initialThickness: number;
//   initialGoalWidth: number;
//   initialGoalThickness?: number;
//   temperature: number;
//   preProc?: string;
//   nextProc?: string;
//   width?: number | string;
//   thickness?: number;
//   coilTypeCode?: string;
//   weight?: number | string;
// }

// export interface WorkInstructionsDTO {
//   id?: number;
//   workInstructionId?: number;
//   workNo: string;
//   scheduleId: number;
//   scheduleNo: string;
//   process: string;
//   rollUnit: string;
//   totalQuantity: number;
//   expectedDuration: number; // schedule 예상 소요 시간
//   startTime: string | null; // ISO 8601 형식의 날짜 문자열
//   endTime: string | null; // 종료 시간은 null일 수 있음
//   schStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'; // 스케줄 상태
//   items: WorkItemDTO[]; // WorkItem 배열
// }

// export interface CoilSupplyDTO {
//   coilSupplyId: number | null;
//   workInstructionId: number;
//   workStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
//   totalCoils: number;
//   suppliedCoils: number;
//   totalProgressed: number;
//   totalRejects: number;
// }

// export interface ClientDTO {
//   workInstructions: WorkInstructionsDTO;
//   coilSupply: CoilSupplyDTO;
//   countCoilTypeCode: CoilTypeCode; // 품종을 몰라서~
// }

// interface CoilTypeCode {
//   [key: string]: number;
// }

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
  setWorkItems: (newWorkItems: any) => set({ workItems: [...newWorkItems] }),

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
  cleanData: () => {
    set((state) => ({
      ...state,
      data: null,
      data2: null,
      processCode: '',
      scheduleNo: '',
      scheduleStartTime: null,
      scExpectedDuration: null,
      countCoilTypeCode: null,
      workItems: null,
      coilSupplyData: null,
    })); // 데이터 상태를 null로 변경
  },

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
        newState.scheduleNo = inProgressItem.workInstructions.scheduleNo;
        newState.scheduleStartTime = inProgressItem.workInstructions.startTime;
        newState.scExpectedDuration =
          inProgressItem.workInstructions.expectedDuration;
        newState.workItems = [...inProgressItem.workInstructions.items]; // 새로운 배열로 복사
        newState.countCoilTypeCode = inProgressItem.countCoilTypeCode;
        newState.coilSupplyData = inProgressItem.coilSupply
          ? { ...inProgressItem.coilSupply }
          : null;
      } else if (pendingItem) {
        newState.scheduleNo = pendingItem.workInstructions.scheduleNo;
        newState.scheduleStartTime = pendingItem.workInstructions.startTime;
        newState.scExpectedDuration =
          pendingItem.workInstructions.expectedDuration;
        newState.workItems = [...pendingItem.workInstructions.items]; // 새로운 배열로 복사
        newState.countCoilTypeCode = pendingItem.countCoilTypeCode;
        newState.coilSupplyData = pendingItem.coilSupply
          ? { ...pendingItem.coilSupply }
          : null;
      }
      set(newState); // 최종적으로 상태를 한 번에 업데이트 // 데이터 상태 업데이트 및 로딩 종료
    } catch (error) {
      set({ error: 'Failed to fetch schedule data in FS003', loading: false }); // 에러 발생 시 처리
    }
  },

  updateData: (newData: ClientDTO[]) => {
    set((state) => {
      const processCode = state.processCode;
      const selectedData = processCode === '1CAL' ? state.data : state.data2;

      // 현재 processCode와 일치하는 항목만 필터링
      const filteredData = newData.filter(
        (item) => item.workInstructions.process === processCode,
      );

      console.log('filterData', filteredData);

      // selectedData가 null인 경우 fetchData 호출
      if (!selectedData) {
        set({ loading: true });
        (async () => {
          await state.fetchData!([processCode!]);
        })();
        return {};
      }

      const updatedData = (selectedData as ClientDTO[]).filter((item) => {
        const updatedItem = filteredData.find(
          (newItem) =>
            newItem.workInstructions.workInstructionId ===
            item.workInstructions.workInstructionId,
        );

        // schStatus가 "COMPLETED"인 항목은 제거
        if (updatedItem?.workInstructions.schStatus === 'COMPLETED') {
          return false;
        }

        return true;
      });

      // 새로운 데이터 처리
      filteredData.forEach((newItem) => {
        if (newItem.workInstructions.schStatus === 'COMPLETED') {
          return;
        }

        const existingItemIndex = updatedData.findIndex(
          (item) =>
            item.workInstructions.workInstructionId ===
            newItem.workInstructions.workInstructionId,
        );

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
              ...newItem.countCoilTypeCode,
            },
          };
        } else {
          // 새로 들어온 데이터는 배열에 추가
          updatedData.push(newItem);
        }
      });

      const sortedData = sortData(updatedData);

      // IN_PROGRESS 상태인 항목 찾기
      const inProgressItem = sortedData.find(
        (item) => item.workInstructions.schStatus === 'IN_PROGRESS',
      );

      const newState: Partial<StoreType> = {
        loading: false,
      };

      // 나의 코드~222
      // if (processCode === '1CAL') {
      //   newState.data = [...sortedData];
      // } else if (processCode === '2CAL') {
      //   newState.data2 = [...sortedData];
      // }

      // if (inProgressItem) {
      //   newState.scheduleNo = inProgressItem.workInstructions.scheduleNo;
      //   newState.scheduleStartTime = inProgressItem.workInstructions.startTime;
      //   newState.scExpectedDuration =
      //     inProgressItem.workInstructions.expectedDuration;
      //   newState.workItems = [...inProgressItem.workInstructions.items];
      //   newState.countCoilTypeCode = inProgressItem.countCoilTypeCode;
      //   newState.coilSupplyData = { ...inProgressItem.coilSupply };
      // }

      if (processCode === '1CAL') {
        newState.data = sortedData;
      } else if (processCode === '2CAL') {
        newState.data2 = sortedData;
      }

      if (inProgressItem) {
        newState.scheduleNo = inProgressItem.workInstructions.scheduleNo;
        newState.scheduleStartTime = inProgressItem.workInstructions.startTime;
        newState.scExpectedDuration =
          inProgressItem.workInstructions.expectedDuration;
        newState.workItems = inProgressItem.workInstructions.items;
        newState.countCoilTypeCode = inProgressItem.countCoilTypeCode;
        newState.coilSupplyData = inProgressItem.coilSupply;
      }

      return newState;
    });
  },
  // updateData: (newData: ClientDTO[]) => {
  //   // 웹소켓 데이터로 상태 업데이트
  //   set((state) => {
  //     const processCode = state.processCode;
  //     const selectedData = processCode === '1CAL' ? state.data : state.data2;

  //     console.log('>>>>>>>>>updateData 함수 시작>>>>>>>>>');
  //     // processCode가 스토어의 값과 일치하는 항목만 필터링
  //     const filteredData = newData.filter(
  //       (item) => item.workInstructions.process === processCode,
  //     );
  //     console.log('filteredData', filteredData);

  //     // 데이터가 null인 경우 fetchData 호출
  //     if (!selectedData) {
  //       // fetchData 호출하여 데이터 로딩
  //       set({ loading: true }); // 로딩 상태로 설정
  //       (async () => {
  //         await state.fetchData!([processCode!]);
  //       })();
  //       return {}; // 상태를 변경하지 않고 null 반환
  //     }

  //     // 기존 데이터의 깊은 복사 생성
  //     const updatedData = (selectedData as ClientDTO[]).map((item) => ({
  //       ...item,
  //       workInstructions: {
  //         ...item.workInstructions,
  //       },
  //       coilSupply: { ...item.coilSupply },
  //     }));

  //     // Deep clone the existing data
  //     // const updatedData = JSON.parse(JSON.stringify(selectedData)); // Deep clone

  //     // 새로운 데이터 처리
  //     filteredData.forEach((newItem) => {
  //       // schStatus가 "COMPLETED"인 새 항목은 추가하지 않음
  //       if (newItem.workInstructions.schStatus === 'COMPLETED') {
  //         return; // continue
  //       }

  //       const existingItemIndex = updatedData.findIndex(
  //         (item) =>
  //           item.workInstructions.workInstructionId ===
  //           newItem.workInstructions.workInstructionId,
  //       );

  //       console.log('existingItemIndex: ' + existingItemIndex);
  //       if (existingItemIndex !== -1) {
  //         // 기존 항목이 있으면 병합하여 업데이트
  //         updatedData[existingItemIndex] = {
  //           ...updatedData[existingItemIndex],
  //           workInstructions: {
  //             // ...updatedData[existingItemIndex].workInstructions,
  //             ...newItem.workInstructions,
  //           },
  //           coilSupply: {
  //             // ...updatedData[existingItemIndex].coilSupply,
  //             ...newItem.coilSupply,
  //           },
  //           countCoilTypeCode: {
  //             ...updatedData[existingItemIndex].countCoilTypeCode,
  //           },
  //         };
  //       } else {
  //         // 새로 들어온 데이터는 배열의 마지막에 추가
  //         updatedData.push({
  //           ...newItem,
  //           workInstructions: {
  //             ...newItem.workInstructions,
  //           },
  //           coilSupply: { ...newItem.coilSupply },
  //         });
  //       }

  //       // IN_PROGRESS 상태인 항목 찾기
  //       if (newItem.workInstructions.schStatus === 'IN_PROGRESS') {
  //         // 만약 기존의 scheduleNo와 다른 경우 새로운 IN_PROGRESS 데이터로 상태 업데이트
  //         if (state.scheduleNo !== newItem.workInstructions.scheduleNo) {
  //           set({
  //             ...state,
  //             scheduleNo: newItem.workInstructions.scheduleNo,
  //             scheduleStartTime: newItem.workInstructions.startTime,
  //             scExpectedDuration: newItem.workInstructions.expectedDuration,
  //             countCoilTypeCode: newItem.countCoilTypeCode,
  //             workItems: newItem.workInstructions.items.map((item) => ({
  //               ...item,
  //             })), // 깊은 복사
  //             coilSupplyData: { ...newItem.coilSupply },
  //           });
  //         } else {
  //           // workItems만 업데이트할 경우에도 상태를 업데이트
  //           set({
  //             ...state,
  //             workItems: newItem.workInstructions.items.map((item) => ({
  //               ...item,
  //             })),
  //             coilSupplyData: { ...newItem.coilSupply },
  //           });
  //         }
  //       }
  //     });

  //     const sortedData = sortData(updatedData);

  //     console.log('>>>>>>>>>updateData 함수 끝>>>>>>>>>');

  //     // 최종적으로 적절한 상태를 업데이트
  //     if (processCode === '1CAL') {
  //       return {
  //         ...state,
  //         data: sortedData,
  //         loading: false,
  //         workItems: sortedData.flatMap((item) =>
  //           item.workInstructions.items.map((workItem) => ({
  //             ...workItem,
  //           })),
  //         ), // 각 항목의 workInstructions.items에서 workItems 배열 생성
  //       };
  //     } else if (processCode === '2CAL') {
  //       return {
  //         ...state,
  //         data2: sortedData,
  //         loading: false,
  //         workItems: sortedData.flatMap((item) =>
  //           item.workInstructions.items.map((workItem) => ({
  //             ...workItem,
  //           })),
  //         ), // 각 항목의 workInstructions.items에서 workItems 배열 생성 };
  //       };
  //     }
  //     return {}; // 타입 오류 방지 위해 빈 객체 반환
  //   });
  // },
}));

// API로 받은 데이터를 정렬 후 상태에 저장
const sortData = (result: ClientDTO[]): ClientDTO[] =>
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
        console.log(
          '-------------------oejfoajfoawjfaowe------------------------',
        );
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
      console.log('WebSocket 연결 해제!!!!!!!!!!!!!!');
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
