import { Tab, Table } from '@postcoil/ui';
import { Button } from 'antd';
import React from 'react';

import styles from './Fc002.module.scss';
import { TopBar } from './topBar/TopBar';

import CommonModal from '@/components/common/CommonModal';

// Table 임의 데이터
const columnsData = [
  {
    title: 'no',
    dataIndex: 'no',
    sorter: {
      compare: (a: any, b: any) => a.no - b.no,
      multiple: 3,
    },
  },
  {
    title: '코일 ID',
    dataIndex: 'id',
    sorter: {
      compare: (a: any, b: any) => a.id.localeCompare(b.id),
      multiple: 2,
    },
  },
  {
    title: '두께',
    dataIndex: 'length',
    sorter: {
      compare: (a: any, b: any) => a.length - b.length,
      multiple: 1,
    },
  },
  {
    title: '폭',
    dataIndex: 'width',
    sorter: {
      compare: (a: any, b: any) => a.width - b.width,
      multiple: 0,
    },
  },
];

const tableData = [
  {
    key: '1',
    no: '1',
    id: 'A001',
    length: 60,
    width: 70,
  },
  {
    key: '2',
    no: '2',
    id: 'A002',
    length: 66,
    width: 89,
  },
  {
    key: '3',
    no: '3',
    id: 'A003',
    length: 90,
    width: 70,
  },
];

export const Fc002: React.FC = () => {
  const label = ['에러재', '정상재'];
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.boardContainer}>
      <h1>공정별 에러재 관리</h1>
      <TopBar />
      <div className={styles.tab}>
        <Tab labels={label} />
      </div>
      <div className={styles.result}>
        <div className={styles.table}>
          <Table useCheckBox={true} columns={columnsData} data={tableData} />
        </div>
      </div>
      <Button type="primary" className={styles.btn} onClick={handleModalOpen}>
        에러패스
      </Button>
      <CommonModal
        title="에러패스 적용 여부"
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
