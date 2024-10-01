import { Client } from '@stomp/stompjs';
import React, { useState, useEffect } from 'react';
import SocketJS from 'sockjs-client';

import Board from './board/Board';
import styles from './DashBoard.module.scss';

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
    percent: 42,
    tableData: [
      { key: '2', column: '목표 수량', value: '100' },
      { key: '3', column: '작업 완료', value: '42' },
      { key: '4', column: '작업 예정', value: '64' },
    ],
  },
  {
    key: '2',
    label: '2CAL',
    percent: 80,
    tableData: [
      { key: '2', column: '목표 수량', value: '130' },
      { key: '3', column: '작업 완료', value: '30' },
      { key: '4', column: '작업 예정', value: '100' },
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
  // 웹소켓
  // const [message, setMessage] = useState<string>('');
  const [client, setClient] = useState<Client | null>(null);

  const [tabDataCAL, setTabDataCAL] = useState(initialTabDataCAL);

  useEffect(() => {
    const socket = new SocketJS('http://localhost:9090/ws/control');
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('Conneted Socket! ');
        stompClient.subscribe('/topic/coilData', (msg) => {
          // setMessage(msg.body); // 웹소켓으로 받은 데이터를 상태에 저장
          console.log(msg.body);

          const data = JSON.parse(msg.body);
          console.log(data);

          // Process
          const process = data?.TotalSuplly?.process;

          if (process === '1CAL' || process === '2CAL') {
            const updatedTabData = tabDataCAL.map((item) => {
              if (item.label === process) {
                return {
                  ...item,
                  percent:
                    (data.TotalSuplly.totalCompleteCoils /
                      data.TotalSuplly.totalGoalCoils) *
                    100,
                  tableData: [
                    {
                      key: '2',
                      column: '목표 수량',
                      value: data.TotalSupply.totalGoalCoils.toString(),
                    },
                    {
                      key: '3',
                      column: '작업 완료',
                      value: data.TotalSupply.totalCompleteCoils.toString(),
                    },
                    {
                      key: '4',
                      column: '작업 예정',
                      value: data.TotalSupply.totalScheduledCoils.toString(),
                    },
                  ],
                };
              }
              return item;
            });
            return setTabDataCAL(updatedTabData); // 업데이트된 값으로 상태 변경
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
  }, []);

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
