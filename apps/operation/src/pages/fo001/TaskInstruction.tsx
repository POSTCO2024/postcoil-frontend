import { Tab } from '@postcoil/ui';
import { Client } from '@stomp/stompjs'; // stompjs import 추가
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

import AnalyzeChart from './result/AnalyzeChart';
import Chart from './result/Chart';
import styles from './TaskInstruction.module.scss';

import ContentContainer from '@/pages/fo001/result/ContentContainer';
import FilterContainer from '@/pages/fo001/result/FilterContainer';
import {
  initializeWebSocket,
  useWorkInstructionStore,
} from '@/store/fo001store';

const SchRPage = () => {
  const [isGraphVisible, setIsGraphVisible] = useState(true);
  const [stompClient, setStompClient] = useState<Client | null>(null); // stompClient 상태 추가
  const [message, setMessage] = useState(''); // 메시지 상태 추가
  const fetchData = useWorkInstructionStore((state: any) => state.fetchData!);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/coil');
    const client = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('연결되었습니다');
        client.subscribe('/topic/coilData', (msg) => {
          setMessage(msg.body);
          console.log(msg.body);
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      onStompError: (error) => {
        console.error('STOMP error: ', error);
      },
    });

    client.activate();
    setStompClient(client); // stompClient 설정
    console.log(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    initializeWebSocket(); // 웹소켓 초기화
    fetchData(['1CAL']); // 데이터 불러오기
  }, [fetchData]);

  const handleTabChange = () => {
    setIsGraphVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.page}>
      <h1>작업 지시 전문</h1>
      <FilterContainer />
      <section className={styles.tab}>
        <Tab labels={['그래프', '리스트']} onChange={handleTabChange} />
      </section>
      <div className={styles.result}>
        {isGraphVisible ? (
          <div className={styles.charts}>
            <Chart chartName="width" />
            <Chart chartName="thickness" />
          </div>
        ) : (
          <ContentContainer />
        )}
        <div className={styles.summary}>
          <AnalyzeChart />
        </div>
      </div>
    </div>
  );
};

export default SchRPage;
