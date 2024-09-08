import { Table, Tab } from '@postcoil/ui';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './Fc001.module.scss';
import { RowheaderTable } from './rowheadertable/RowheaderTable';
import { TopBar } from './topBar/TopBar';

import {
  columnsList,
  dataList,
  columnsTable,
} from '@/config/control/Fc001Utils';

async function getRowTable() {
  const url = `http://localhost:8086/control/fc001a/table`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const Fc001: React.FC = () => {
  const label = ['리스트', '표']; // Tab
  const [isValue, setIsValue] = useState(true); // 기본값을 true로 설정(첫페이지)
  const [RowTableData, setRowTableData] = useState<any[]>([]);

  // Tab 이동
  const changeTab = () => {
    setIsValue(!isValue);
  };

  useEffect(() => {
    if (!isValue) {
      const fetchData = async () => {
        const data = await getRowTable(); // API 요청
        setRowTableData(data);
        console.log('표 불러오기 ');
      };
      fetchData();
    }
  }, [isValue]); // isValue가 변경될 때마다 실행

  return (
    <div className={styles.boardContainer}>
      <h1>공정별 작업대상재 관리</h1>
      <TopBar />
      <div className={styles.tab}>
        <Tab labels={label} onChange={changeTab} />
      </div>
      <div className={styles.tableContainer}>
        {isValue ? (
          <div className={styles.table}>
            <Table
              columns={columnsList}
              data={dataList}
              scroll={{ x: 'max-content', y: 500 }}
            />
          </div>
        ) : (
          <div className={styles.customTable}>
            <RowheaderTable
              columns={columnsTable}
              data={RowTableData.map((item, index) => ({
                ...item,
                key: index,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Fc001;
