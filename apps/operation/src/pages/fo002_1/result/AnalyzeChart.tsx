import { ClockCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { Table } from '@postcoil/ui';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from 'react';

import styles from './AnalyzeChart.module.scss';
import AnalyzeChartBlock from './AnalyzeChartBlock';

import { CoilSupplyDTO } from '@/config/dto';
import { WorkItemDTO } from '@/config/dto';
import { useWorkInstructionStore } from '@/store/fo001store';
import { schCoilColumnData } from '@/utils/tableUtils';

// duration 플러그인을 dayjs에 등록
dayjs.extend(duration);

export const AnalyzeChart = () => {
  // 필요한 상태를 구독합니다.
  const workItems = useWorkInstructionStore((state) => state.workItems);
  const scheduleNo = useWorkInstructionStore((state) => state.scheduleNo);
  interface DataType {
    [key: string]: any;
  }

  // WorkItemDTO를 DataType으로 변환하는 함수
  const transformWorkItemsToDataType = (
    workItems: WorkItemDTO[],
  ): DataType[] => {
    return workItems.map((item) => ({
      materialNo: item.materialNo,
      sequence: item.sequence,
      initialThickness: item.initialThickness,
      initialWidth: item.initialWidth,
      initialGoalThickness: item.initialGoalThickness,
      initialGoalWidth: item.initialGoalWidth,
    }));
  };

  const scExpectedDuration = useWorkInstructionStore(
    (state) => state.scExpectedDuration!,
  );

  const startTime = useWorkInstructionStore(
    (state) => state.scheduleStartTime, // 선택된 schedule의 시작 시간
  );
  const coilSupplyData: CoilSupplyDTO | null = useWorkInstructionStore(
    (state) => state.coilSupplyData!,
  );
  // workStatus를 상태에서 구독합니다.
  const workStatus = useWorkInstructionStore(
    (state) => state.coilSupplyData?.workStatus || 'PENDING',
  );

  // coilSupplyData가 존재할 때만 값을 구조 분해 할당
  const {
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

  // 상태 변경 시 콘솔에 출력하여 확인
  useEffect(() => {
    console.log('websocket 으로 데이터 업데이트!!');
    console.log('workItems: ', workItems);
    console.log('scheduleNo : ', scheduleNo);
    console.log('coilSupplyData 업데이트:', coilSupplyData);
    console.log('workStatus:', workStatus);
  }, [workItems, scheduleNo, coilSupplyData, workStatus]);

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
            content={`${totalProgressed} / ${convertNegToZero(
              pendingProgressedCoils,
            )} / ${convertNegToZero(pendingSuppliedCoils)}`}
          />
          <AnalyzeChartBlock
            title={`작업 ${
              workStatus === 'IN_PROGRESS' ? '경과' : '예상 소요'
            } 시간`}
            content={formattedTimeDifference}
          />
          <AnalyzeChartBlock
            title="Reject / 전체 코일 수"
            content={`${convertNegToZero(totalRejects)} / ${totalCoils}`}
          />
          <div className={styles.coilTypeFrame}>
            <Table
              columns={schCoilColumnData}
              data={workItems ? transformWorkItemsToDataType(workItems) : []} // null/undefined 처리
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeChart;
