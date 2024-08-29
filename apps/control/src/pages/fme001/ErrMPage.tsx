import { Table, ConfigProvider } from 'antd';
import { useState } from 'react';

import styles from './ErrMPage.module.scss';
import Result from './Result';

import {
  facilitycolumn,
  facilityData,
  facilityErrColumn,
  facilityErrData,
  ManageColumn,
  infoErrColumn,
  infoErrData,
  managementData,
} from '@/config/management/ErrMConfig';

const ErrMPage: React.FC = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(facilityData[0]);
  const setClassName = (record: any, index: any) => {
    // console.log(
    //   JSON.stringify(record) + index + JSON.stringify(selectedRowIndex),
    // );
    const result =
      record === selectedRowIndex
        ? `${styles.antTable} ${styles.selected_row}`
        : `${styles.antTable}`;
    return result;
  };

  const handleRowClick = (index: any, rowIndex: any) => {
    setSelectedRowIndex(index);
  };
  return (
    <div className={styles.page}>
      <h1>에러기준 관리</h1>
      <div className={styles.frame}>
        <div className={styles.facility}>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  rowHoverBg: '#eff4ff',
                },
              },
            }}>
            <Table
              columns={facilitycolumn}
              dataSource={facilityData}
              pagination={false}
              onRow={(record, rowIndex) => ({
                onClick: () => handleRowClick(record, rowIndex),
              })}
              rowClassName={setClassName}
            />
          </ConfigProvider>
        </div>
        <div className={styles.tablesFrame}>
          <div>
            <div className={styles.table}>
              <Table
                columns={facilityErrColumn}
                dataSource={facilityErrData}
                size={'small'}
                tableLayout={'fixed'}
                pagination={false}
              />
            </div>
            <Result title="설비사양 에러" data={facilityErrData} />
          </div>
          <div>
            <div className={styles.table}>
              <Table
                columns={ManageColumn}
                dataSource={managementData}
                size={'small'}
                tableLayout={'fixed'}
                pagination={false}
              />
            </div>
            <Result title="관리재" data={managementData} />
          </div>
          <div>
            <div className={styles.table}>
              <Table
                columns={infoErrColumn}
                dataSource={infoErrData}
                size={'small'}
                pagination={false}
              />
            </div>
            <Result title="정보이상재" data={infoErrData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrMPage;
