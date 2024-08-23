import { Tab } from '@postcoil/ui';
import { useState } from 'react';

import styles from './SchRPage.module.scss';

import ContentContainer from '@/pages/fs003/result/ContentContainer';
import DraggableChart from '@/pages/fs003/result/DraggableChart';
import DraggableChart2 from '@/pages/fs003/result/DraggableChart2';
import FilterContainer from '@/pages/fs003/result/FilterContainer';

const SchRPage = () => {
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  const handleTabChange = () => {
    setIsGraphVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.page}>
      <h1>Schedule 결과</h1>
      <FilterContainer />
      <section className={styles.tab}>
        <Tab labels={['그래프', '리스트']} onChange={handleTabChange} />
      </section>
      <div className={styles.result}>
        {isGraphVisible ? (
          <div className={styles.charts}>
            <DraggableChart2 />
            <DraggableChart />
          </div>
        ) : (
          <ContentContainer />
        )}
        <div
          className={styles.summary}
          style={{
            width: '100%',
            height: '30%',
            backgroundColor: 'lightgray',
            position: 'absolute',
            bottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            textAlign: 'center',
            borderRadius: '10px',
          }}>
          스케줄 재료 분석
        </div>
      </div>
    </div>
  );
};

export default SchRPage;
