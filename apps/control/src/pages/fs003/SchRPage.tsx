import { Tab } from '@postcoil/ui';
import { useEffect, useState } from 'react';

import AnalyzeChart from './result/AnalyzeChart';
import Chart from './result/Chart';
import styles from './SchRPage.module.scss';

import ContentContainer from '@/pages/fs003/result/ContentContainer';
import FilterContainer from '@/pages/fs003/result/FilterContainer';
import {
  initializeWebSocket,
  useWorkInstructionStore,
} from '@/store/fs003store';

const SchRPage = () => {
  const [isGraphVisible, setIsGraphVisible] = useState(true);
  const fetchData = useWorkInstructionStore((state) => state.fetchData!);
  // const cleanWorkInstructionData = useWorkInstructionStore(
  //   (state) => state.cleanData!,
  // ); // cleanData 함수 추가

  // const [first, setFirst] = useState(0);

  useEffect(() => {
    initializeWebSocket(); // 웹소켓 초기화
    fetchData(['1CAL']);
    fetchData(['2CAL']);

    // setFirst(1);

    return () => {
      // if (first === 1) {
      console.log('페이지 떠나기');
      // cleanWorkInstructionData();
      // setFirst(0);
      // }
    };
  }, []);

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
