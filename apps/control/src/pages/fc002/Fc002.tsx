import { Table } from '@postcoil/ui';
import { Button } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import styles from './Fc002.module.scss';
import { TopBar } from './topBar/TopBar';
import { transformData, ApiResponseItem } from '@/utils/control/transformData';

import CommonModal from '@/components/common/CommonModal';
import { columnsData } from '@/config/control/Fc002Utils';

// API
export interface ApiResponse {
  status: number;
  result: ApiResponseItem[];
  resultMsg?: string;
}

// 1. 에러재 목록 조회
async function getErrorMaterialData(processCode: string): Promise<any[]> {
  const url = `http://localhost:8086/api/v1/error-materials/error-by-curr-proc?currProc=${processCode}`;
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

// 2. 에러패스
async function updateIsError(data: React.Key[]) {
  const url = `http://localhost:8086/control/errorpass`;
  try {
    const response = await axios.put(url, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('PUT 요청 중 오류 발생:', error);
    return [];
  }
}

export const Fc002: React.FC = () => {
  // 조회
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRecommendModalOpen, setIsRecommendModalOpen] = React.useState(false);
  const [dataList, setDataList] = useState<any[]>([]); // API로부터 받을 데이터 상태

  // 필터링
  const [selectedProcessCode, setSelectedProcessCode] =
    useState<string>('1PCM');
  const [selectedRows, setSelectedRows] = useState<any[]>([]); // Checked Rows

  // 검색 결과 처리
  const handleSearchResults = (searchResults: any[]) => {
    setDataList(searchResults); // 검색 결과로 dataList 업데이트
  };

  // Modal
  // 1) 에러패스 적용 확인

  const handleModalOpen = () => setIsModalOpen(true);
  const handleOk = async () => {
    if (selectedRows.length > 0) {
      const materialIdsSelected = selectedRows.map((r, _) => r.targetId);
      // const selectedMaterialIds = dataList.filter((row) => materialIdsSelected.includes(row.materialId));

      console.log('Filtering ... ');
      console.log(materialIdsSelected); // 선택된 materialId
      // console.log(selectedMaterialIds); // 필터링 된 rows

      await updateIsError(materialIdsSelected); // Error Pass API 요청
      const data = await getErrorMaterialData(selectedProcessCode); // 리랜더링
      setDataList(data);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  // 2) 에러패스 추천
  const handleRecommendModalOpen = () => {
    setIsRecommendModalOpen(true);
  };
  const handleRecommendModalOk = async () => {
    // 추천 모달에서 '사용' 버튼을 눌렀을 때 기존 에러패스 확인 모달을 띄움
    setIsRecommendModalOpen(false); // 추천 모달 닫기
    setIsModalOpen(true); // 기존 에러패스 확인 모달 열기
  };

  // Checked Row 상태 변환
  function setSelectedMaterials(selectedRows: any) {
    // console.log('선택된 Materials:', selectedRows);
    setSelectedRows(selectedRows);
  }

  // 에러재 목록 조회
  useEffect(() => {
    const fetchData = async () => {
      const data = await getErrorMaterialData(selectedProcessCode);
      setDataList(data);
    };
    fetchData();
  }, [selectedProcessCode]);

  const handleDropdownChange = (processCode: string) => {
    setSelectedProcessCode(processCode);
  };

  return (
    <div className={styles.boardContainer}>
      <h1>공정별 에러재 관리</h1>
      <TopBar
        onProcessChange={handleDropdownChange}
        onSearch={handleSearchResults}
      />
      <div className={styles.result}>
        <div className={styles.table}>
          <Table
            useCheckBox={true}
            columns={columnsData}
            data={dataList.map((item: any) => ({
              ...item,
              key: item.targetId,
            }))}
            scroll={{ x: 'max-content', y: 600 }}
            tableLayout={'fixed'}
            handleRowsClick={setSelectedRows}
            setSelectedMaterials={setSelectedMaterials}
          />
        </div>
      </div>
      <Button
        type="default"
        className={styles.btn}
        onClick={handleRecommendModalOpen}>
        에러패스 추천
      </Button>
      <CommonModal
        title="에러패스 추천 재료"
        isModalOpen={isRecommendModalOpen}
        onCancel={() => setIsRecommendModalOpen(false)} // 추천 모달 닫기
        onApply={handleRecommendModalOk} // '사용' 버튼을 눌렀을 때 실행
        isButtonNeeded={false}
        width={1200}>
        <div className={styles.table}>
          <Table
            useCheckBox={true}
            columns={columnsData}
            data={dataList.map((item: any) => ({
              ...item,
              key: item.targetId,
            }))}
            scroll={{ x: 'max-content', y: 600 }}
            tableLayout={'fixed'}
            handleRowsClick={setSelectedRows}
            setSelectedMaterials={setSelectedMaterials}
          />
        </div>
        <p
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            marginTop: '10px',
          }}>
          추천 재료를 사용하시겠습니까?
        </p>
        <Button type="primary" onClick={handleRecommendModalOk}>
          사용
        </Button>
        <Button type="default" onClick={() => setIsRecommendModalOpen(false)}>
          미사용
        </Button>
      </CommonModal>

      <Button type="primary" className={styles.btn} onClick={handleModalOpen}>
        에러패스
      </Button>

      <CommonModal
        title="에러패스"
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
        onApply={handleOk}>
        <p
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            marginTop: '10px',
          }}>
          에러패스를 적용하시겠습니까?
        </p>
      </CommonModal>
    </div>
  );
};

export default Fc002;
