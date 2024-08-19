import React, { useState } from 'react';
import { Flex, Progress, Tabs, Table } from 'antd';
import type { TabsProps, TableColumnsType } from 'antd';

import styles from './Board.module.scss';

// Table Data Type
interface DataType {
  key: React.Key;
  name: string;
  age: string;
}

// Table Columns 설정
const columns: TableColumnsType<DataType> = [
  {
    title: 'col',
    dataIndex: 'name',
  },
  {
    title: 'val',
    dataIndex: 'age',
  },
];

// 각 탭의 내용 정의
const tabContents: Record<string, React.ReactNode> = {
  '1': (
    <>
      <Flex className={styles.progress} gap="small" wrap>
        <Progress type="circle" percent={75} />
      </Flex>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={[
          { key: '1', name: '생산 마감일', age: '2024-10-15' },
          { key: '2', name: '목표 수량', age: '131' },
          { key: '3', name: '작업 완료', age: '42' },
          { key: '4', name: '작업 예정', age: '89' },
        ]}
        size="small"
        pagination={false}
      />
    </>
  ),
  '2': (
    <>
      <Flex className={styles.progress} gap="small" wrap>
        <Progress type="circle" percent={50} />
      </Flex>
      <Table
        className={styles.table}
        columns={columns}
        dataSource={[
          { key: '1', name: '생산 마감일', age: '2024-11-15' },
          { key: '2', name: '목표 수량', age: '200' },
          { key: '3', name: '작업 완료', age: '100' },
          { key: '4', name: '작업 예정', age: '100' },
        ]}
        size="small"
        pagination={false}
      />
    </>
  ),
};

// 탭 변경 시 실행되는 함수
const onChange = (key: string) => {
  console.log(`Tab changed to ${key}`);
};

export const Board: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('1');

  return (
    <div className={styles.boardContainer}>
      <h3>공정</h3>
      {/* Tabs 컴포넌트에 onChange 핸들러 연결 */}
      <Tabs
        className={styles.tab}
        defaultActiveKey="1"
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={[
          { key: '1', label: '1PCM' },
          { key: '2', label: '2PCM' },
        ]}
      />
      {/* 활성화된 탭에 따라 내용 렌더링 */}
      {tabContents[activeKey]}
    </div>
  );
};

export default Board;
