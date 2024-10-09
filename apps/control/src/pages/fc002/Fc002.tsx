import { Table } from '@postcoil/ui';
import { Table as AntTable } from 'antd';
import { Client } from '@stomp/stompjs';
import { Button, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { TopBar } from './topBar/TopBar';
import Barchart from './chart/Barchart';

import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import SockJS from 'sockjs-client';

import styles from './Fc002.module.scss';
import {
  facilityErrColumn,
  columnMapping,
} from '@/config/management/errMConfig';

import CommonModal from '@/components/common/CommonModal';
import { columnsData } from '@/utils/control/fc002Utils';
import { transformData, ApiResponseItem } from '@/utils/control/transformData';
import { calculateFrequency } from './CalculateFrequencies';

// URL
const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;
const controlBaseUrl = import.meta.env.VITE_CONTROL_BASE_URL;
const modelApiUrl = import.meta.env.VITE_MODEL_API_URL;

type NotificationPlacement = NotificationArgsProps['placement'];

const Context = React.createContext({ name: 'Default' });

type NotificationPlacement = NotificationArgsProps['placement'];

const Context = React.createContext({ name: 'Default' });

// Interface
export interface ApiResponse {
  status: number;
  result: ApiResponseItem[];
  resultMsg?: string;
}

/**
 * API 요청
 */
// 1. 에러재 목록 조회
async function getErrorMaterialData(processCode: string): Promise<any[]> {
  const url = `${controlApiUrl}${controlBaseUrl}/error-materials/error-by-curr-proc?currProc=${processCode}`;
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
  const url = `${controlApiUrl}${controlBaseUrl}/error-materials/errorpass`;
  try {
    const response = await axios.put(url, data);
    console.log(response.data.result);
    return response.data;
  } catch (error) {
    console.error('PUT 요청 중 오류 발생:', error);
    return [];
  }
}

// 3. 에러패스 추천
async function getErrorPassRecommend(data: any) {
  const url = `${modelApiUrl}/errorpass/recomend`;
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status == 200) {
      console.log(response.data.result);
      return response.data.result;
    }
  } catch (error) {
    console.error('POST 요청 중 오류 발생:', error);
    return [];
  }
}

