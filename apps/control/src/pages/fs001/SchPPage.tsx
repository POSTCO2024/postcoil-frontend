import { Button } from 'antd';
import { useEffect, useState } from 'react';

import SchPlanModal from './plan/SchPlanModal';
import styles from './SchPPage.module.scss';

import { fetchScheduleData } from '@/api/scheduleApi';
import RollWarnModal from '@/components/common/RollWarnModal';
import { MaterialDTO } from '@/config/scheduling/dto';
import ContentContainer from '@/pages/fs001/plan/ContentContainer';
import FilterContainer from '@/pages/fs001/plan/FilterContainer';

const SchPPage = () => {
  const [isSchPlanModalOpen, setIsSchPlanModalOpen] = useState(false);
  const [isWarnModalOpen, setIsWarnModalOpen] = useState(false);
  const [materialData, setMaterialData] = useState<MaterialDTO[]>([]);
  const [selectedRows, setSelectedRows] = useState<MaterialDTO[]>([]); // checkbox로 선택된 행 데이터를 저장하는 상태

  const [selectedProcessCode, setSelectedProcessCode] = useState<string[]>([
    '1CAL', // 기본값 세팅
  ]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchScheduleData({
          pageCode: 'plan',
          processCode: selectedProcessCode[0],
        });
        setMaterialData(data);
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
      }
    };
    fetchInitialData(); // 비동기 함수 호출
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  // selectedRows 상태가 변경될 때마다 실행되는 useEffect
  useEffect(() => {}, [selectedRows]); // selectedRows가 변경될 때마다 실행

  const handleChange = async (value?: string[]) => {
    if (value && value[0] !== '') {
      // 데이터 로딩 전에 상태를 초기화 (reset)
      setMaterialData([]); // materialData 초기화
      setSelectedRows([]); // selectedRows 초기화

      const data = await fetchScheduleData({
        pageCode: 'plan',
        processCode: value[0],
      });

      setSelectedProcessCode(value);
      setMaterialData(data); // API 호출 후 데이터 설정
    }
  };

  const handleCancel3 = () => {
    setIsWarnModalOpen(false);
  };

  const handleRoll = () => {
    if (selectedRows.length < 1) {
      setIsWarnModalOpen(true);
      return;
    }
    setIsSchPlanModalOpen(true);
  };

  const handlePlanCancel = () => {
    setIsSchPlanModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <h1>Schedule 편성</h1>
      <FilterContainer
        handleChange={handleChange}
        value={selectedProcessCode}
      />
      <ContentContainer data={materialData} setSelectedRows={setSelectedRows} />
      <Button
        style={{ display: materialData.length > 0 ? 'block' : 'none' }}
        type="primary"
        className={styles.btn}
        onClick={handleRoll}>
        스케줄 편성 시작
      </Button>
      <RollWarnModal
        isModalOpen={isWarnModalOpen}
        handleCancel={handleCancel3}
        handleApply={handleCancel3}
        title={'재료를 3개 이상 선택해주세요.'}
      />
      <SchPlanModal
        isSchPlanModalOpen={isSchPlanModalOpen}
        selectedRows={selectedRows}
        onCancel={handlePlanCancel}
      />
    </div>
  );
};

export default SchPPage;
