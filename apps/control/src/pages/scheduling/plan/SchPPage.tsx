import { Button } from 'antd';
import { useState } from 'react';

import RollSuccessModal from './RollSuccessModal';
import styles from './SchPPage.module.scss';

import ContentContainer from '@/components/scheduling/plan/ContentContainer';
import FilterContainer from '@/components/scheduling/plan/FilterContainer';

const SchPPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => setIsModalOpen(false);
  const handleApply = () => {
    setIsModalOpen(false);
    // TODO: implement roll success action
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
      />
    </div>
  );
};

export default SchPPage;
