import React from 'react';
import { Table as AntTable } from 'antd';
import { TableProps } from 'antd/es/table'; // Table
import { createColumns, data } from './TableConfig';
import styles from './Table.module.scss';

// info
// API 결과를 columns, data에 저장하여 사용
// CheckBox 사용 여부를 props를 이용하여 useCheckBox에 true/false로 전달해준다.
// ex) <Table useCheckBox={true} />

interface TableComponentProps {
  useCheckBox: boolean;
}

// Column Event
const onTableChange: TableProps<(typeof data)[0]>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Table: React.FC<TableComponentProps> = ({ useCheckBox }) => {
  const columns = createColumns(useCheckBox);

  return (
    <div className={styles.tableContainer}>
      <AntTable
        className={styles.antTable}
        columns={columns}
        dataSource={data}
        onChange={onTableChange}
      />
    </div>
  );
};

export default Table;
