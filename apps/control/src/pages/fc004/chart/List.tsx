import React from 'react';
import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';

import styles from './List.module.scss';

interface DataType {
  key: string;
  no: string;
  name: string;
  age: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '',
    dataIndex: 'no',
    width: 35,
    key: 'no',
  },
  {
    title: '재료ID',
    width: 90,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '생산 마감일',
    width: 90,
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '',
    width: 50,
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => <Tag color="red">{tags}</Tag>,
  },
];

const data: DataType[] = [
  {
    key: '1',
    no: '1',
    name: 'HC0001234',
    age: '2024-08-23',
    tags: ['D-1'],
  },
  {
    key: '2',
    no: '2',
    name: 'HC0000033',
    age: '2024-08-23',
    tags: ['D-1'],
  },
  {
    key: '3',
    no: '3',
    name: 'HC0057894',
    age: '2024-08-23',
    tags: ['D-1'],
  },
  {
    key: '4',
    no: '4',
    name: 'HC0000030',
    age: '2024-08-24',
    tags: ['D-2'],
  },
  {
    key: '5',
    no: '5',
    name: 'HC0000001',
    age: '2024-08-24',
    tags: ['D-2'],
  },
  {
    key: '6',
    no: '6',
    name: 'HC0020010',
    age: '2024-08-24',
    tags: ['D-2'],
  },
  {
    key: '7',
    no: '7',
    name: 'HC0000301',
    age: '2024-08-24',
    tags: ['D-2'],
  },
  {
    key: '8',
    no: '8',
    name: 'HC0555641',
    age: '2024-08-25',
    tags: ['D-3'],
  },
  {
    key: '9',
    no: '9',
    name: 'HC0000222',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '10',
    no: '10',
    name: 'HC0050303',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '11',
    no: '11',
    name: 'HC0220000',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '12',
    no: '12',
    name: 'HC0001551',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '13',
    no: '13',
    name: 'HC0025301',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '14',
    no: '14',
    name: 'HC0888701',
    age: '2024-08-27',
    tags: ['D-5'],
  },
];

export const List: React.FC = () => {
  return (
    <div className={styles.listContainer}>
      {/* <h4>마감 임박!!</h4> */}
      <Table
        className={styles.chartContainer}
        columns={columns}
        dataSource={data}
        size="small"
        pagination={false}
        scroll={{ x: 100, y: 200 }}
      />
    </div>
  );
};

export default List;
