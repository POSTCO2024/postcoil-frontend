import React from 'react';

import Board from './board/Board';
import styles from './DashBoard.module.scss';

// Tab Dataset
const tabDataPCM = [
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

const tabDataCAL = [
  {
    key: '1',
    label: '1CAL',
    percent: 42,
    tableData: [
      { key: '2', column: '목표 수량', value: '100' },
      { key: '3', column: '작업 완료', value: '42' },
      { key: '4', column: '작업 예정', value: '64' },
    ],
  },
  {
    key: '2',
    label: '2CAL',
    percent: 80,
    tableData: [
      { key: '2', column: '목표 수량', value: '130' },
      { key: '3', column: '작업 완료', value: '30' },
      { key: '4', column: '작업 예정', value: '100' },
    ],
  },
];

const tabDataEGL = [
  {
    key: '1',
    label: '1EGL',
    percent: 35,
    tableData: [
      { key: '2', column: '목표 수량', value: '122' },
      { key: '3', column: '작업 완료', value: '42' },
      { key: '4', column: '작업 예정', value: '89' },
    ],
  },
  {
    key: '2',
    label: '2EGL',
    percent: 50,
    tableData: [
      { key: '2', column: '목표 수량', value: '100' },
      { key: '3', column: '작업 완료', value: '51' },
      { key: '4', column: '작업 예정', value: '49' },
    ],
  },
];

const tabDataCGL = [
  {
    key: '1',
    label: '1CGL',
    percent: 75,
    tableData: [
      { key: '2', column: '목표 수량', value: '110' },
      { key: '3', column: '작업 완료', value: '42' },
      { key: '4', column: '작업 예정', value: '82' },
    ],
  },
  {
    key: '2',
    label: '2CGL',
    percent: 3,
    tableData: [
      { key: '2', column: '목표 수량', value: '151' },
      { key: '3', column: '작업 완료', value: '3' },
      { key: '4', column: '작업 예정', value: '145' },
    ],
  },
];

export const DashBoard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h3>작업 현황 모니터링</h3>
      <div className={styles.boardContainer}>
        <Board tabData={tabDataPCM} />
        <Board tabData={tabDataCAL} />
        <Board tabData={tabDataEGL} />
        <Board tabData={tabDataCGL} />
      </div>
    </div>
  );
};

export default DashBoard;
