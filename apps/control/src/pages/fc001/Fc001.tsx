import axios from 'axios';

import { Table, Tab } from '@postcoil/ui';
import React, { useState, useEffect } from 'react';

import styles from './Fc001.module.scss';
import { RowheaderTable } from './rowheadertable/RowheaderTable';
import { TopBar } from './topBar/TopBar';

import {
  columnsList,
  columnsTable,
  dataTable,
} from '@/config/control/Fc001Utils';

// 작업대상재 추출 및 저장
async function fetchTargetMaerialData() {
  const url = `http://localhost:8086/control/target`;
  try {
    const response = await axios.get(url);
    console.log('작업 대상재 등록: ' + response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// 작업대상재 목록(List) 조회
async function getTable(processCode: string) {
  const url = `http://localhost:8086/control/fc001a/list/${processCode}`;
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
  const [dataList, setDataList] = useState<any[]>([]); // API로부터 받을 데이터 상태
  const [targetMaterialData, setTargetMaterialData] = useState<any[]>([]);
  const [selectedProcessCode, setSelectedProcessCode] =
    useState<string>('1PCM'); // 선택된 공정

  const changeTab = () => {
    setIsValue(!isValue);
  };

  // 컴포넌트가 마운트될 때 API로부터 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      // 1. 작업대상재 추출 및 저장
      const target = await fetchTargetMaerialData();
      setTargetMaterialData(target);
    };

    fetchData(); // 함수 호출
  }, []);

  useEffect(() => {
    const fetchListData = async () => {
      // 2. 1번 완료 후, 작업대상재 목록 조회
      const data = await getTable(selectedProcessCode);
      setDataList(data); // 가져온 데이터를 상태에 저장
    };

    fetchListData();
  }, [selectedProcessCode]);

  const handleDropdownChange = (processCode: string) => {
    setSelectedProcessCode(processCode); // 공정 변경
  };

  return (
    <div className={styles.boardContainer}>
      <h1>공정별 작업대상재 관리</h1>
      <TopBar onProcessChange={handleDropdownChange} />
      <div className={styles.tab}>
        <Tab labels={label} onChange={changeTab} />
      </div>
      <div className={styles.tableContainer}>
        {isValue ? (
          <div className={styles.table}>
            <Table
              columns={columnsList}
              data={dataList.map((item) => ({ ...item, key: item.id }))}
              scroll={{ x: 'max-content', y: 500 }}
            />
          </div>
        ) : (
          <div className={styles.customTable}>
            <RowheaderTable columns={columnsTable} data={dataTable} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Fc001;
