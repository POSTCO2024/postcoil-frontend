import { Table } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

import styles from './ErrMPage.module.scss';
import useStandardStore from './ErrStore';
import ExtResult from './ExtResult';
import FilterContainer from './FilterContainer';
import Result from './Result';

import {
  errFacilityErrColumn,
  ManageColumn,
  infoErrColumn,
  errColumnMapping,
} from '@/config/management/errMConfig';
import { columnsData, columnMapping } from '@/config/management/extMConfig';

const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;

const ErrMPage: React.FC = () => {
  const { manageData } = useStandardStore();

  async function getErrorStandard(facility: string) {
    try {
      const response = await axios.get(
        controlApiUrl + '/api/v1/management/error/' + facility,
      );
      transformedErrData(response.data.criteriaDetails);
      // return response.data.criteriaDetails;
    } catch (error) {
      console.log(error);
    }
  }

  async function getExtraction(facility: string) {
    try {
      const response = await axios.get(
        controlApiUrl + '/api/v1/management/extraction/' + facility,
      );
      transformedExtData(response.data.criteriaDetails);
      // return response.data.criteriaDetails;
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   const initialExtData = async () => {
  //     try {
  //       const fetchData = await getExtraction('1PCM');
  //       console.log('Fetched Data:', fetchData); // 실제 데이터를 로그로 확인
  //       transformedExtData(fetchData); // 데이터를 변환
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   initialExtData(); // async 함수 호출
  // }, []);

  //antd 테이블에 들어가게 변환
  function transformedErrData(fetchData: any) {
    const standardData = fetchData.map((item: any, index: any) => ({
      key: (index + 1).toString(),
      id: (index + 1).toString(),
      columnName: errColumnMapping[item.columnName],
      value: item.columnValue != null ? item.columnValue : '-',
      mapperId: item.id,
    }));
    console.log('standardData   ' + JSON.stringify(standardData));
    setStandardErrDatas(standardData);
  }

  function transformedExtData(fetchData: any) {
    console.log(fetchData);
    const standardData = fetchData.map((item: any, index: any) => ({
      key: (index + 1).toString(),
      id: (index + 1).toString(),
      columnName: columnMapping[item.columnName],
      value: item.columnValue,
      mapperId: item.id,
    }));
    console.log('standardData   ' + JSON.stringify(standardData));
    setStandardExtDatas(standardData);
  }

  const setPostedErrData = (newData: any) => {
    setStandardErrDatas(newData);
  };

  const setPostedExtData = (newData: any) => {
    setStandardExtDatas(newData);
  };

  const handleFilter = (progress: string) => {
    setProgress(progress);
  };

  // const [selectedRowIndex, setSelectedRowIndex] = useState(errFacilityData[0]);
  const [standardErrDatas, setStandardErrDatas] = useState([]);
  const [standardExtDatas, setStandardExtDatas] = useState([]);
  const [progress, setProgress] = useState('1PCM');

  useEffect(() => {
    // const initialErrData = async () => {
    //   try {
    //     const fetchData = await getErrorStandard('1PCM');
    //     console.log('Fetched Data:', fetchData); // 실제 데이터를 로그로 확인
    //     transformedErrData(fetchData); // 데이터를 변환
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    // initialErrData(); // async 함수 호출
    getErrorStandard(progress);
    getExtraction(progress);
  }, [progress]);

  return (
    <div className={styles.page}>
      <h1>추출, 에러기준 관리</h1>
      <FilterContainer progress={progress} handleFilter={handleFilter} />
      <div className={styles.frame}>
        <div className={styles.tablesFrame}>
          <div>
            <div className={styles.table}>
              <Table
                columns={columnsData}
                dataSource={standardExtDatas}
                tableLayout="fixed"
                size={'small'}
                pagination={false}
              />
            </div>
            <ExtResult
              title="추출기준 관리"
              data={standardExtDatas}
              facility={progress}
              setPostedData={setPostedExtData}
            />
          </div>
          <div>
            <div className={styles.table}>
              <Table
                columns={ManageColumn}
                dataSource={[
                  ...standardErrDatas.slice(4, 5),
                  ...manageData[progress],
                ]}
                size={'small'}
                tableLayout={'fixed'}
                pagination={false}
              />
            </div>
            <Result
              title="관리재"
              data={[...standardErrDatas.slice(4, 5), ...manageData[progress]]}
              fullData={standardErrDatas}
              facility={progress}
              setPostedData={setPostedErrData}
            />
          </div>
        </div>
        {/* <div className={styles.facility}>
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
        </div> */}
        <div className={styles.tablesFrame}>
          <div>
            <div className={styles.table}>
              <Table
                columns={errFacilityErrColumn}
                dataSource={standardErrDatas.slice(0, 4)}
                size={'small'}
                tableLayout={'fixed'}
                pagination={false}
              />
            </div>
            <Result
              title="설비사양 에러"
              data={standardErrDatas.slice(0, 4)}
              fullData={standardErrDatas}
              facility={progress}
              setPostedData={setPostedErrData}
            />
          </div>
          <div>
            <div className={styles.table}>
              <Table
                columns={infoErrColumn}
                dataSource={standardErrDatas.slice(5)}
                size={'small'}
                pagination={false}
              />
            </div>
            <Result
              title="정보이상재"
              data={standardErrDatas.slice(5)}
              fullData={standardErrDatas}
              facility={progress}
              setPostedData={setPostedErrData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrMPage;
