import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Fs004a.module.scss';
import FilterContainer from './timeline/FilterContainer';

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
    dataIndex: 'scheduleId',
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
  scheduleId: 'A001',
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
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1>Schedule 이력</h1>
      <FilterContainer />
      <div className={styles.table}>
        <Table
          useCheckBox={false}
          columns={columnsData}
          data={tableData}
          handleRowClick={(record) => {
            console.log(record);
            navigate(`/roll/${record!.scheduleId}`);
          }}
        />
      </div>
    </div>
  );
};

export default Fs004a;
