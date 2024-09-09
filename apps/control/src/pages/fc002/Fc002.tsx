import axios from 'axios';

import { Table } from '@postcoil/ui';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';

import styles from './Fc002.module.scss';
import { TopBar } from './topBar/TopBar';

import CommonModal from '@/components/common/CommonModal';
import { columnsData } from '@/config/control/Fc002Utils';

async function getErrorMaterialData(processCode: string) {
  const url = `http://localhost:8086/control/error/${processCode}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
import { List } from 'echarts';

export const Fc002: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dataList, setDataList] = useState<any[]>([]); // API로부터 받을 데이터 상태
  const [selectedProcessCode, setSelectedProcessCode] =
    useState<string>('1PCM'); //

  const [selectedRows, setSelectedRows] = useState<React.Key[]>([]); //
  console.log(selectedRows);
  const handleModalOpen = () => setIsModalOpen(true);
  // const handleOk = async () => {
  //   if (selectedRows.length > 0) {
  //     await updateIsError(selectedRows);
  //   }
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => setIsModalOpen(false);

  function setSelectedMaterials(selectedRows: any) {
    setSelectedRows(selectedRows);
  }

  // 에러패스
  async function updateIsError(data: List) {
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
      <TopBar onProcessChange={handleDropdownChange} />
      <div className={styles.result}>
        <div className={styles.table}>
          <Table
            useCheckBox={true}
            columns={columnsData}
            data={dataList.map((item: any) => ({ ...item, key: item.id }))}
            scroll={{ x: 'max-content', y: 600 }}
            tableLayout={'fixed'}
            handleRowsClick={setSelectedRows}
            setSelectedMaterials={setSelectedMaterials}
          />
        </div>
      </div>
      <Button type="primary" className={styles.btn} onClick={handleModalOpen}>
        에러패스
      </Button>

      <CommonModal
        title="에러패스"
        isModalOpen={isModalOpen}
        onCancel={handleCancel}
      // onApply={handleOk}
      >
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
