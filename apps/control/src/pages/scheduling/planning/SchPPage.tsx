import { Button } from '@postcoil/ui';
import React, { useState } from 'react';

import RollSuccessModal from './RollSuccessModal';
import styles from './SchPPage.module.scss';

import ContentContainer from '@/components/scheduling/planning/ContentContainer';
import FilterContainer from '@/components/scheduling/planning/FilterContainer';

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
      <Button text="스케줄 편성 시작" onClick={handleRoll} />
      <RollSuccessModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleApply={handleApply}
      />
    </div>
  );
};

export default SchPPage;
