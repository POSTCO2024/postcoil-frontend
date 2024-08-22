import React from 'react';
import { Space, Table, Tag } from 'antd';
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
    width: 25,
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
    width: 100,
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '',
    width: 50,
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => <Tag color="red">{tags}</Tag>,
    // render: (_, { tags }) => (
    //     <>
    //         {tags.map((tag) => {
    //             let color = tag.length > 5 ? 'geekblue' : 'green';
    //             if (tag === 'loser') {
    //                 color = 'volcano';
    //             }
    //             return (
    //                 <Tag color={color} key={tag}>
    //                     {tag.toUpperCase()}
    //                 </Tag>
    //             );
    //         })}
    //     </>
    // ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    no: '1',
    name: 'HC0000001',
    age: '2024-08-23',
    tags: ['D-1'],
  },
  {
    key: '2',
    no: '2',
    name: 'HC0000001',
    age: '2024-08-23',
    tags: ['D-1'],
  },
  {
    key: '3',
    no: '3',
    name: 'HC0000001',
    age: '2024-08-23',
    tags: ['D-1'],
  },
  {
    key: '4',
    no: '4',
    name: 'HC0000002',
    age: '2024-08-24',
    tags: ['D-2'],
  },
  {
    key: '5',
    no: '5',
    name: 'HC0000002',
    age: '2024-08-24',
    tags: ['D-2'],
  },
  {
    key: '6',
    no: '6',
    name: 'HC0000010',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '7',
    no: '7',
    name: 'HC0000301',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '8',
    no: '8',
    name: 'HC0000301',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '3',
    no: '3',
    name: 'HC0000301',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '3',
    no: '3',
    name: 'HC0000301',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '3',
    no: '3',
    name: 'HC0000301',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '3',
    no: '3',
    name: 'HC0000301',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '3',
    no: '3',
    name: 'HC0000301',
    age: '2024-08-27',
    tags: ['D-5'],
  },
  {
    key: '3',
    no: '3',
    name: 'HC0000301',
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
