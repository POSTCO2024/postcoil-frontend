import { ClockCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { Table } from '@postcoil/ui';
// import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // duration 플러그인 import
import { useEffect, useState } from 'react';

import styles from './AnalyzeChart.module.scss';
import AnalyzeChartBlock from './AnalyzeChartBlock';

import { CoilSupplyDTO } from '@/config/scheduling/dto';
import { useWorkInstructionStore } from '@/store/fs003store';
import { mockCoilTypeCodeData } from '@/utils/scheduling/mockWorkInstruction';
import {
  coilTypeColumnData,
  transformedCoilTypeCodeData,
} from '@/utils/scheduling/tableUtils';

// duration 플러그인을 dayjs에 등록
dayjs.extend(duration);

export const AnalyzeChart = () => {
  const workItems = useWorkInstructionStore((state) => state.workItems);
  useEffect(() => {
    console.log('websocket 으로 데이터 업데이트!!');
    console.log('workItems: ', workItems);
  }, [workItems]);

  const scheduleNo = useWorkInstructionStore((state) => state.scheduleNo);
  const scExpectedDuration = useWorkInstructionStore(
    (state) => state.scExpectedDuration!,
  );

  const countCoilTypeCode = useWorkInstructionStore(
    (state) => state.countCoilTypeCode,
  );

  const startTime = useWorkInstructionStore(
    (state) => state.scheduleStartTime, // 선택된 schedule의 시작 시간
  );
  // coilSupplyData가 존재하는지 확인
  const coilSupplyData: CoilSupplyDTO | null = useWorkInstructionStore(
    (state) => state.coilSupplyData!,
  );
  // coilSupplyData가 존재할 때만 값을 구조분해 할당
  const {
    workStatus = 'PENDING', // 기본값을 PENDING으로 설정
    totalCoils = 0, // 총 코일 수
    suppliedCoils = 0, // 보급 완료
    totalProgressed = 0, // 작업 완료
    totalRejects = 0,
  } = coilSupplyData || {};

  const convertNegToZero = (value: number): number => (value <= 0 ? 0 : value);

  const newSuppliedCoils = // 보급완료
    suppliedCoils >= totalCoils - totalRejects
      ? totalCoils - totalRejects
      : suppliedCoils;

  const pendingSuppliedCoils = totalCoils - totalRejects - newSuppliedCoils; // 보급 예정

  const pendingProgressedCoils = newSuppliedCoils - totalProgressed; // 작업 예정

  const coiTypeCodeData = countCoilTypeCode
    ? transformedCoilTypeCodeData(countCoilTypeCode)
    : mockCoilTypeCodeData;

  const [timeDifference, setTimeDifference] = useState(0);

  useEffect(() => {
    // 주어진 startTime을 dayjs 객체로 변환
    const start = dayjs(startTime);

    // 매초마다 실행되는 interval 설정
    const interval = setInterval(() => {
      const now = dayjs();
      const diffInSeconds = now.diff(start, 'second'); // 현재 시간과 startTime의 차이 (초 단위)
      setTimeDifference(diffInSeconds); // 차이를 상태에 저장하여 렌더링
    }, 1000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(interval);
  }, [startTime]);

  // 시간 차이를 HH:mm:ss 형식으로 변환
  const formattedTimeDifference = dayjs
    .duration(
      workStatus === 'IN_PROGRESS'
        ? timeDifference
        : (scExpectedDuration as number) * 60,
      'seconds',
    )
    .format('HH:mm:ss');

  // coilSupplyData가 업데이트될 때마다 관련 데이터를 리렌더링
  useEffect(() => {
    console.log('scheduleNo : ', scheduleNo);
    console.log('coilSupplyData 업데이트:', coilSupplyData);
  }, [scheduleNo, coilSupplyData]); // coilSupplyData가 변경될 때마다 실행

  return (
    <div className={styles.analyzeChart}>
      <h3>작업 현황 분석</h3>
      <div className={styles.analyzeBackground}>
        <div className={styles.analyzeFrame}>
          <AnalyzeChartBlock
            title="현재 진행 상태"
            content={
              workStatus === 'IN_PROGRESS' ? (
                <>
                  <RedoOutlined spin style={{ color: '#1677ff' }} />
                  &ensp;작업중
                </>
              ) : (
                <>
                  <ClockCircleOutlined style={{ color: '#1677ff' }} />
                  &ensp;작업 예정
                </>
              )
            }
          />
          <AnalyzeChartBlock
            title="작업 완료 / 작업 예정 / 보급 예정"
            content={`${totalProgressed} / ${convertNegToZero(pendingProgressedCoils)} / ${convertNegToZero(pendingSuppliedCoils)}`}
          />
          <AnalyzeChartBlock
            title={`작업 ${workStatus === 'IN_PROGRESS' ? '경과' : '예상 소요'} 시간`}
            content={formattedTimeDifference}
          />
          <AnalyzeChartBlock
            title="Reject / 전체 코일 수"
            content={`${convertNegToZero(totalRejects)} / ${totalCoils}`}
          />
          <div className={styles.coilTypeFrame}>
            {/* <ConfigProvider
              theme={{
                components: {
                  Table: {
                    // cellFontSizeSM: 18,
                  },
                },
              }}> */}
            <Table
              columns={coilTypeColumnData}
              data={coiTypeCodeData}
              // data={mockCoilTypeCodeData}
              size="small"
            />
            {/* </ConfigProvider> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeChart;
