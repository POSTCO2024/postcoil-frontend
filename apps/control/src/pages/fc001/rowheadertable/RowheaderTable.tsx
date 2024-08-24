import React from 'react';
import type { TableColumnsType } from 'antd';
import { Table } from 'antd';

interface DataType {
  key: string;
  final: number;
  cal1: number;
  cal2: number;
  egl1: number;
  egl2: number;
  cgl1: number;
  cgl2: number;
  packing: number;
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
