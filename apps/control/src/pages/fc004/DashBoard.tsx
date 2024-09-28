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
  // piechartOption,
  // donutchartOption,
  // doublebarchartOption1,
  // doublebarchartOption2,
  rowbarchartOption,
  barchartV2Option1,
  // barchartV2Option2,
} from '@/config/DashBoard/DashBoardConfig';
import {
  useOrderData,
  useWidthThicknessData,
  useRollUnitData,
} from '@/pages/fc004/useChartData';

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

  // API 호출
  const fetchWidthThicknessData = useWidthThicknessData(); // 폭/두께
  const fetchOrderData = useOrderData(); // 품종/고객사
  const fetchRollUnitData = useRollUnitData(); // 롤 단위

  // 에러재 비율
  const fetchErrorNormalCount = async () => {
    const url = `http://localhost:8086/api/v1/dashboard/error_count?currProc=${selectedProc}`;
    try {
      const response = await axios.get<ApiResponse<ErrorDataType>>(url);
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
    console.log('selectedProc: ' + selectedProc);
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
  }, [selectedProc]); // selectedProc이 변경될 때마다 실행

  return (
    <div className={styles.parentDiv}>
      <h1>공정별 작업대상재 분석</h1>
      <div className={styles.page}>
        <div className={styles.line1}>
          <div className={styles.smallCard}>
            <h6>스케줄 작업 진행량</h6>
            <h3>30/50</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>작업 예정</h6>
            <h3>20</h3>
          </div>
          <div className={styles.smallCard}>
            <h6>작업 시간</h6>
            <h3>00:30:22</h3>
          </div>
          <div className={styles.smallCard}>
            {/* <h6>설비 이상</h6> */}
            <Status status="RUNNING" />
          </div>
        </div>
        <div className={styles.line2}>
          <div className={styles.smallCard}>
            <BarChartV2 title="차공정" option={barchartV2Option1} />
          </div>
          <div className={styles.smallCard}>
            <BarChartV2 title="롤 단위" option={rollUnitOption} />
          </div>
          <div className={styles.smallCard}>
            <RowbarChart option={rowbarchartOption} />
            {/* <Status status={message.equipmentStatus} /> */}
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
