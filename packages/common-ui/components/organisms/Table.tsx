import React from 'react';
import { Table as AntTable } from 'antd';
import { TableProps } from 'antd/es/table'; // Table
import { createColumns } from './TableConfig';
import styles from './Table.module.scss';

// info
// API 결과를 columns, data에 저장하여 사용
// props1: CheckBox 사용 여부를 props를 이용하여 useCheckBox에 true/false로 전달해준다.
// props2: 테이블의 내용(columns, data)을 json형식으로 전달해준다.
// ex) <Table useCheckBox={true} columns={columnsData} data={tableData} />

interface TableComponentProps {
  useCheckBox: boolean;
  // Config
  columns: any[];
  data: any[];
}

// Column Event
const onTableChange: TableProps<any>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

export const Table: React.FC<TableComponentProps> = ({
  useCheckBox,
  columns,
  data,
}) => {
  const processedColumns = createColumns(useCheckBox, columns);

  return (
    <div className={styles.tableContainer}>
      <AntTable
        className={styles.antTable}
        columns={processedColumns}
        dataSource={data}
        onChange={onTableChange}
      />
    </div>
  );
};

export default Table;
