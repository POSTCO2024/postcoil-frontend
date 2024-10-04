import { Tab } from '@postcoil/ui';
import { useEffect, useState } from 'react';

import AnalyzeChart from './result/AnalyzeChart';
import Chart from './result/Chart';
import styles from './TaskInstruction.module.scss';

import ContentContainer from '@/pages/fo001/result/ContentContainer';
import FilterContainer from '@/pages/fo001/result/FilterContainer';
import {
  initializeWebSocket,
  useWorkInstructionStore,
} from '@/store/fo001store';

const SchRPage = () => {
  const [isGraphVisible, setIsGraphVisible] = useState(true);
  const fetchData = useWorkInstructionStore((state) => state.fetchData!);

  useEffect(() => {
    initializeWebSocket(); // 웹소켓 초기화
    fetchData(['1CAL']);
  }, []);

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
            <Chart chartName="width" />
            <Chart chartName="thickness" />
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

export default SchRPage;
