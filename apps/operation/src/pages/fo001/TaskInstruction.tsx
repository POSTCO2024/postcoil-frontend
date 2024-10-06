import { Tab } from '@postcoil/ui';
import { useEffect, useState } from 'react';

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
  const fetchData = useWorkInstructionStore((state: any) => state.fetchData!);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/coil');
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('연결되었습니다');
        stompClient.subscribe('/topic/coilData', (msg) => {
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
    stompClient.activate();
    setClient(stompClient);
    console.log(client);
    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
    initializeWebSocket(); // 웹소켓 초기화
    fetchData(['1CAL']);
  }, []);

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
