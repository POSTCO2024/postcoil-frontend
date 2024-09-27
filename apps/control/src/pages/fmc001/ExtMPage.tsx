import { Table, ConfigProvider } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from './ExtMPage.module.scss';
import Result from './extraction/Result';

import {
  columnData,
  columnsData,
  facilityData,
  columnMapping,
} from '@/config/management/extMConfig';
import { url } from '@/config/UrlConfig';
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
async function getExtraction(facility: string) {
  try {
    const response = await axios.get(
      url + '/api/v1/management/extraction/' + facility,
    );
    return response.data.criteriaDetails;
  } catch (error) {
    console.log(error);
  }
}

const ExtMPage = () => {
  // 처음 페이지 로딩시 기본값 1PCM
  useEffect(() => {
    const initialData = async () => {
      try {
        const fetchData = await getExtraction('1PCM');
        console.log('Fetched Data:', fetchData); // 실제 데이터를 로그로 확인
        transformedData(fetchData); // 데이터를 변환
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    initialData(); // async 함수 호출
  }, []);

  // DTO를 첫번째 테이블에 맞게 데이터 변환
  function transformedData(fetchData: any) {
    console.log(fetchData);
    const standardData = fetchData.map((item: any, index: any) => ({
      key: (index + 1).toString(),
      id: (index + 1).toString(),
      columnName: columnMapping[item.columnName],
      value: item.columnValue,
      mapperId: item.id,
    }));
    console.log('standardData   ' + JSON.stringify(standardData));
    setStandardDatas(standardData);
  }

  const setPostedData = (newData: any) => {
    setStandardDatas(newData);
  };
  const [selectedRowIndex, setSelectedRowIndex] = useState(facilityData[0]);
  const [standardDatas, setStandardDatas] = useState([]);
  const setClassName = (record: any) => {
    // console.log(
    //   JSON.stringify(record) + index + JSON.stringify(selectedRowIndex),
    // );
    const result =
      record === selectedRowIndex
        ? `${styles.antTable} ${styles.selected_row}`
        : `${styles.antTable}`;
    return result;
  };

  const handleRowClick = async (index: any) => {
    setSelectedRowIndex(index);
    const fetchData = await getExtraction(index.facilityId);
    transformedData(fetchData);
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
              // 인수에 rowIndex를 넣어서, 표 기준 index를 가져올 수 있음
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
              rowClassName={setClassName}
            />
          </ConfigProvider>
          {/* <Result title="에러기준" data={outlierCriteria} /> */}
        </div>

        <div className={styles.facilityStandard}>
          <div className={styles.modifyTable}>
            <Table
              columns={columnsData}
              dataSource={standardDatas}
              tableLayout="fixed"
              pagination={false}
            />
          </div>
          <Result
            title="추출기준 관리"
            data={standardDatas}
            facility={selectedRowIndex.facilityId}
            setPostedData={setPostedData}
          />
        </div>
      </div>
    </div>
  );
};

export default ExtMPage;
