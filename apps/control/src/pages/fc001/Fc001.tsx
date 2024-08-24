import { Table, Tab } from '@postcoil/ui';
import React, { useState } from 'react';

import styles from './Fc001.module.scss';
import { TopBar } from './topBar/TopBar';
import { RowheaderTable } from './rowheadertable/RowheaderTable';

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
const data = [
  // key: Row Header에 들어갈 값 => 품명 데이터
  // 잔공정의 수치
  {
    key: 'AA',
    final: 11,
    cal1: 24,
    cal2: 15,
    egl1: 2,
    egl2: 3,
    cgl1: 10,
    cgl2: 11,
    packing: 1,
  },
  {
    key: 'BB',
    final: 10,
    cal1: 4,
    cal2: 23,
    egl1: 2,
    egl2: 3,
    cgl1: 10,
    cgl2: 11,
    packing: 1,
  },
  {
    key: 'CC',
    final: 5,
    cal1: 12,
    cal2: 5,
    egl1: 2,
    egl2: 4,
    cgl1: 9,
    cgl2: 13,
    packing: 6,
  },
  {
    key: 'DD',
    final: 2,
    cal1: 32,
    cal2: 11,
    egl1: 12,
    egl2: 6,
    cgl1: 7,
    cgl2: 1,
    packing: 1,
  },
  {
    key: 'EE',
    final: 15,
    cal1: 2,
    cal2: 1,
    egl1: 10,
    egl2: 11,
    cgl1: 7,
    cgl2: 2,
    packing: 12,
  },
];

const columns = [
  {
    title: '품명', // Row Header Title
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Final',
    dataIndex: 'final',
    key: 'final',
  },
  {
    title: '1CAL',
    dataIndex: 'cal1',
    key: 'cal1',
  },
  {
    title: '2CAL',
    dataIndex: 'cal2',
    key: 'cal2',
  },
  {
    title: '1EGL',
    dataIndex: 'egl1',
    key: 'egl1',
  },
  {
    title: '2EGL',
    dataIndex: 'egl2',
    key: 'egl2',
  },
  {
    title: '1CGL',
    dataIndex: 'cgl1',
    key: 'cgl1',
  },
  {
    title: '2CGL',
    dataIndex: 'cgl2',
    key: 'cgl2',
  },
  {
    title: '포장',
    dataIndex: 'packing',
    key: 'packing',
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
          <RowheaderTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default Fc001;
