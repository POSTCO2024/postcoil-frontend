import { Table, Tab } from '@postcoil/ui';
import React, { useState } from 'react';

import styles from './Fc001.module.scss';
import { TopBar } from './topBar/TopBar';

// 1) List 임의 데이터
const columnsDataList = [
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
  {
    title: '길이',
    dataIndex: 'thickness',
    sorter: {
      compare: (a: any, b: any) => a.thickness - b.thickness,
      multiple: 0,
    },
  },
];

const tableDataList = [
  {
    key: '1',
    no: '1',
    id: 'A001',
    length: 60,
    width: 70,
    thickness: 0.5,
  },
  {
    key: '2',
    no: '2',
    id: 'A002',
    length: 66,
    width: 89,
    thickness: 0.5,
  },
  {
    key: '3',
    no: '3',
    id: 'A003',
    length: 90,
    width: 70,
    thickness: 0.5,
  },
];

//2) Table 임의 데이터
const columnsDataTable = [
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
  {
    title: '길이',
    dataIndex: 'thickness',
    sorter: {
      compare: (a: any, b: any) => a.thickness - b.thickness,
      multiple: 0,
    },
  },
];

const tableDataTable = [
  {
    key: '1',
    no: '1',
    id: 'A001',
    length: 60,
    width: 70,
    thickness: 0.5,
  },
  {
    key: '2',
    no: '2',
    id: 'A002',
    length: 66,
    width: 89,
    thickness: 0.5,
  },
  {
    key: '3',
    no: '3',
    id: 'A003',
    length: 90,
    width: 70,
    thickness: 0.5,
  },
];

export const Fc001: React.FC = () => {
  const label = ['리스트', '표']; // Tab
  const [isValue, setIsValue] = useState(true); // 기본값을 true로 설정(첫페이지)
  const changeTab = () => {
    setIsValue(!isValue);
  };

  return (
    <div className={styles.boardContainer}>
      <h1>공정별 작업대상재 관리</h1>
      <TopBar />
      <div className={styles.tab}>
        <Tab labels={label} onChange={changeTab} />
      </div>
      <div className={styles.table}>
        {isValue ? (
          <Table
            useCheckBox={false}
            columns={columnsDataList}
            data={tableDataList}
          />
        ) : (
          <Table
            useCheckBox={true}
            columns={columnsDataTable}
            data={tableDataTable}
          />
        )}
      </div>
    </div>
  );
};

export default Fc001;
