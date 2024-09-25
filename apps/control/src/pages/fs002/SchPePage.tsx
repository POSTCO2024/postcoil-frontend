import { Tab } from '@postcoil/ui';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

import SchListModal from './pending/SchListModal';
import styles from './SchPePage.module.scss';

import ContentContainer from '@/pages/fs002/pending/ContentContainer';
import DraggableChart from '@/pages/fs002/pending/DraggableChart';
import FilterContainer from '@/pages/fs002/pending/FilterContainer';
import { useMaterialStore, useScheduleStore } from '@/store/fs002store';

const SchPePage = () => {
  const data = useMaterialStore((state) => state.data);
  useEffect(() => {
    return () => {
      // Fetch한 data 초기화
      useScheduleStore.setState({ data: null });
      useMaterialStore.setState({ data: null });
    };
  }, []);

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
      {data && (
        <Button className={styles.btn} type="primary" onClick={handleModal}>
          스케줄 등록
        </Button>
      )}
      <SchListModal
        isModalOpen={isModalOpen}
        onApply={handleApply}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default SchPePage;
