import { Table, ConfigProvider } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from './ErrMPage.module.scss';
import Result from './Result';

import {
  facilitycolumn,
  facilityData,
  facilityErrColumn,
  ManageColumn,
  infoErrColumn,
  columnMapping,
} from '@/config/management/errMConfig';
import { url } from '@/config/UrlConfig';

async function getErrorStandard(facility: string) {
  try {
    const response = await axios.get(
      url + '/api/v1/management/error/' + facility,
    );
    return response.data.criteriaDetails;
  } catch (error) {
    console.log(error);
  }
}

const ErrMPage: React.FC = () => {
  useEffect(() => {
    const initialData = async () => {
      try {
        const fetchData = await getErrorStandard('1PCM');
        console.log('Fetched Data:', fetchData); // 실제 데이터를 로그로 확인
        transformedData(fetchData); // 데이터를 변환
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    initialData(); // async 함수 호출
  }, []);

  //antd 테이블에 들어가게 변환
  function transformedData(fetchData: any) {
    const standardData = fetchData.map((item: any, index: any) => ({
      key: (index + 1).toString(),
      id: (index + 1).toString(),
      columnName: columnMapping[item.columnName],
      value: item.columnValue != null ? item.columnValue : '미지정',
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
    const fetchData = await getErrorStandard(index.facilityId);
    transformedData(fetchData);
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
              // 인수에 rowIndex를 넣어서, 표 기준 index를 가져올 수 있음
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
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
                dataSource={standardDatas.slice(0, 4)}
                size={'small'}
                tableLayout={'fixed'}
                pagination={false}
              />
            </div>
            <Result
              title="설비사양 에러"
              data={standardDatas.slice(0, 4)}
              fullData={standardDatas}
              facility={selectedRowIndex.facilityId}
              setPostedData={setPostedData}
            />
          </div>
          <div>
            <div className={styles.table}>
              <Table
                columns={ManageColumn}
                dataSource={standardDatas.slice(4, 5)}
                size={'small'}
                tableLayout={'fixed'}
                pagination={false}
              />
            </div>
            <Result
              title="관리재"
              data={standardDatas.slice(4, 5)}
              fullData={standardDatas}
              facility={selectedRowIndex.facilityId}
              setPostedData={setPostedData}
            />
          </div>
          <div>
            <div className={styles.table}>
              <Table
                columns={infoErrColumn}
                dataSource={standardDatas.slice(5)}
                size={'small'}
                pagination={false}
              />
            </div>
            <Result
              title="정보이상재"
              data={standardDatas.slice(5)}
              fullData={standardDatas}
              facility={selectedRowIndex.facilityId}
              setPostedData={setPostedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrMPage;
