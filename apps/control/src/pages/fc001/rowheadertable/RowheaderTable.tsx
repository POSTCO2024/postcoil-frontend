import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
  key: string;
  total: number;
  packing: number;
  unpacking: number;
  cal1: number;
  cal2: number;
  total: number;
  packing: number;
  unpacking: number;
  cgl1: number;
  cgl2: number;
  egl1: number;
  egl2: number;
}

interface RowheaderTableProps {
  columns: ColumnsType<DataType>;
  data: DataType[];
}

export const RowheaderTable: React.FC<RowheaderTableProps> = ({
  columns,
  data,
}) => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default RowheaderTable;
