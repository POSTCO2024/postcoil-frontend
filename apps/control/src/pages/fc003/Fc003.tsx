import { Tab } from '@postcoil/ui';
import React, { useState } from 'react';

import DashBoard from './dashBoard/DashBoard';
import styles from './Fc003.module.scss';
import StockCharts from './stock/StockCharts';

const Fc003: React.FC = () => {
  const [isChart, setIsChart] = useState(false);
  const changeTab = () => {
    setIsChart(!isChart);
  };
  return (
    <div className={styles.page}>
      <h1>공장별 작업대상재 현황</h1>
      <div className={styles.tab}>
        <Tab
          labels={['작업 현황 모니터링', '공장별 수급량 조회']}
          onChange={changeTab}
        />
      </div>
      <div className={styles.content}>
        {isChart ? <StockCharts /> : <DashBoard />}
      </div>
    </div>
  );
};

export default Fc003;
