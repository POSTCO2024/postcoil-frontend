import React from 'react';

import styles from './Fs004a.module.scss';

import FilterContainer from '@/components/management/extraction/FilterContainer';
import { Table } from '@/components/scheduling/results/Table';

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
    title: '스케줄ID',
    dataIndex: 'schduleId',
    sorter: {
      compare: (a: any, b: any) => a.id.localeCompare(b.id),
      multiple: 2,
    },
  },
  {
    title: '생성일자',
    dataIndex: 'createdDate',
    sorter: {
      compare: (a: any, b: any) => a.length - b.length,
      multiple: 1,
    },
  },
  {
    title: '롤단위',
    dataIndex: 'rollID',
    sorter: {
      compare: (a: any, b: any) => a.width - b.width,
      multiple: 0,
    },
  },
  {
    title: '해당공정',
    dataIndex: 'facility',
    sorter: {
      compare: (a: any, b: any) => a.width - b.width,
      multiple: 4,
    },
  },
  {
    title: '작업 시작 시간',
    dataIndex: 'startTime',
    sorter: {
      compare: (a: any, b: any) => a.width - b.width,
      multiple: 5,
    },
  },
  {
    title: '작업 종료 시간',
    dataIndex: 'endTime',
    sorter: {
      compare: (a: any, b: any) => a.width - b.width,
      multiple: 6,
    },
  },
];

const baseData = {
  schduleId: 'A001',
  createdDate: '2024-08-20',
  rollID: 'A012H24Q',
  facility: 'PCM',
  startTime: '2024-08-21 18:00:21',
  endTime: '2024-8-21 21:00:21',
  length: 0,
  width: 0,
};

const tableData = Array.from({ length: 9 }, (_, index) => ({
  key: String(index + 1),
  no: String(index + 1),
  id: String(index + 1),
  ...baseData,
}));

const Fs004a: React.FC = () => {
  return (
    <div className={styles.frame}>
      <h1 className={styles.h1}>스케줄 조회</h1>
      <div className={styles.filterContainer}>
        <FilterContainer />
      </div>
      <div style={{ width: '92%', margin: 'auto' }}>
        <Table useCheckBox={false} columns={columnsData} data={tableData} />
      </div>
    </div>
  );
};

export default Fs004a;
