import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SchPPage.module.scss';

import { fetchScheduleData } from '@/api/scheduleApi';
import RollSuccessModal from '@/components/common/RollSuccessModal';
import { MaterialDTO } from '@/config/scheduling/DTO';
import ContentContainer from '@/pages/fs001/plan/ContentContainer';
import FilterContainer from '@/pages/fs001/plan/FilterContainer';

const SchPPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/schedule2');
  };
  const handleApply = () => {
    setIsModalOpen(false);
    navigate('/schedule2');
  };
  const handleRoll = () => setIsModalOpen(true);

  const [materialData, setMaterialData] = useState<MaterialDTO[]>([]);

  const [selectedRows, setSelectedRows] = useState<MaterialDTO[]>([]); // checkbox로 선택된 행 데이터를 저장하는 상태

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

  // selectedRows 상태가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    console.log('선택된 Rows:', selectedRows);
  }, [selectedRows]); // selectedRows가 변경될 때마다 실행

  return (
    <div className={styles.page}>
      <h1>Schedule 편성</h1>
      <FilterContainer handleChange={handleChange} />
      <ContentContainer data={materialData} setSelectedRows={setSelectedRows} />
      <Button type="primary" className={styles.btn} onClick={handleRoll}>
        스케줄 편성 시작
      </Button>
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
