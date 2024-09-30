import { Tab } from '@postcoil/ui';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import styles from './Fs004a.module.scss';
import Chart from './timeline/Chart';
import ContentContainer from './timeline/ContentContainer';
import FilterContainer from './timeline/FilterContainer';
import ScheduleTable from './timeline/ScheduleTable';

const Fs004a: React.FC = () => {
  // const navigate = useNavigate();
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  const handleTabChange = () => {
    setIsGraphVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.page}>
      <h1>Schedule 이력</h1>
      <FilterContainer />
      <div className={styles.schtable}>
        <ScheduleTable />
      </div>
      <section className={styles.tab}>
        <Tab labels={['그래프', '리스트']} onChange={handleTabChange} />
      </section>
      <div className={styles.result}>
        {isGraphVisible ? (
          <div className={styles.charts}>
            <Chart chartName="width" />
            <Chart chartName="thickness" />
          </div>
        ) : (
          <ContentContainer />
        )}
      </div>
    </div>
  );
};

export default Fs004a;
