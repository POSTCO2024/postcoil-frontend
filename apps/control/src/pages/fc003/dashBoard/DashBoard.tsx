import { Client } from '@stomp/stompjs';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SocketJS from 'sockjs-client';

import Board from './board/Board';
import styles from './DashBoard.module.scss';

const operationApiUrl = import.meta.env.VITE_OPERATION_API_URL;
const operationBaseUrl = import.meta.env.VITE_OPERATION_BASE_URL;
const websocketApiUrl = import.meta.env.VITE_CONTROL_API_URL;
const websocketBaseUrl = import.meta.env.VITE_WEBSOCKET_CONTROL_BASE;

interface FactoryDashboard {
  process: string;
  totalCompleteCoils: number;
  totalGoalCoils: number;
  totalScheduledCoils: number;
}

// Tab Dataset
const tabDataPCM = [
  {
    key: '1',
    label: '1PCM',
    percent: 75,
    tableData: [
      { key: '2', column: '목표 수량', value: '131' },
      { key: '3', column: '작업 완료', value: '42' },
      { key: '4', column: '작업 예정', value: '89' },
    ],
  },
  {
    key: '2',
    label: '2PCM',
    percent: 50,
    tableData: [
      { key: '2', column: '목표 수량', value: '200' },
      { key: '3', column: '작업 완료', value: '100' },
      { key: '4', column: '작업 예정', value: '100' },
    ],
  },
];

// 데이터 받기
const initialTabDataCAL = [
  {
    key: '1',
    label: '1CAL',
    percent: 0, // 기본값 설정
    tableData: [
      { key: '2', column: '목표 수량', value: '0' },
      { key: '3', column: '작업 완료', value: '0' },
      { key: '4', column: '작업 예정', value: '0' },
    ],
  },
  {
    key: '2',
    label: '2CAL',
    percent: 0, // 기본값 설정
    tableData: [
      { key: '2', column: '목표 수량', value: '0' },
      { key: '3', column: '작업 완료', value: '0' },
      { key: '4', column: '작업 예정', value: '0' },
    ],
  },
];

const tabDataEGL = [
  {
    key: '1',
    label: '1EGL',
    percent: 35,
    tableData: [
      { key: '2', column: '목표 수량', value: '122' },
      { key: '3', column: '작업 완료', value: '42' },
      { key: '4', column: '작업 예정', value: '89' },
    ],
  },
  {
    key: '2',
    label: '2EGL',
    percent: 50,
    tableData: [
      { key: '2', column: '목표 수량', value: '100' },
      { key: '3', column: '작업 완료', value: '51' },
      { key: '4', column: '작업 예정', value: '49' },
    ],
  },
];

const tabDataCGL = [
  {
    key: '1',
    label: '1CGL',
    percent: 75,
    tableData: [
      { key: '2', column: '목표 수량', value: '110' },
      { key: '3', column: '작업 완료', value: '42' },
      { key: '4', column: '작업 예정', value: '82' },
    ],
  },
  {
    key: '2',
    label: '2CGL',
    percent: 3,
    tableData: [
      { key: '2', column: '목표 수량', value: '151' },
      { key: '3', column: '작업 완료', value: '3' },
      { key: '4', column: '작업 예정', value: '145' },
    ],
  },
];

export const DashBoard: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [tabDataCAL, setTabDataCAL] = useState<any[]>(initialTabDataCAL);

  // API 요청
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const url = `${operationApiUrl}${operationBaseUrl}/monitoring/summary`;
        const response = await axios.get(url);

        if (response.data.status === 200) {
          const result = response.data.result;
          let hasData = false;

          // 응답 데이터로 CAL 데이터 업데이트
          result.forEach((item: any) => {
            if (item.process === '1CAL' || item.process === '2CAL') {
              hasData = true;
              const index = item.process === '1CAL' ? 0 : 1;
              initialTabDataCAL[index] = {
                key: (index + 1).toString(),
                label: item.process,
                percent: Math.round(
                  (item.totalCompleteCoils / item.totalGoalCoils) * 100,
                ),
                tableData: [
                  {
                    key: '2',
                    column: '목표 수량',
                    value: item.totalGoalCoils.toString(),
                  },
                  {
                    key: '3',
                    column: '작업 완료',
                    value: item.totalCompleteCoils.toString(),
                  },
                  {
                    key: '4',
                    column: '작업 예정',
                    value: item.totalScheduledCoils.toString(),
                  },
                ],
              };
            }
          });

          // 데이터를 받은 경우에만 상태 업데이트
          if (hasData) {
            setTabDataCAL([...initialTabDataCAL]);
          } else {
            // 데이터가 없는 경우 기본값을 보여줌
            setTabDataCAL(initialTabDataCAL);
          }
        } else {
          console.log(`Error: ${response.data.resultMsg}`);
          setTabDataCAL(initialTabDataCAL); // 오류 발생 시 기본값 설정
        }
      } catch (error) {
        console.error('Error fetching initial data: ', error);
        setTabDataCAL(initialTabDataCAL); // API 호출 오류 시 기본값 설정
      }
    };

    fetchInitialData(); // 컴포넌트 마운트 시 API 데이터 가져오기
  }, []);

  // 웹소켓
  useEffect(() => {
    const socket = new SocketJS(`${websocketApiUrl}'${websocketBaseUrl}'`);
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('Conneted Socket! ');
        stompClient.subscribe('/topic/work-started', (msg) => {
          // setMessage(msg.body); // 웹소켓으로 받은 데이터를 상태에 저장
          console.log('웹소켓 데이터');
          console.log(msg.body);

          const data = JSON.parse(msg.body);
          console.log(data);
          console.log('check');

          // Process
          if (data.factoryDashboard && Array.isArray(data.factoryDashboard)) {
            data.factoryDashboard.forEach((item: FactoryDashboard) => {
              const process = item.process;
              // 해당 process에 대한 로직 처리
              if (process === '1CAL' || process === '2CAL') {
                const updatedTabData = tabDataCAL.map((tabItem) => {
                  if (tabItem.label === process) {
                    return {
                      ...tabItem,
                      percent: Math.round(
                        (item.totalCompleteCoils / item.totalGoalCoils) * 100,
                      ),
                      tableData: [
                        {
                          key: '2',
                          column: '목표 수량',
                          value: item.totalGoalCoils.toString(),
                        },
                        {
                          key: '3',
                          column: '작업 완료',
                          value: item.totalCompleteCoils.toString(),
                        },
                        {
                          key: '4',
                          column: '작업 예정',
                          value: item.totalScheduledCoils.toString(),
                        },
                      ],
                    };
                  }
                  return tabItem;
                });
                setTabDataCAL(updatedTabData); // 상태 업데이트
              }
            });
          } else {
            console.error(
              'Expected factoryDashboard to be an array but received:',
              data.factoryDashboard,
            );
          }
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      onStompError: (error) => {
        console.error('STOMP error: ', error);
      },
    });

    // WebSocket 연결 활성화
    stompClient.activate();
    setClient(stompClient);
    console.log(client);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [tabDataCAL]);

  return (
    <div className={styles.dashboardContainer}>
      <h3>작업 현황 모니터링</h3>
      <div className={styles.boardContainer}>
        <Board tabData={tabDataPCM} />
        <Board tabData={tabDataCAL} />
        <Board tabData={tabDataEGL} />
        <Board tabData={tabDataCGL} />
      </div>
    </div>
  );
};

export default DashBoard;
