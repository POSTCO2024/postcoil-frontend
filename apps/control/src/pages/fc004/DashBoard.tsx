import { Client } from '@stomp/stompjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SocketJS from 'sockjs-client';

// 그래프

import BarChartV2 from './chart/BarChartV2';
import DonutChart from './chart/DonutChart';
import DoubleBarChart from './chart/DoubleBarChart';
import List from './chart/List';
import Piechart from './chart/PieChart';
import RowbarChart from './chart/RowbarChart';
import Status from './chart/Status';
import styles from './DashBoard.module.scss';

import {
  rowbarchartOption,
  barchartV2Option1,
  mockData1PCM,
  mockData2PCM,
  mockData1EGL,
  mockData2EGL,
  mockData1CGL,
  mockData2CGL,
} from '@/config/DashBoard/DashBoardConfig';
import {
  useOrderData,
  useWidthThicknessData,
  useRollUnitData,
} from '@/pages/fc004/useChartData';

const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;
const controlBaseUrl = import.meta.env.VITE_CONTROL_BASE_URL;

// Interface
// API response
interface ApiResponse<T = any> {
  status: number;
  resultMsg: string;
  result: T;
}

// 에러 비율
interface ErrorDataType {
  errorCount: number;
  normalCount: number;
}

// 생산 마감일
interface DueDateDataType {
  key: string;
  no: string;
  materialNo: string;
  dueDate: string;
  tags: string[];
}

