import { Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SchPPage.module.scss';

import RollSuccessModal from '@/components/common/RollSuccessModal';
import ContentContainer from '@/pages/fs001/plan/ContentContainer';
import FilterContainer from '@/pages/fs001/plan/FilterContainer';

const SchPPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate('/schedule2'); // TODO: 현재, 페이지는 변경가능, 메뉴바는 변경 X => menu navigation 도 같이 움직이게 하기!
  };
  const handleApply = () => {
    setIsModalOpen(false);
    navigate('/schedule2');
  };
  const handleRoll = () => setIsModalOpen(true);

  return (
    <div className={styles.page}>
      <h1>Schedule 편성</h1>
      <FilterContainer />
      <ContentContainer />
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
