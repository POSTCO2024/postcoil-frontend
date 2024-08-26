import React from 'react';
import type { TableColumnsType } from 'antd';
import { Table } from 'antd';

interface DataType {
  key: string;
  total: number;
  packing: number;
  unpacking: number;
  cal1: number;
  cal2: number;
}

interface RowheaderTableProps {
  columns: TableColumnsType<DataType>;
  data: DataType[];
}

export const RowheaderTable: React.FC<RowheaderTableProps> = ({
  columns,
  data,
}) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default RowheaderTable;