const calculateElapsedTime = (startTime: string): string => {
  const start = new Date(startTime).getTime();
  const now = new Date().getTime();
  const elapsed = now - start; // 밀리초 단위 시간 차이

  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const DashBoard: React.FC = () => {
  // 선택한 공정
  const location = useLocation();
  const selectedProc = location.pathname.split('/')[2];

  // State 관리
  const [coilTypeOption, setCoilTypeOption] =
    useState<echarts.EChartsOption | null>(null); // 품종
  const [customerNameOption, setCustomerNameOption] =
    useState<echarts.EChartsOption | null>(null); // 고객사
  const [widthOption, setWidthOption] =
    useState<echarts.EChartsCoreOption | null>(null); // 폭
  const [thicknessOption, setThicknessOption] =
    useState<echarts.EChartsCoreOption | null>(null); // 두께
  const [errorNormalData, setErrorNormalData] = useState<ErrorDataType | null>(
    null,
  ); // 에러재
  const [dueDate, setDueDate] = useState<DueDateDataType[]>([]); // 생산 기한일
  const [rollUnitOption, setRollUnitOption] =
    useState<echarts.EChartsCoreOption | null>(null); // 롤 단위

  // 모니터링 상태 관리
  // mock 데이터
  const [mock1PCMProcessData, setMock1PCMProcessData] = useState(mockData1PCM);
  const [mock2PCMProcessData, setMock2PCMProcessData] = useState(mockData2PCM);
  const [mock1EGLProcessData, setMock1EGLProcessData] = useState(mockData1EGL);
  const [mock2EGLProcessData, setMock2EGLProcessData] = useState(mockData2EGL);
  const [mock1CGLProcessData, setMock1CGLProcessData] = useState(mockData1CGL);
  const [mock2CGLProcessData, setMock2CGLProcessData] = useState(mockData2CGL);

  // 1CAL 상태 관리
  const [cal1Data, setCal1Data] = useState({
    workTotalCoils: 0,
    workScheduledCoils: 0,
    workTotalCompleteCoils: 0,
    workStartTime: '0:00:00',
    elapsedTime: '0:00:00',
  });

  // 2CAL 상태 관리
  const [cal2Data, setCal2Data] = useState({
    workTotalCoils: 0,
    workScheduledCoils: 0,
    workTotalCompleteCoils: 0,
    workStartTime: '0:00:00',
    elapsedTime: '0:00:00',
  });
  // 상태 업데이트 함수
  const updateProcessData = (processData: any) => {
    if (processData.process === '1CAL') {
      setCal1Data({
        workTotalCoils: processData.workTotalCoils,
        workScheduledCoils: processData.workScheduledCoils,
        workTotalCompleteCoils: processData.workTotalCompleteCoils,
        workStartTime: processData.workStartTime,
        elapsedTime: calculateElapsedTime(processData.workStartTime),
      });
    } else if (processData.process === '2CAL') {
      setCal2Data({
        workTotalCoils: processData.workTotalCoils,
        workScheduledCoils: processData.workScheduledCoils,
        workTotalCompleteCoils: processData.workTotalCompleteCoils,
        workStartTime: processData.workStartTime,
        elapsedTime: calculateElapsedTime(processData.workStartTime),
      });
    }
  };

  // API 호출
  const fetchWidthThicknessData = useWidthThicknessData(); // 폭/두께
  const fetchOrderData = useOrderData(); // 품종/고객사
  const fetchRollUnitData = useRollUnitData(); // 롤 단위

  // 에러재 비율
  const fetchErrorNormalCount = async () => {
    const url = `${controlApiUrl}${controlBaseUrl}/dashboard/error_count?currProc=${selectedProc}`;
    try {
      const response = await axios.get<ApiResponse<ErrorDataType>>(url);
      if (response.data.status === 200) {
        setErrorNormalData(response.data.result); // API 결과를 상태에 저장
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // 생산 마감일
  const fetchDueDateTable = async () => {
    const url = `${controlApiUrl}${controlBaseUrl}/dashboard/dueDate?currProc=${selectedProc}`;
    try {
      const response = await axios.get<ApiResponse>(url);

      if (response.data.status === 200) {
        return response.data.result
          .slice(0, 20) // 상위 20개만 보이도록
          .map((item: any, index: any) => ({
            key: String(index + 1),
            no: String(index + 1),
            materialNo: item.materialNo,
            dueDate: formatDate(item.dueDate),
            tags: [`D-${calculateDaysLeft(item.dueDate)}`],
          }));
      } else {
        console.log('Error:', response.data.resultMsg);
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const calculateDaysLeft = (dueDate: string) => {
    // for D-DAY
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const formatDate = (dueDate: string) => {
    return new Date(dueDate).toISOString().split('T')[0];
  };

  // Rendering
  const render = async () => {
    // 품종/고객사
    const orderResult = await fetchOrderData(selectedProc);
    setCoilTypeOption(
      (orderResult?.coilTypeOptionResult as echarts.EChartsOption) ?? null,
    );
    setCustomerNameOption(
      (orderResult?.customerNameOptionResult as echarts.EChartsOption) ?? null,
    );

    // 폭/두께
    const materialResult = await fetchWidthThicknessData(selectedProc);
    if (materialResult) {
      setWidthOption(materialResult.widthOptionResult);
      setThicknessOption(materialResult.thicknessOptionResult);
    }

    // 에러 비율
    await fetchErrorNormalCount();

    // 마감일 정보
    const tableData = await fetchDueDateTable();
    setDueDate(tableData);

    // 롤 단위
    const rollUnitResult = await fetchRollUnitData(selectedProc);
    setRollUnitOption(rollUnitResult);
  };

  useEffect(() => {
    render();
  }, [selectedProc]);

  // 웹소켓
  useEffect(() => {
    const socket = new SocketJS('http://localhost:8086/ws/control');
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('Conneted Socket! ');
        stompClient.subscribe('/topic/work-started', (msg) => {
          const data = JSON.parse(msg.body);

          const processData = data.processDashboard?.find(
            (proc: any) => proc.process === selectedProc,
          );

          if (processData) {
            updateProcessData(processData);
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

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [selectedProc]);

  // 작업 시작 시간으로부터 경과 시간을 계산하고 주기적으로 업데이트
  useEffect(() => {
    const selectedProcessData = selectedProc === '1CAL' ? cal1Data : cal2Data;

    if (selectedProcessData.workStartTime !== '0:00:00') {
      const intervalId = setInterval(() => {
        const newElapsedTime = calculateElapsedTime(
          selectedProcessData.workStartTime,
        );
        if (selectedProc === '1CAL') {
          setCal1Data((prev) => ({ ...prev, elapsedTime: newElapsedTime }));
        } else if (selectedProc === '2CAL') {
          setCal2Data((prev) => ({ ...prev, elapsedTime: newElapsedTime }));
        }
      }, 1000); // 1초마다 업데이트

      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
    }
    return undefined;
  }, [selectedProc, cal1Data.workStartTime, cal2Data.workStartTime]);

  // Mock 데이터의 경과 시간 업데이트 (1초마다)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMock1PCMProcessData((prev) => ({
        ...prev,
        elapsedTime: calculateElapsedTime(prev.workStartTime),
      }));
      setMock2PCMProcessData((prev) => ({
        ...prev,
        elapsedTime: calculateElapsedTime(prev.workStartTime),
      }));
      setMock1EGLProcessData((prev) => ({
        ...prev,
        elapsedTime: calculateElapsedTime(prev.workStartTime),
      }));
      setMock2EGLProcessData((prev) => ({
        ...prev,
        elapsedTime: calculateElapsedTime(prev.workStartTime),
      }));
      setMock1CGLProcessData((prev) => ({
        ...prev,
        elapsedTime: calculateElapsedTime(prev.workStartTime),
      }));
      setMock2CGLProcessData((prev) => ({
        ...prev,
        elapsedTime: calculateElapsedTime(prev.workStartTime),
      }));
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  // const selectedProcessData = selectedProc === "1CAL" ? cal1Data : cal2Data;
  const selectedProcessData =
    selectedProc === '1CAL'
      ? cal1Data
      : selectedProc === '2CAL'
        ? cal2Data
        : selectedProc === '1PCM'
          ? mock1PCMProcessData
          : selectedProc === '2PCM'
            ? mock2PCMProcessData
            : selectedProc === '1EGL'
              ? mock1EGLProcessData
              : selectedProc === '2EGL'
                ? mock2EGLProcessData
                : selectedProc === '1CGL'
                  ? mock1CGLProcessData
                  : mock2CGLProcessData;

  return (
    <div className={styles.parentDiv}>
      <h1>실시간 스케줄 모니터링</h1>
      <div className={styles.page}>
        <div className={styles.line1}>
          <div className={styles.smallCard}>
            <h6>스케줄 작업 진행율</h6>
            <h3>
              {selectedProcessData.workTotalCoils}/
              {selectedProcessData.workTotalCompleteCoils}
            </h3>
          </div>
          <div className={styles.smallCard}>
            <h6>작업 예정</h6>
            <h3>{selectedProcessData.workScheduledCoils}</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>현재 작업 시간</h6>
            <h3>{selectedProcessData.elapsedTime}</h3>
          </div>
          <div className={styles.smallCard}>
            <Status status="RUNNING" />
          </div>
        </div>
        <h2>작업대상재 분석</h2>
        <div className={styles.line2}>
          <div className={styles.smallCard}>
            <BarChartV2 title="차공정" option={barchartV2Option1} />
          </div>
          <div className={styles.smallCard}>
            <BarChartV2 title="롤 단위" option={rollUnitOption} />
          </div>
          <div className={styles.smallCard}>
            <RowbarChart option={rowbarchartOption} />
          </div>
          <div className={styles.smallCard}>
            <List data={dueDate} />
          </div>
        </div>
        <div className={styles.line2}>
          <div className={styles.smallCard}>
            <Piechart data={errorNormalData} />
          </div>
          <div className={styles.smallCard}>
            <DoubleBarChart option1={widthOption} option2={thicknessOption} />
          </div>
          <div className={styles.smallCard}>
            <DonutChart title="품종" option={coilTypeOption} />
          </div>
          <div className={styles.smallCard}>
            <DonutChart title="고객사" option={customerNameOption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
