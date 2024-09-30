import { Tab } from '@postcoil/ui';
import { Client } from '@stomp/stompjs';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

import AnalyzeChart from './result/AnalyzeChart';
import ContentContainer from './result/ContentContainer';
import DraggableChart from './result/DraggableChart';
import DraggableChart2 from './result/DraggableChart2';
import FilterContainer from './result/FilterContainer';
import styles from './TaskInstruction.module.scss';
export const TaskInstruction = () => {
  const [message, setMessage] = useState<string>('');
  const [client, setClient] = useState<Client | null>(null);

  // 테스트용 url, url 로 요청하면 결과값을 웹소켓으로 쏴주도록 함
  // const getTest = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://localhost:8087/api/v1/materials/websocketTest',
  //     );
  //     setMessage(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    const socket = new SockJS('http://localhost:8087/coil');
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
  }, []);

  // const sendMessage = () => {
  //   if (client) {
  //     // 서버의 '/app/send'로 메시지 발행
  //     client.publish({
  //       destination: '/app/send', // 서버의 @MessageMapping("/send")에 발행
  //       body: 'Test Message from Client', // 발행할 메시지
  //     });
  //   }
  // };

  const [isGraphVisible, setIsGraphVisible] = useState(true);

  const handleTabChange = () => {
    setIsGraphVisible((prevState) => !prevState);
  };
  return (
    <div className={styles.page}>
      {/* <h1 onClick={getTest}>작업 지시 전문</h1> */}
      <h1>작업 지시 전문</h1>
      <h1>{message}</h1>
      <FilterContainer />
      <section className={styles.tab}>
        <Tab labels={['그래프', '리스트']} onChange={handleTabChange} />
      </section>
      <div className={styles.result}>
        {isGraphVisible ? (
          <div className={styles.charts}>
            <DraggableChart2 />
            <DraggableChart />
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

export default TaskInstruction;
