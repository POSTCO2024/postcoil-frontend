import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SocketJS from 'sockjs-client';

// 그래프
import { useLocation } from 'react-router-dom';
import BarChartV2 from './chart/BarChartV2';
import DonutChart from './chart/DonutChart';
import DoubleBarChart from './chart/DoubleBarChart';
import List from './chart/List';
import Piechart from './chart/PieChart';
import RowbarChart from './chart/RowbarChart';
import Status from './chart/Status';
import styles from './DashBoard.module.scss';

import {
  barchartV2Option,
  // piechartOption,
  // donutchartOption,
  rowbarchartOption,
  // doublebarchartOption1,
  // doublebarchartOption2,
} from '@/config/DashBoard/DashBoardConfig';
import {
  useOrderData,
  useWidthThicknessData,
} from '@/pages/fc004/useChartData';

import { ConsoleSqlOutlined } from '@ant-design/icons';

export const TaskInstruction = () => {
  const [message, setMessage] = useState<string>('');
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const socket = new SocketJS('http://localhost:8087/coil');
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('Conneted Socket! ');
        stompClient.subscribe('/topic/coilData', (msg) => {
          setMessage(msg.body); // 웹소켓으로 받은 데이터를 상태에 저장
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
};

const DashBoard: React.FC = () => {
  // 선택한 공정
  const location = useLocation();
  const selectedProc = location.pathname.split('/')[2];

  // 품종/고객사
  const [coilTypeOption, setCoilTypeOption] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [customerNameOption, setCustomerNameOption] = useState<Record<
    string,
    unknown
  > | null>(null);
  const fetchOrderData = useOrderData();

  // 폭/두께
  // const [chartOptions, setChartOptions] = useState<{
  //   width: number;
  //   thickness: number;
  // } | null>(null);
  // const fetchMaterialData = useMaterialData();
  const fetchChartData = useWidthThicknessData();
  const [widthOption, setWidthOption] =
    useState<echarts.EChartsCoreOption | null>(null);
  const [thicknessOption, setThicknessOption] =
    useState<echarts.EChartsCoreOption | null>(null);

  // 에러 비율
  interface ApiResponse<T = any> {
    status: number;
    resultMsg: string;
    result: T;
  }

  interface DataType {
    errorCount: number;
    normalCount: number;
  }
  const [errorNormalData, setErrorNormalData] = useState<DataType | null>(null);

  // 생산 마감일
  interface DueDataType {
    key: string;
    no: string;
    materialNo: string;
    dueDate: string;
    tags: string[];
  }

  const [dueDate, setDueDate] = useState<DueDataType[]>([]);

  // API 호출
  // 에러재 비율
  const fetchErrorNormalCount = async () => {
    const url = `http://localhost:8086/api/v1/dashboard/error_count?currProc=${selectedProc}`;
    try {
      const response = await axios.get<ApiResponse<DataType>>(url);
      if (response.data.status === 200) {
        setErrorNormalData(response.data.result); // API 결과를 상태에 저장
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  //생산 마감일
  const fetchDueDateTable = async () => {
    const url = `http://localhost:8086/api/v1/dashboard/dueDate?currProc=${selectedProc}`;
    try {
      const response = await axios.get<ApiResponse>(url);
      if (response.data.status === 200) {
        return response.data.result.map((item: any, index: any) => ({
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
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const formatDate = (dueDate: string) => {
    return new Date(dueDate).toISOString().split('T')[0];
  };

  // const { chartOptions } = useMaterialData(selectedProc);
  // const widthOptions = chartOptions?.width;
  // const thicknessOptions = chartOptions?.thickness;

  const render = async () => {
    // 품종/고객사
    console.log('selectedProc: ' + selectedProc);
    const orderResult = await fetchOrderData(selectedProc);

    setCoilTypeOption(orderResult?.coilTypeOptionResult ?? null);
    setCustomerNameOption(orderResult?.customerNameOptionResult ?? null);

    // 폭/두께
    // const materialResult = await fetchMaterialData(selectedProc);
    // setChartOptions(
    //   materialResult?.setChartOptions ?? { width: {}, thickness: {} }
    // );
    const materialResult = await fetchChartData(selectedProc);
    if (materialResult) {
      setWidthOption(materialResult.widthOptionResult);
      setThicknessOption(materialResult.thicknessOptionResult);
    }

    // 에러 비율
    await fetchErrorNormalCount();

    // 마감일 정보
    const tableData = await fetchDueDateTable();
    setDueDate(tableData);
  };

  useEffect(() => {
    render();
  }, [selectedProc]); // selectedProc이 변경될 때마다 실행

  return (
    <div className={styles.parentDiv}>
      <h1>공정별 작업대상재 분석</h1>
      <div className={styles.page}>
        <div className={styles.line1}>
          <div className={styles.smallCard}>
            <h6>스케줄 작업 진행량</h6>
            <h3>30/message.StatisticsInfo.workTotalCoils</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>작업 예정</h6>
            <h3>message.StatisticsInfo.workScheduledCoils</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>작업 시간</h6>
            <h3>message.StatisticsInfo.workStartTime</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>설비 이상</h6>
          </div>
        </div>
        <div className={styles.line2}>
          <div className={styles.smallCard}>
            <BarChartV2 option={barchartV2Option} />
          </div>
          <div className={styles.smallCard}>
            <RowbarChart option={rowbarchartOption} />
          </div>
          <div className={styles.smallCard}>
            <Status status={message.equipmentStatus} />
          </div>
          <div className={styles.smallCard}>
            <List data={dueDate} />
          </div>
        </div>
        {/* <h4>재료 정보</h4> */}
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
