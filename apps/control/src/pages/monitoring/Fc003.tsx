import { Tab } from '@postcoil/ui';
import React, { useState } from 'react';

import styles from './Fc003.module.scss';
import StockCharts from './stock/StockCharts';
import DashBoard from '../fc003a/DashBoard/DashBoard';

const Fc003: React.FC = () => {
  const [isChart, setIsChart] = useState(false);
  const changeTab = () => {
    setIsChart(!isChart);
  };
  return (
    <div style={{ height: '100%', backgroundColor: '#f5f5f5' }}>
      <div style={{ height: '100%', backgroundColor: '#f5f5f5' }}>
        <h1 className={styles.title}>공장별 수급량 조회</h1>

        <div className={styles.frame}>
          <div className={styles.tab_frame}>
            <Tab labels={['공정별 보기', '그래프보기']} onChange={changeTab} />
          </div>
          <div className={styles.content_frame}>
            {isChart ? <StockCharts /> : <DashBoard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fc003;
