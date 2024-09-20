import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './List.module.scss';

interface ApiResponse<T = any> {
  status: number;
  resultMsg: string;
  result: T[];
}

interface DataType {
  key: string;
  no: string;
  materialNo: string;
  dueDate: string;
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
    dataIndex: 'materialNo',
    key: 'materialNo',
  },
  {
    title: '생산 마감일',
    width: 90,
    dataIndex: 'dueDate',
    key: 'dueDate',
  },
  {
    title: '',
    width: 50,
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => <Tag color="red">{tags}</Tag>,
  },
];

async function getDueDateTable(): Promise<DataType[]> {
  const url = `http://localhost:8086/api/v1/dashboard/dueDate`;
  try {
    const response = await axios.get<ApiResponse>(url);
    if (response.data.status === 200) {
      console.log(response.data.result);
      return response.data.result.map((item, index) => ({
        key: String(index + 1),
        no: String(index + 1),
        materialNo: item.materialNo, // API 응답의 materialNo를 name으로 매핑
        dueDate: formatDate(item.dueDate), // API 응답의 dueDate를 age로 매핑
        tags: [`D-${calculateDaysLeft(item.dueDate)}`], // 남은 일수 계산
      }));
    } else {
      console.log('Error: ', response.data.resultMsg);
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

// 남은 일수 계산 함수
const calculateDaysLeft = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);
  const timeDiff = due.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const formatDate = (dueDate: string) => {
  return new Date(dueDate).toISOString().split('T')[0]; // '2024-12-26' 형식으로 반환
};

export const List: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tableData = await getDueDateTable();
      setData(tableData);
    };
    fetchData();
  }, []);

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
