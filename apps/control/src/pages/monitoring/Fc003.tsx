import { Tab } from '@postcoil/ui';
import React, { useState } from 'react';

import StockCharts from './stock/StockCharts';
import Board from '../fc002a/Board/Board';

const Fc003: React.FC = () => {
  const [isChart, setIsChart] = useState(false);
  const changeTab = () => {
    setIsChart(!isChart);
  };
  return (
    <div style={{ height: '97%' }}>
      <h1
        style={{
          fontSize: '1.5em',
          fontWeight: 'bolder',
          marginLeft: '2%',
          marginTop: '20px',
        }}>
        공장별 수급량 조회
      </h1>
      <Tab labels={['공정별 보기', '그래프보기']} onChange={changeTab} />
      <div style={{ height: '80%' }}>
        {isChart ? <StockCharts /> : <Board />}
      </div>
    </div>
  );
};

export default Fc003;
