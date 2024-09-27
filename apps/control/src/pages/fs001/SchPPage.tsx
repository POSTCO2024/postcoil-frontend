import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SchPPage.module.scss';

import { fetchScheduleData, scheduleApiClient } from '@/api/scheduleApi';
import CommonModal from '@/components/common/CommonModal';
import RollSuccessModal from '@/components/common/RollSuccessModal';
import RollWarnModal from '@/components/common/RollWarnModal';
import { MaterialDTO } from '@/config/scheduling/dto';
import ContentContainer from '@/pages/fs001/plan/ContentContainer';
import FilterContainer from '@/pages/fs001/plan/FilterContainer';

const SchPPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [materialData, setMaterialData] = useState<MaterialDTO[]>([]);
  const [selectedRows, setSelectedRows] = useState<MaterialDTO[]>([]); // checkbox로 선택된 행 데이터를 저장하는 상태

  // selectedRows 상태가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    console.log('선택된 Rows:', selectedRows);
  }, [selectedRows]); // selectedRows가 변경될 때마다 실행

  const handleChange = async (value?: string[]) => {
    if (value && value[0] !== '') {
      // 데이터 로딩 전에 상태를 초기화 (reset)
      setMaterialData([]); // materialData 초기화
      setSelectedRows([]); // selectedRows 초기화

      const data = await fetchScheduleData({
        pageCode: 'plan',
        processCode: value[0],
      });

      setMaterialData(data); // API 호출 후 데이터 설정
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/schedule2');
  };
  const handleApply = () => {
    setIsModalOpen(false);
    navigate('/schedule2');
  };

  const handleApply2 = async () => {
    try {
      // 선택된 rows의 id만 추출하여 배열로 생성
      const selectedIds = selectedRows.map((row) => row.key);
      console.log(selectedIds);

      // 백엔드로 POST 요청 (selectedIds 전달)
      await scheduleApiClient
        .post(
          `${import.meta.env.VITE_SCHEDULE_API_URL}${import.meta.env.VITE_SCHEDULE_BASE_URL}/plan/execute`,
          selectedIds,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => console.log(response.data)); // 결과 console에서 보려고

      // 성공적으로 요청이 완료되면 모달을 닫고 success 모달을 열기
      setIsModalOpen(true);
      setIsModal2Open(false);
    } catch (error) {
      console.error('Error during plan execution:', error);
    }
  };

  const handleCancel2 = () => {
    setIsModal2Open(false);
  };

  const handleCancel3 = () => {
    setIsModal3Open(false);
  };

  const handleRoll = () => {
    if (selectedRows.length < 1) {
      setIsModal3Open(true);
      return;
    }

    setIsModal2Open(true);
  };

  return (
    <div className={styles.page}>
      <h1>Schedule 편성</h1>
      <FilterContainer handleChange={handleChange} />
      <ContentContainer data={materialData} setSelectedRows={setSelectedRows} />
      <Button
        style={{ display: materialData.length > 0 ? 'block' : 'none' }}
        type="primary"
        className={styles.btn}
        onClick={handleRoll}>
        스케줄 편성 시작
      </Button>
      <RollWarnModal
        isModalOpen={isModal3Open}
        handleCancel={handleCancel3}
        handleApply={handleCancel3}
        title={'재료를 1개 이상 선택해주세요.'}
      />
      <CommonModal
        isModalOpen={isModal2Open}
        isConfirmation={false}
        onCancel={handleCancel2}
        onApply={handleApply2}>
        <p
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            marginTop: '30px',
          }}>
          {`${selectedRows.length}개의 재료로 스케줄을 편성하시겠습니까?`}
        </p>
      </CommonModal>
      <RollSuccessModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleApply={handleApply}
        title="스케줄이 편성되었습니다."
      />
    </div>
  );
};

export default SchPPage;
