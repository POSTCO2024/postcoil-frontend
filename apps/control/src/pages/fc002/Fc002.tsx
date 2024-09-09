import axios from 'axios';

import { Table } from '@postcoil/ui';
import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './Fc002.module.scss';
import { TopBar } from './topBar/TopBar';

import CommonModal from '@/components/common/CommonModal';
import { columnsData, tableData } from '@/config/control/Fc002Utils';
import { List } from 'echarts';

export const Fc002: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
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

  return (
    <div className={styles.boardContainer}>
      <h1>공정별 에러재 관리</h1>
      <TopBar />
      <div className={styles.result}>
        <div className={styles.table}>
          <Table
            useCheckBox={true}
            columns={columnsData}
            data={tableData}
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
