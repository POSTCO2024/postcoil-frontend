import React from 'react';
import Board from '../Board/Board';

import styles from './DashBoard.module.scss';

export const DashBoard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h3>공정 별 수급량 분석</h3>
      <div className={styles.boardContainer}>
        <Board />
        <Board />
        <Board />
        <Board />
      </div>
    </div>
  );
};

export default DashBoard;
