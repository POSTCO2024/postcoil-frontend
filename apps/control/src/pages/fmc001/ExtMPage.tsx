import { Table, ConfigProvider } from 'antd';
import { useState } from 'react';

import styles from './ExtMPage.module.scss';
import Result from './extraction/Result';

import {
  columnData,
  columnsData,
  facilityData,
  standardData,
} from '@/config/management/ExtMConfig';

// // TODO: fetch data from API
// const extractions: DataType = {
//   공장코드: 100,
//   공정코드: 'CAL',
//   재료진행상태: '2',
//   재료진도: 'D',
// };

// // <에러기준>을 화면에 넣는다면 넣는 데이터 형식
// // const outlierCriteria: DataType = {
// //   width: '1',\
// //   thickness: '1',
// // };

// // TODO: fetch data 후 props로 넣기
// // interface PropsType {
// //   priorities: DataType;
// //   constraints: DataType;
// // }
// // { extractions, errorCriteria }: PropsType

const ExtMPage = () => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(facilityData[0]);
  const setClassName = (record: any, index: any) => {
    // console.log(
    //   JSON.stringify(record) + index + JSON.stringify(selectedRowIndex),
    // );
    const result = record === selectedRowIndex ? `${styles.selected_row}` : '';
    return result;
  };

  const handleRowClick = (index: any, rowIndex: any) => {
    setSelectedRowIndex(index);
    // console.log(
    //   '선택된 행의 index' +
    //     JSON.stringify(selectedRowIndex) +
    //     '    ' +
    //     rowIndex,
    // );
  };
  return (
    <div className={styles.page}>
      <h1>작업대상재 기준 관리</h1>
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
              columns={columnData}
              dataSource={facilityData}
              pagination={false}
              onRow={(record, rowIndex) => ({
                onClick: () => handleRowClick(record, rowIndex),
              })}
              rowClassName={setClassName}
            />
          </ConfigProvider>
          {/* <Result title="에러기준" data={outlierCriteria} /> */}
        </div>

        <div className={styles.facilityStandard}>
          <Table
            columns={columnsData}
            dataSource={standardData}
            tableLayout="fixed"
            pagination={false}
          />
          <Result title="추출기준 관리" data={standardData} />
        </div>
      </div>
    </div>
  );
};

export default ExtMPage;
