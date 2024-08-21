import { Tab } from '@postcoil/ui';
import { useState } from 'react';

import styles from './SchRPage.module.scss';

import ContentContainer from '@/components/scheduling/result/ContentContainer';
import DraggableChart from '@/components/scheduling/result/DraggableChart';
import FilterContainer from '@/components/scheduling/result/FilterContainer';

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
        {isGraphVisible ? <DraggableChart /> : <ContentContainer />}
      </div>
    </div>
  );
};

export default SchRPage;
