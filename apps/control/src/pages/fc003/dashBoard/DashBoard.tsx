import React from 'react';

import Board from './board/Board';
import styles from './DashBoard.module.scss';

// Tab Dataset
const tabData = [
  {
    key: '1',
    label: '1PCM',
    percent: 75,
    tableData: [
      { key: '2', column: '목표 수량', value: '131' },
      { key: '3', column: '작업 완료', value: '42' },
      { key: '4', column: '작업 예정', value: '89' },
    ],
  },
  {
    key: '2',
    label: '2PCM',
    percent: 50,
    tableData: [
      { key: '2', column: '목표 수량', value: '200' },
      { key: '3', column: '작업 완료', value: '100' },
      { key: '4', column: '작업 예정', value: '100' },
    ],
  },
];

export const DashBoard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h3>작업 현황 모니터링</h3>
      <div className={styles.boardContainer}>
        <Board tabData={tabData} />
        <Board tabData={tabData} />
        <Board tabData={tabData} />
        <Board tabData={tabData} />
      </div>
    </div>
  );
};

export default DashBoard;
