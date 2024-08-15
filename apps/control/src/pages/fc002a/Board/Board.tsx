import { Tab, Table } from '@postcoil/ui';
import React from 'react';

import styles from './Board.module.scss';
import Modal from '../Modal/Modal';
import { TopBar } from '../TopBar/TopBar';

// Table 임의 데이터
const columnsData = [
  {
    title: 'no',
    dataIndex: 'no',
    sorter: {
      compare: (a: any, b: any) => a.no - b.no,
      multiple: 3,
    },
  },
  {
    title: '코일 ID',
    dataIndex: 'id',
    sorter: {
      compare: (a: any, b: any) => a.id.localeCompare(b.id),
      multiple: 2,
    },
  },
  {
    title: '두께',
    dataIndex: 'length',
    sorter: {
      compare: (a: any, b: any) => a.length - b.length,
      multiple: 1,
    },
  },
  {
    title: '폭',
    dataIndex: 'width',
    sorter: {
      compare: (a: any, b: any) => a.width - b.width,
      multiple: 0,
    },
  },
];

const tableData = [
  {
    key: '1',
    no: '1',
    id: 'A001',
    length: 60,
    width: 70,
  },
  {
    key: '2',
    no: '2',
    id: 'A002',
    length: 66,
    width: 89,
  },
  {
    key: '3',
    no: '3',
    id: 'A003',
    length: 90,
    width: 70,
  },
];

export const Board: React.FC = () => {
  const label = ['에러재', '정상재'];

  return (
    <div className={styles.boardContainer}>
      <h3>공정 별 에러재 관리</h3>
      <TopBar />
      <Tab labels={label} />
      <Table useCheckBox={true} columns={columnsData} data={tableData} />

      <Modal />
    </div>
  );
};

export default Board;
