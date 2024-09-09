import { Tab } from '@postcoil/ui';
import { useState } from 'react';

import AnalyzeChart from './result/AnalyzeChart';
import ContentContainer from './result/ContentContainer';
import DraggableChart from './result/DraggableChart';
import DraggableChart2 from './result/DraggableChart2';
import FilterContainer from './result/FilterContainer';
import styles from './TaskInstruction.module.scss';

export const TaskInstruction = () => {
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  const handleTabChange = () => {
    setIsGraphVisible((prevState) => !prevState);
  };
  return (
    <div className={styles.page}>
      <h1>작업 지시 전문</h1>
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
        <div className={styles.summary}>
          <AnalyzeChart />
        </div>
      </div>
    </div>
  );
};

export default TaskInstruction;
