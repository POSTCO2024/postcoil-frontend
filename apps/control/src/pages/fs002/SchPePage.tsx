import { Tab } from '@postcoil/ui';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

import Charts from './pending/Charts';
import SchListModal from './pending/SchListModal';
import styles from './SchPePage.module.scss';

import ContentContainer from '@/pages/fs002/pending/ContentContainer';
import FilterContainer from '@/pages/fs002/pending/FilterContainer';
import { useMaterialStore, useScheduleStore } from '@/store/fs002store';

const SchPePage = () => {
  const data = useMaterialStore((state) => state.data);
  const resetData = useMaterialStore((state) => state.resetData)!;
  const cleanScheduleData = useScheduleStore((state) => state.cleanData!); // cleanData 함수 추가
  const cleanMaterialData = useMaterialStore((state) => state.cleanData!); // cleanData 함수 추가

  const [first, setFirst] = useState(0);

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

  const handleReset = () => {
    resetData();
  };

  useEffect(() => {
    // setFirst(1);
    // return () => {
    //   // if (first === 1) {
    //   console.log('페이지 떠나기');
    //   cleanScheduleData();
    //   cleanMaterialData();
    //   // setFirst(0);
    //   // }
    // };
  }, []);

  return (
    <div className={styles.page}>
      <h1>Schedule 편성 관리</h1>
      <FilterContainer />
      <section className={styles.tab}>
        <Tab labels={['그래프', '리스트']} onChange={handleTabChange} />
      </section>
      <div className={styles.result}>
        <div className={styles.graph}>
          <Button
            style={data ? { visibility: 'visible' } : { visibility: 'hidden' }}
            className={styles.resetBtn}
            onClick={handleReset}>
            초기화
          </Button>
          {isGraphVisible ? <Charts /> : <ContentContainer />}
        </div>
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
