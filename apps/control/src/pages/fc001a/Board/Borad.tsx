import { Table } from '@postcoil/ui';
import React from 'react';

import styles from './Board.module.scss';
import { TopBar } from '../TopBar/TopBar';

export const Board: React.FC = () => {
  return (
    <div className={styles.boardContainer}>
      <h3>공정 별 작업대상재 관리</h3>
      <TopBar />
      <Table />
    </div>
  );
};

export default Board;
