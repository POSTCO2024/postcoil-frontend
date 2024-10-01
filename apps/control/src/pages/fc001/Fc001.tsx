import { Table, Tab } from '@postcoil/ui';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import styles from './Fc001.module.scss';
import { RowheaderTable } from './rowheadertable/RowheaderTable';
import { TopBar } from './topBar/TopBar';
import { transformData, ApiResponseItem } from '@/utils/control/transformData';
import { columnsList, columnsTableConfig } from '@/utils/control/fc001Utils';

const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;
const controlBaseUrl = import.meta.env.VITE_CONTROL_BASE_URL;

export interface ApiResponse {
  status: number;
  result: ApiResponseItem[] | any[];
  resultMsg?: string;
}

export interface RowTableData {
  targetId: string; // targetId를 사용하므로 string으로 타입 지정
  [key: string]: any; // 그 외 동적 키에 대해서는 any로 지정
}

// 1) 작업대상재 목록(List) 조회
async function getTable(processCode: string): Promise<any[]> {
  const url = `${controlApiUrl}${controlBaseUrl}/target-materials/normal-by-curr-proc?currProc=${processCode}`;
  try {
    const response = await axios.get<ApiResponse>(url);
    if (response.data.status === 200) {
      console.log(response.data.result);
      return transformData(response.data.result);
    } else {
      console.log('Error: ', response.data.resultMsg);
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

// 2) 작업대상재 표(table) 조회
async function getRowTable(): Promise<any[]> {
  const url = `${controlApiUrl}${controlBaseUrl}/target-materials/nextProcTable`;
  try {
    const response = await axios.get<ApiResponse>(url);
    if (response.data.status == 200) {
      console.log(response.data.result);
      return response.data.result;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const Fc001: React.FC = () => {
  const label = ['리스트', '표']; // Tab
  // 조회
  const [isValue, setIsValue] = useState(true); // 기본값을 true로 설정(첫페이지)
  const [dataList, setDataList] = useState<any[]>([]); // API로부터 받을 데이터 상태

  const [rowTableColumns, setRowTableColumns] = useState(
    columnsTableConfig['default'],
  );
  const [rowTableData, setRowTableData] = useState<any[]>([]);

  // 필터링
  const [selectedProcessCode, setSelectedProcessCode] =
    useState<string>('1PCM'); // 선택된 공정

  // 검색 결과 처리
  const handleSearchResults = (searchResults: any[]) => {
    setDataList(searchResults); // 검색 결과로 dataList 업데이트
  };

  // Select Tab
  const changeTab = () => {
    setIsValue(!isValue);
  };

  // Select DropBox
  const handleDropdownChange = (processCode: string) => {
    console.log('Selected Process Code:', processCode);
    setSelectedProcessCode(processCode); // 공정 변경

    setRowTableColumns(
      // 공정에 따라 컬럼 수정
      columnsTableConfig[processCode] || columnsTableConfig['default'],
    );
  };

  // 1) 작업대상재 목록 조회
  useEffect(() => {
    const fetchListData = async () => {
      const data = await getTable(selectedProcessCode);
      setDataList(data); // 가져온 데이터를 상태에 저장
    };
    fetchListData();
  }, [selectedProcessCode]);

  // 2) 작업대상재 표 조회
  useEffect(() => {
    if (!isValue) {
      const fetchData = async () => {
        const data = await getRowTable(); // API 요청
        setRowTableData(data);
        console.log('표 불러오기');
        console.log(data);
      };
      fetchData();
    }
  }, [selectedProcessCode, isValue]); // isValue가 변경될 때마다 실행

  return (
    <div className={styles.boardContainer}>
      <h1>공정별 작업대상재 관리</h1>
      <TopBar
        onProcessChange={handleDropdownChange}
        onSearch={handleSearchResults}
      />
      <div className={styles.tab}>
        <Tab labels={label} onChange={changeTab} />
      </div>
      <div className={styles.tableContainer}>
        {isValue ? (
          <div className={styles.table}>
            <Table
              columns={columnsList}
              data={dataList.map((item) => ({ ...item, key: item.targetId }))}
              scroll={{ x: 'max-content', y: 500 }}
            />
          </div>
        ) : (
          <div className={styles.customTable}>
            <RowheaderTable
              columns={rowTableColumns}
              data={rowTableData.map((item, index) => ({
                ...item,
                key: item.targetId || index,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Fc001;