// 4. 에러 기준
async function getErrorStandard(facility: string) {
  try {
    const response = await axios.get(
      `${controlApiUrl}/api/v1/management/error/${facility}`,
    );
    return response.data.criteriaDetails;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}

export const Fc002: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `${message.currProc} 의 ${message.materialNo} 에`,
      description: (
        <Context.Consumer>{() => '비고가 생성되었습니다'}</Context.Consumer>
      ),
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
  /**
   *  State 관리
   */
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRecommendModalOpen, setIsRecommendModalOpen] = React.useState(false);
  const [errorMaterials, setErrorMaterials] = useState<any[]>([]); // 에러재
  const [errorPassMaterials, setErrorPassMaterials] = useState<any[]>([]); // 에러패스 추천재
  const [selectedProcessCode, setSelectedProcessCode] =
    useState<string>('1PCM');
  const [selectedRows, setSelectedRows] = useState<any[]>([]); // Checked Rows
  const [client, setClient] = useState<Client | null>(null);
  const [message, setMessage] = useState<any>({});
  const [standardDatas, setStandardDatas] = useState<any[]>([]);
  const [selectedFacility, setSelectedFacility] = useState('1PCM'); // 기본 시설 ID

  const [coilTypeFrequency, setCoilTypeFrequency] = useState({});
  const [customerNameFrequency, setCustomerNameFrequency] = useState({});
  const [coilTypeOption, setCoilTypeOption] = useState<echarts.EChartsOption>(
    {},
  );
  const [customerNameOption, setCustomerNameOption] =
    useState<echarts.EChartsOption>({});

  // 검색 결과 처리
  const handleSearchResults = (searchResults: any[]) => {
    setErrorMaterials(searchResults); // 검색 결과로 dataList 업데이트
  };

  // Modal
  // 1) 에러패스 적용 확인

  const handleModalOpen = () => setIsModalOpen(true);
  const handleOk = async () => {
    if (selectedRows.length > 0) {
      const materialIdsSelected = selectedRows.map((r, _) => r.targetId);
      // const selectedMaterialIds = errorMaterials.filter((row) => materialIdsSelected.includes(row.materialId));
      // console.log('Filtering ... ');
      // console.log(materialIdsSelected); // 선택된 materialId
      // console.log(selectedMaterialIds); // 필터링 된 rows

      await updateIsError(materialIdsSelected); // Error Pass API 요청
      const data = await getErrorMaterialData(selectedProcessCode); // 리랜더링
      setErrorMaterials(data);
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => setIsModalOpen(false);

  // 2) 에러패스 추천
  const handleRecommendModalOpen = async () => {
    // setIsRecommendModalOpen(true); // To do: API 연결하고 제거

    // API 요청
    console.log('에러패스 대상: ' + JSON.stringify(errorMaterials, null, 1));
    const data = await getErrorPassRecommend(
      JSON.stringify(errorMaterials, null, 1),
    );

    // 그래프 준비물~
    const coilTypeFreq = calculateFrequency(data, 'coilTypeCode'); // 'coilTypeCode'를 key로 사용
    const customerNameFreq = calculateFrequency(data, 'customerName'); // 'customerName'을 key로 사용

    console.log('=======================');
    console.log(coilTypeFreq);
    console.log(customerNameFreq);
    setCoilTypeFrequency(coilTypeFreq);
    setCustomerNameFrequency(customerNameFreq);

    setErrorPassMaterials(data); // 에러패스 추천 재료 세팅
    if (data.length > 0) {
      setErrorPassMaterials(data);
      setIsRecommendModalOpen(true); // API 요청 후, 모달 창 열기
    } else {
      console.error('추천 데이터가 없습니다. ');
    }
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

  /**
   * Effect
   */
  // 에러재 목록 조회
  useEffect(() => {
    const fetchData = async () => {
      const data = await getErrorMaterialData(selectedProcessCode);
      console.log('useEffect Data : ' + JSON.stringify(data));
      setErrorMaterials(data);
    };
    fetchData();
  }, [selectedProcessCode]);

  // DropBox
  const handleDropdownChange = (processCode: string) => {
    setSelectedProcessCode(processCode);
  };

  useEffect(() => {
    const socket = new SockJS(controlApiUrl + '/ws/control');
    const stompClient = new Client({
      webSocketFactory: () => socket as any,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('연결되었습니다');
        stompClient.subscribe('/topic/errorMessage', (msg) => {
          const paredMessage = JSON.parse(msg.body);
          console.log('paredMessage : ' + JSON.stringify(paredMessage));
          setMessage(paredMessage);
          setErrorMaterials((prevErrorMaterials) =>
            prevErrorMaterials.map((item) =>
              item.materialNo === paredMessage.materialNo
                ? { ...item, remarks: paredMessage.comment } // 조건이 맞으면 새로운 객체 반환
                : item,
            ),
          );
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      onStompError: (error) => {
        console.error('STOMP error: ', error);
      },
    });
    stompClient.activate();
    setClient(stompClient);
    console.log(client);
    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, []);

  useEffect(() => openNotification('topRight'), [message]);

  // 에러기준
  useEffect(() => {
    const fetchData = async () => {
      const data = await getErrorStandard(selectedFacility);
      const transformedData = data.map((item: any, index: number) => ({
        key: (index + 1).toString(),
        columnName: columnMapping[item.columnName],
        value: item.columnValue ?? '미지정', // null일 경우 '미지정'으로 처리
        mapperId: item.id,
      }));
      setStandardDatas(transformedData);
    };

    fetchData();
  }, [selectedFacility]); // selectedFacility가 변경될 때마다 데이터 가져오기

  useEffect(() => {
    // Coil Type 차트 설정
    setCoilTypeOption({
      // title: {
      //   // text: '품종',
      // },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: Object.keys(coilTypeFrequency),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Frequency',
          type: 'bar',
          data: Object.values(coilTypeFrequency),
        },
      ],
    });

    // Customer Name 차트 설정
    setCustomerNameOption({
      // title: {
      //   text: 'Customer Name Frequency',
      // },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: Object.keys(customerNameFrequency),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Frequency',
          type: 'bar',
          data: Object.values(customerNameFrequency),
        },
      ],
    });
  }, [coilTypeFrequency, customerNameFrequency]); // 주의: 종속성 배열에 추가해야 함

  return (
    <div className={styles.boardContainer}>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <Space></Space>
      </Context.Provider>
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
            data={errorMaterials.map((item: any) => ({
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
        title={
          <span style={{ fontSize: '1.3em', fontWeight: 'bold' }}>
            에러패스 추천 재료
          </span>
        }
        isModalOpen={isRecommendModalOpen}
        onCancel={() => setIsRecommendModalOpen(false)} // 추천 모달 닫기
        onApply={handleRecommendModalOk} // '사용' 버튼을 눌렀을 때 실행
        isButtonNeeded={false}
        width={1500}>
        <div className={styles.table} style={{ margin: '20px 0' }}>
          <Table
            useCheckBox={true}
            columns={columnsData}
            data={errorPassMaterials.map((item: any) => ({
              ...item,
              key: item.targetId,
            }))}
            scroll={{ x: 'max-content', y: 250 }}
            tableLayout={'fixed'}
            handleRowsClick={setSelectedRows}
            setSelectedMaterials={setSelectedMaterials}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              width: '400px',
              height: '200px',
              flex: 1,
              marginRight: '10px',
            }}>
            <h6>재료 정보</h6>
            <div className={styles.group}>
              <div
                className={styles.smallCard}
                style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Barchart title="품종" option={coilTypeOption} />
                {/* </div>
              <div className={styles.smallCard}> */}
                <Barchart title="고객사" option={customerNameOption} />
              </div>
            </div>
          </div>
          <div
            style={{
              width: '400px',
              height: '100px',
              flex: 1,
              marginRight: '10px',
            }}>
            <h6>에러 기준</h6>
            <AntTable
              columns={facilityErrColumn}
              dataSource={standardDatas.slice(0, 4)}
              size={'small'}
              tableLayout={'fixed'}
              pagination={false}
              style={{ padding: '10px' }}
            />
          </div>
        </div>
        <p
          style={{
            fontSize: '1.8rem',
            textAlign: 'center',
            marginTop: '50px',
          }}>
          추천 재료를 사용하시겠습니까?
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            margin: '20px',
          }}>
          <Button
            type="primary"
            style={{ borderRadius: '5px', padding: '10px 20px' }}
            onClick={handleRecommendModalOk}>
            사용
          </Button>
          <Button
            type="default"
            style={{
              marginLeft: '5px',
              borderRadius: '5px',
              padding: '10px 20px',
            }}
            onClick={() => setIsRecommendModalOpen(false)}>
            미사용
          </Button>
        </div>
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
