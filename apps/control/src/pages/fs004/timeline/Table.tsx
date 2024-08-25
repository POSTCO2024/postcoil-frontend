import { Table as AntTable } from '@postcoil/ui';
import { DataType } from '@postcoil/ui/config/TableConfig';
import { ColumnDataType } from '@postcoil/ui/config/TableConfig';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Table.module.scss';

// info
// API 결과를 columns, data에 저장하여 사용
// props1: CheckBox 사용 여부를 props를 이용하여 useCheckBox에 true/false로 전달해준다.
// props2: 테이블의 내용(columns, data)을 json형식으로 전달해준다.
// ex) <Table useCheckBox={true} columns={columnsData} data={tableData} />

// Dataset Type
interface SchDataType extends DataType {
  key: string;
  no: string | number;
  scheduleId: string;
  createdDate: string;
  rollID: string;
  facility: string;
  startTime: string;
  endTime: string;
  rejectCount: number;
}

interface TableComponentProps {
  // Config
  columns: ColumnDataType<SchDataType>[];
  data: SchDataType[];
}

// Column Event
// const onTableChange: TableProps<SchDataType>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
//   console.log('params', pagination, filters, sorter, extra);
// };

export const Table = ({ columns, data }: TableComponentProps) => {
  const navigate = useNavigate();
  const handleRowClick = (record: { scheduleId: string }) => {
    console.log(record);
    navigate(`/roll/${record.scheduleId}`);
  };
  return (
    <div className={styles.tableContainer}>
      <AntTable
        data={data}
        columns={columns}
        // onChange={onTableChange}
        handleRowClick={handleRowClick}
      />
    </div>
  );
};

export default Table;
