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

const data: DataType[] = [
  // key: Row Header에 들어갈 값 => 품명 데이터
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

export const RowheaderTable: React.FC = () => {
  const columns: TableColumnsType<DataType> = [
    {
      title: '품명', // Row Header Title
      dataIndex: 'key',
      rowScope: 'row',
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

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default RowheaderTable;
