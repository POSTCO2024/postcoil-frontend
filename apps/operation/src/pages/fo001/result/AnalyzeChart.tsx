import { RedoOutlined } from '@ant-design/icons';
import { Table } from '@postcoil/ui';
import { ConfigProvider } from 'antd';

import styles from './AnalyzeChart.module.scss';

const column = [
  { title: '품종별', dataIndex: 'type' },
  { title: '개수', dataIndex: 'count' },
];
const data = [
  { key: '1', id: '1', type: 'AA', count: '5' },
  { key: '2', id: '2', type: 'BB', count: '10' },
  { key: '3', id: '3', type: 'CC', count: '3' },
  { key: '4', id: '4', type: 'DD', count: '4' },
];

export const AnalyzeChart = () => {
  return (
    <div className={styles.chart}>
      <h1>편성 코일 분석</h1>
      <div
        style={{
          height: '100%',
          borderRadius: '20px',
          backgroundColor: '#f9f9f9',
        }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: '20px',
          }}>
          <div style={{ flex: 2 }}>
            <div style={{ height: '50%' }}>
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                }}>
                <div
                  style={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      width: '90%',
                      height: '80%',
                      textAlign: 'center',
                      alignContent: 'center',
                      borderRadius: '20px',
                      boxShadow: '2px 2px 12px -9px blue',
                      backgroundColor: '#ffffff',
                    }}>
                    <div style={{ fontWeight: 800 }}>현재상황</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      <RedoOutlined spin style={{ color: '#1677ff' }} />{' '}
                      &nbsp;작업중
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      width: '90%',
                      height: '80%',
                      textAlign: 'center',
                      alignContent: 'center',
                      borderRadius: '20px',
                      boxShadow: '2px 2px 12px -9px blue',
                      //   boxShadow: '2px 2px 12px -7px blue',
                      backgroundColor: '#ffffff',
                    }}>
                    <div style={{ fontWeight: 800 }}>
                      보급 현황 / 전체 코일 수
                    </div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      10 / 30 (개)
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                }}>
                <div
                  style={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      width: '90%',
                      height: '80%',
                      textAlign: 'center',
                      alignContent: 'center',
                      borderRadius: '20px',
                      boxShadow: '2px 2px 12px -9px blue',
                      //   boxShadow: '2px 2px 12px -7px blue',
                      backgroundColor: '#ffffff',
                    }}>
                    <div style={{ fontWeight: 800 }}>작업소요 시간</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      18 : 56 : 16
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <div
                    style={{
                      width: '90%',
                      height: '80%',
                      textAlign: 'center',
                      alignContent: 'center',
                      borderRadius: '20px',
                      boxShadow: '2px 2px 12px -9px blue',
                      //   boxShadow: '2px 2px 12px -7px blue',
                      backgroundColor: '#ffffff',
                    }}>
                    <div style={{ fontWeight: 800 }}>Reject 된 코일 수</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      1 개
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: '50%' }}></div>
          </div>
          <div
            style={{
              flex: 1,

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <div
              style={{
                width: '90%',
                margin: 'auto',
                boxShadow: '2px 2px 12px -9px blue',
              }}>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      cellPaddingBlockSM: 8,
                      cellFontSizeSM: 18,
                    },
                  },
                }}>
                <Table columns={column} data={data} size="small" />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeChart;
