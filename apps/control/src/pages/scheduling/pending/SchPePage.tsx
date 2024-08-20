import { Tab } from '@postcoil/ui';
import { Button } from 'antd';
import { useState } from 'react';

import styles from './SchPePage.module.scss';
import DraggableChart from '../../../components/scheduling/pending/DraggableChart';

import RollSuccessModal from '@/components/common/RollSuccessModal';
import ContentContainer from '@/components/scheduling/pending/ContentContainer';
import FilterContainer from '@/components/scheduling/pending/FilterContainer';

const SchPePage = () => {
  const [isGraphVisible, setIsGraphVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleApply = () => {
    setIsModalOpen(false);
    // TODO: 다음 결과보는 페이지로 갈 것
  };

  const handleTabChange = () => {
    setIsGraphVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.page}>
      <h1>Schedule 편성 관리</h1>
      <FilterContainer />
      <section className={styles.tab}>
        <Tab labels={['그래프', '리스트']} onChange={handleTabChange} />
      </section>
      <div className={styles.result}>
        {isGraphVisible ? <DraggableChart /> : <ContentContainer />}
      </div>
      <Button className={styles.btn} type="primary" onClick={handleModal}>
        스케줄 등록
      </Button>
      <RollSuccessModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleApply={handleApply}
        title="스케줄이 정상적으로 등록되었습니다."
      />
    </div>
  );
};

export default SchPePage;
