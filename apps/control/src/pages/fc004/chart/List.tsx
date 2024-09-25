import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import React from 'react';

import styles from './List.module.scss';

interface DataType {
  key: string;
  no: string;
  materialNo: string;
  dueDate: string;
  tags: string[];
}

interface ListProps {
  data: DataType[];
}

export const List: React.FC<ListProps> = ({ data }) => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: '',
      dataIndex: 'no',
      width: 20,
      key: 'no',
    },
    {
      title: '재료ID',
      width: 55,
      dataIndex: 'materialNo',
      key: 'materialNo',
    },
    {
      title: '생산 마감일',
      width: 60,
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: '',
      width: 40,
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => <Tag color="red">{tags}</Tag>,
    },
  ];

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
