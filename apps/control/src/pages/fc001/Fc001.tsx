import { Table, Tab } from '@postcoil/ui';
import React, { useState } from 'react';

import styles from './Fc001.module.scss';
import { RowheaderTable } from './rowheadertable/RowheaderTable';
import { TopBar } from './topBar/TopBar';

import {
  columnsList,
  dataList,
  columnsTable,
  dataTable,
} from '@/config/control/Fc001Utils';

export const Fc001: React.FC = () => {
  const label = ['리스트', '표']; // Tab
  const [isValue, setIsValue] = useState(true); // 기본값을 true로 설정(첫페이지)
  const changeTab = () => {
    setIsValue(!isValue);
  };

  return (
    <div className={styles.boardContainer}>
      <h1>공정별 작업대상재 관리</h1>
      <TopBar />
      <div className={styles.tab}>
        <Tab labels={label} onChange={changeTab} />
      </div>
      <div className={styles.table}>
        {isValue ? (
          <Table
            useCheckBox={false}
            columns={columnsList}
            data={dataList}
            scroll={{ x: 'max-content', y: 450 }}
            tableLayout={'fixed'}
          />
        ) : (
          <RowheaderTable columns={columnsTable} data={dataTable} />
        )}
      </div>
    </div>
  );
};

export default Fc001;
