import React from 'react';
import { Tab, Table } from '@postcoil/ui';
import { TopBar } from '../TopBar/TopBar';
import styles from './Board.module.scss';
import Modal from '../Modal/Modal';

const Board: React.FC<{}> = () => {
  const label = ['에러재', '정상재'];

  return (
    <div className={styles.boardContainer}>
      <h3>공정 별 에러재 관리</h3>
      <TopBar />
      <Tab labels={label} />
      <Table />
      <Modal />
    </div>
  );
};

export default Board;
