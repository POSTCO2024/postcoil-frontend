import React, { useState } from 'react';
import { Flex, Progress, Tabs, Table } from 'antd';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import type { TableColumnsType } from 'antd';

import styles from './Board.module.scss';

// Props
interface BoardProps {
  tabData: Array<{
    key: string;
    label: string;
    percent: number;
    tableData: DataType[];
  }>;
}

// Table Data Type
interface DataType {
  key: React.Key;
  column: string;
  value: string;
}

// Table Columns 설정
const columns: TableColumnsType<DataType> = [
  {
    title: 'col',
    dataIndex: 'column',
  },
  {
    title: 'val',
    dataIndex: 'value',
  },
];

export const Board: React.FC<BoardProps> = ({ tabData }) => {
  const [activeKey, setActiveKey] = useState<string>(tabData[0].key);

  return (
    <div className={styles.boardContainer}>
      <h3>공정</h3>
      {/* Tabs 컴포넌트에 onChange 핸들러 연결 */}
      <Tabs
        className={styles.tab}
        defaultActiveKey={tabData[0].key} // 기본값
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={tabData.map((tab) => ({
          key: tab.key,
          label: tab.label,
        }))}
      />
      {/* == Rerendering 효과 == */}
      <SwitchTransition>
        <CSSTransition
          key={activeKey}
          timeout={200}
          classNames={{
            enter: styles.fadeEnter,
            enterActive: styles.fadeEnterActive,
            exit: styles.fadeExit,
            exitActive: styles.fadeExitActive,
          }}>
          {/* -- 활성화된 탭에 따라 내용 렌더링 -- */}
          <div>
            {tabData.map(
              (tab) =>
                tab.key === activeKey && (
                  <div key={tab.key}>
                    <Flex className={styles.progress} gap="small" wrap>
                      <Progress type="circle" percent={tab.percent} />
                    </Flex>
                    <Table
                      className={styles.table}
                      columns={columns}
                      dataSource={tab.tableData}
                      size="small"
                      pagination={false}
                    />
                  </div>
                ),
            )}
          </div>
          {/* --- */}
        </CSSTransition>
      </SwitchTransition>
      {/* === */}
    </div>
  );
};

export default Board;
