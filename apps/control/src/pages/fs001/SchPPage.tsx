import { Button } from 'antd';
import { useState } from 'react';

import styles from './SchPPage.module.scss';

import RollSuccessModal from '@/components/common/RollSuccessModal';
import ContentContainer from '@/pages/fs001/plan/ContentContainer';
import FilterContainer from '@/pages/fs001/plan/FilterContainer';

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
        title="스케줄이 편성되었습니다."
      />
    </div>
  );
};

export default SchPPage;
