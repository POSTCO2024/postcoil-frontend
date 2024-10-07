import { CheckCircleFilled } from '@ant-design/icons';
import { Table } from '@postcoil/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SchPlanModal.module.scss';

import { scheduleApiClient, scheduleBaseUrl } from '@/api/scheduleApi';
import CommonModal from '@/components/common/CommonModal';
import RollFailModal from '@/components/common/RollFailModal';
import {
  CompletedModalDataType,
  PlanModalDataType,
} from '@/config/scheduling/contentConfig';
import { MaterialDTO, ScheduleInfoDTO } from '@/config/scheduling/dto';
import { useMaterialStore, useScheduleStore } from '@/store/fs002store';
import {
  completedModalColumnData,
  planModalColumnData,
  transformedCompletedModalData,
  transformedPlanModalData,
} from '@/utils/scheduling/TableModalUtils';

interface PropsType {
  isSchPlanModalOpen: boolean;
  selectedRows: MaterialDTO[];
  onCancel: () => void;
}

const SchPlanModal = ({
  isSchPlanModalOpen,
  selectedRows,
  onCancel,
}: PropsType) => {
  const navigate = useNavigate();
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const selectedProcessCode = selectedRows[0] ? selectedRows[0].currProc! : '';
  const [scheduleA, setScheduleA] = useState<ScheduleInfoDTO[]>([]);
  const [scheduleB, setScheduleB] = useState<ScheduleInfoDTO[]>([]);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  const modalData = transformedPlanModalData(selectedRows);
  const completedModalData = transformedCompletedModalData(
    selectedRows,
    scheduleA,
    scheduleB,
  )!;

  const fetchScheduleData = useScheduleStore((state) => state.fetchData!);
  const fetchMaterialData = useMaterialStore((state) => state.fetchData!);

  const handleCancel = () => {
    setIsCompletedModalOpen(false);
    navigate('/schedule2');
  };
  const handleApply = () => {
    setIsCompletedModalOpen(false);
    navigate('/schedule2');
  };

  const handleExecute = async () => {
    try {
      // 선택된 rows의 id만 추출하여 배열로 생성
      const selectedIds = selectedRows.map((row) => row.key);
      console.log('SelectedIds:', selectedIds); // selectedIds 확인

      // 백엔드로 POST 요청 (selectedIds 전달)
      const response = await scheduleApiClient.post(
        `${scheduleBaseUrl}/plan/execute`,
        selectedIds,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const planData: ScheduleInfoDTO[] = response.data.result; // const로 변경

      if (planData.length === 0) {
        // 결과가 없을 때 실패 모달을 열고 함수 종료
        onCancel();
        setIsFailModalOpen(true);
        return; // 여기서 return으로 함수 종료
      }

      // 결과가 있을 때만 이후 코드 실행
      setScheduleA(planData.filter((data) => data.rollUnit === 'A'));
      setScheduleB(planData.filter((data) => data.rollUnit === 'B'));

      // 다음 화면(fs002)의 processCode를 설정
      useScheduleStore.setState((state) => ({
        ...state,
        processCode: selectedProcessCode,
      }));

      // processCode가 업데이트된 후 fetchData 호출
      await fetchScheduleData([selectedProcessCode]);
      await fetchMaterialData(planData.map((data) => data.id));

      console.log('Plan execute response:', planData); // 결과 확인

      // 성공적으로 요청이 완료되면 모달을 닫고 success 모달을 열기
      setIsCompletedModalOpen(true); // 이 부분은 planData.length > 0일 때만 실행
      onCancel();
      // // 백엔드로 POST 요청 (selectedIds 전달)
      // await scheduleApiClient
      //   .post(`${scheduleBaseUrl}/plan/execute`, selectedIds, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   })
      //   .then((response) => {
      //     planData = response.data.result;

      //     setScheduleA(planData.filter((data) => data.rollUnit === 'A'));
      //     setScheduleB(planData.filter((data) => data.rollUnit === 'B'));

      //     if (planData.length > 0) {
      //       // 다음 화면(fs002)의 processCode를 설정
      //       useScheduleStore.setState((state) => ({
      //         ...state,
      //         processCode: selectedProcessCode,
      //       }));

      //       // processCode가 업데이트된 후 fetchData 호출
      //       fetchScheduleData([selectedProcessCode]);
      //       fetchMaterialData(planData.map((data) => data.id));

      //       console.log('Plan execute response:', planData); // 결과 확인
      //     } else {
      //       onCancel();
      //       setIsFailModalOpen(true);
      //       return;
      //     }
      //   });

      // // 성공적으로 요청이 완료되면 모달을 닫고 success 모달을 열기
      // setIsCompletedModalOpen(true);
      // onCancel();
    } catch (error) {
      console.error('Error during plan execution:', error);
    }
  };

  const handleFailModal = () => {
    setIsFailModalOpen(false);
  };

  // 확장된 행을 렌더링하는 함수
  const expandedRowRender = (record: PlanModalDataType) => {
    const descriptionColumns = [
      {
        title: '우선순위',
        dataIndex: '번호',
        key: '번호',
      },
      {
        title: '설명',
        dataIndex: '설명',
        key: '설명',
      },
    ];

    return (
      <>
        <strong>{record.scheduleCriteria}</strong>
        <Table
          columns={descriptionColumns}
          data={record.description!}
          rowKey="번호"
          size="small"
          className={styles.modalPriorityTable}
        />
      </>
    );
  };

  return (
    <>
      <CommonModal
        title={`편성 예정 스케줄 정보 (공정: ${selectedProcessCode})`}
        isModalOpen={isSchPlanModalOpen}
        isConfirmation={false}
        onCancel={onCancel}
        onApply={handleExecute}>
        <Table
          columns={planModalColumnData}
          data={modalData}
          size="small"
          expandedRowRender={expandedRowRender}
        />
        <p
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            marginTop: '20px',
          }}>
          {`총 ${selectedRows.length}개의 재료로 스케줄을 편성하시겠습니까?`}
        </p>
      </CommonModal>

      <CommonModal
        title={'편성된 스케줄 확인'}
        isModalOpen={isCompletedModalOpen}
        isConfirmation={true}
        onCancel={handleCancel}
        onApply={handleApply}
        width={560}>
        <CheckCircleFilled style={{ fontSize: '4rem', color: '#1677FF' }} />
        <p
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            marginTop: '10px',
            marginBottom: '20px',
          }}>
          {'스케줄 편성이 완료되었습니다.'}
        </p>
        <Table
          columns={completedModalColumnData}
          data={completedModalData}
          size="small"
          expandedRowRender={(record: CompletedModalDataType) =>
            record.description?.map((item: string, index) => (
              <p key={index}>{item}</p>
            ))
          }
          style={{ padding: 10 }}
        />
      </CommonModal>
      <RollFailModal
        isModalOpen={isFailModalOpen}
        handleCancel={handleFailModal}
        handleApply={handleFailModal}
        title={'스케줄 편성에 실패하였습니다.'}
      />
    </>
  );
};

export default SchPlanModal;
