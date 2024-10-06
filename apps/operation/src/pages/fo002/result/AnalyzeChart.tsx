import { RedoOutlined } from '@ant-design/icons';
import { Table } from '@postcoil/ui';
import { ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { over, Client, Message } from 'stompjs';

import { DataType as TableDataType } from 'C:/Users/BIT1/Desktop/Postco/postcoil-frontend/packages/common-ui/config/TableConfig'; // TableConfig에서 DataType 가져옴

import styles from './AnalyzeChart.module.scss';

// TableConfig에서 가져온 DataType을 사용
const columns = [
  { title: '품종별', dataIndex: 'type' },
  { title: '개수', dataIndex: 'count' },
];

export const AnalyzeChart = () => {
  const [data, setData] = useState<TableDataType[]>([]); // TableDataType 사용
  const [status, setStatus] = useState('PENDING');
  const [totalCoils, setTotalCoils] = useState(0);
  const [suppliedCoils, setSuppliedCoils] = useState(0);
  const [totalRejects, setTotalRejects] = useState(0);
  const [workDuration, setWorkDuration] = useState('00:00:00');
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws/operation');
    const stompClient = over(socket); // stompjs 클라이언트 초기화
    setStompClient(stompClient); // stompClient 상태 설정

    stompClient.connect({}, () => {
      console.log('WebSocket connection established');

      // work-instruction 토픽 구독
      stompClient.subscribe('/topic/work-instruction', (message: Message) => {
        if (message.body) {
          const jsonData = JSON.parse(message.body);
          console.log('Received message:', jsonData);

          const workInstructions = jsonData.coilSupply.workInstructions;
          const countCoilTypeCode = jsonData.coilSupply.countCoilTypeCode;

          // 데이터 설정
          const newData = Object.keys(countCoilTypeCode).map((key) => ({
            key,
            type: key,
            count: countCoilTypeCode[key],
          }));

          setData(newData);
          setStatus(jsonData.coilSupply.schStatus);
          setTotalCoils(jsonData.coilSupply.totalCoils);
          setSuppliedCoils(jsonData.coilSupply.suppliedCoils);
          setTotalRejects(jsonData.coilSupply.totalRejects);
          setWorkDuration(workInstructions.expectedDuration);
        }
      });
    });

    return () => {
      // 컴포넌트 언마운트 시 안전하게 WebSocket 해제
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('WebSocket connection closed');
        });
      }
    };
  }, []);

  return (
    <div className={styles.chart}>
      <div className={styles.analyze_background}>
        <div className={styles.analyze_frame}>
          <div style={{ flex: 2 }}>
            <div style={{ height: '50%' }}>
              <div className={styles.item_flex}>
                <div className={styles.item_frame}>
                  <div className={styles.item_style}>
                    <div style={{ fontWeight: 800 }}>현재상황</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      <RedoOutlined spin style={{ color: '#1677ff' }} />
                      &ensp;{status === 'IN_PROGRESS' ? '작업중' : '작업 완료'}
                    </div>
                  </div>
                </div>
                <div className={styles.item_frame}>
                  <div className={styles.item_style}>
                    <div style={{ fontWeight: 800 }}>
                      보급 현황 / 전체 코일 수
                    </div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      {suppliedCoils} / {totalCoils} (개)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: '50%' }}>
              <div className={styles.item_flex}>
                <div className={styles.item_frame}>
                  <div className={styles.item_style}>
                    <div style={{ fontWeight: 800 }}>작업소요 시간</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      {workDuration} : 00
                    </div>
                  </div>
                </div>
                <div className={styles.item_frame}>
                  <div className={styles.item_style}>
                    <div style={{ fontWeight: 800 }}>Reject 된 코일 수</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      {totalRejects} 개
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.type_chart_flex}>
            <div className={styles.type_chart_frame}>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      // cellFontSizeSM: 18,
                    },
                  },
                }}>
                <Table columns={columns} data={data} size="small" />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeChart;
