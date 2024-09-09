import { Tab, Table } from '@postcoil/ui';
import { ColumnDataType, DataType } from '@postcoil/ui/config/TableConfig';
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import styles from './Fs004a.module.scss';
import ContentContainer from './timeline/ContentContainer';
import DraggableChart from './timeline/DraggableChart';
import DraggableChart2 from './timeline/DraggableChart2';
import FilterContainer from './timeline/FilterContainer';

interface SchDataType extends DataType {
  key?: string;
  no: string | number;
  scheduleId: string;
  createdDate: string;
  rollID: string;
  facility: string;
  startTime: string;
  endTime: string;
  rejectCount?: string | number;
}

// Table 임의 데이터
const columnsData: ColumnDataType<SchDataType>[] = [
  {
    title: 'no',
    dataIndex: 'no',
    sortable: {
      compare: (a, b) => a.no - b.no,
      multiple: 3,
    },
  },
  {
    title: '스케줄ID',
    dataIndex: 'scheduleId',
  },
  {
    title: '생성일자',
    dataIndex: 'createdDate',
    sortable: {
      compare: (a, b) => a.createdDate - b.createdDate,
      multiple: 1,
    },
  },
  {
    title: '재료단위',
    dataIndex: 'rollID',
    sortable: {
      compare: (a, b) => a.rollID - b.rollID,
      multiple: 0,
    },
  },
  {
    title: '해당공정',
    dataIndex: 'facility',
    sortable: {
      compare: (a, b) => a.facility - b.facility,
      multiple: 4,
    },
  },
  {
    title: '작업 시작 시간',
    dataIndex: 'startTime',
    sortable: {
      compare: (a, b) => a.startTime - b.startTime,
      multiple: 5,
    },
  },
  {
    title: '작업 종료 시간',
    dataIndex: 'endTime',
    sortable: {
      compare: (a, b) => a.endTime - b.endTime,
      multiple: 6,
    },
  },
  {
    title: 'Reject수',
    dataIndex: 'rejectCount',
    sortable: {
      compare: (a, b) => a.endTime - b.endTime,
      multiple: 6,
    },
  },
];

const baseData: SchDataType[] = [
  {
    no: 1,
    scheduleId: '1CAL001A',
    createdDate: '2024-08-20',
    rollID: 'A',
    facility: '1CAL',
    startTime: '2024-08-21 18:00:21',
    endTime: '2024-08-21 21:00:21',
    rejectCount: '1',
  },
  {
    no: 2,
    scheduleId: '1CAL002A',
    createdDate: '2024-08-20',
    rollID: 'A',
    facility: '1CAL',
    startTime: '2024-08-21 21:00:21',
    endTime: '2024-08-21 00:00:21',
    rejectCount: '0',
  },
  {
    no: 3,
    scheduleId: '1CAL003A',
    createdDate: '2024-08-20',
    rollID: 'A',
    facility: '1CAL',
    startTime: '2024-08-21 00:00:21',
    endTime: '2024-08-22 03:00:21',
    rejectCount: '0',
  },
  {
    no: 4,
    scheduleId: '1CAL004A',
    createdDate: '2024-08-21',
    rollID: 'A',
    facility: '1CAL',
    startTime: '2024-08-22 03:00:21',
    endTime: '2024-08-22 06:00:21',
    rejectCount: '0',
  },
];

const Fs004a: React.FC = () => {
  // const navigate = useNavigate();
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  const handleTabChange = () => {
    setIsGraphVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.page}>
      <h1>Schedule 이력</h1>
      <FilterContainer />
      <div className={styles.schtable}>
        <Table
          useCheckBox={false}
          columns={columnsData}
          data={baseData}
          handleRowClick={(record) => {
            console.log(record);
            // navigate(`/roll/${record!.scheduleId}`);
          }}
          size="small"
        />
      </div>
      <section className={styles.tab}>
        <Tab labels={['그래프', '리스트']} onChange={handleTabChange} />
      </section>
      <div className={styles.result}>
        {isGraphVisible ? (
          <div className={styles.charts}>
            <DraggableChart2 />
            <DraggableChart />
          </div>
        ) : (
          <ContentContainer />
        )}
      </div>
    </div>
  );
};

export default Fs004a;
