import { Table as AntTable, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox'; // CheckBox
import { ColumnsType, TableProps } from 'antd/es/table'; // Table
import React from 'react';
import './Table.scss';

// info
// API 결과를 columns, data에 저장하여 사용
// CheckBox 사용 시, 아래 ** checkbox 설정 - true/false ** 부분 주석를 해제하여 사용

// Dataset
interface DataType {
  key: string;
  no: string;
  id: string;
  length: number;
  width: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'no',
    dataIndex: 'no',
  },
  {
    title: '코일 ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 3,
    },
  },
  {
    title: '두께',
    dataIndex: 'length',
    sorter: {
      compare: (a, b) => a.length - b.length,
      multiple: 2,
    },
  },
  {
    title: '폭',
    dataIndex: 'width',
    sorter: {
      compare: (a, b) => a.width - b.width,
      multiple: 1,
    },
  },
  // ** checkbox 설정 - true/false **
  {
    title: 'Error Pass', // 컬럼명 수정 필요
    dataIndex: 'select',
    render: (_, record) => (
      <Checkbox onChange={(e) => onCheckboxChange(e, record.key)} />
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    no: '1',
    id: 'A001',
    length: 60,
    width: 70,
  },
  {
    key: '2',
    no: '2',
    id: 'A002',
    length: 66,
    width: 89,
  },
  {
    key: '3',
    no: '3',
    id: 'A003',
    length: 90,
    width: 70,
  },
  {
    key: '4',
    no: '4',
    id: 'A004',
    length: 99,
    width: 89,
  },
];

// Column Event
const onTableChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

// CheckBox Event
const onCheckboxChange = (e: CheckboxChangeEvent, key: string) => {
  console.log(`Checkbox for row ${key} checked = ${e.target.checked}`);
};

export const Table: React.FC = () => {
  return (
    <div className="table-container">
      <AntTable
        className="ant-table"
        columns={columns}
        dataSource={data}
        onChange={onTableChange}
      />
    </div>
  );
};

export default Table;
