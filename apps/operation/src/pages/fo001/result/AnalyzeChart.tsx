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
      <div className={styles.analyze_background}>
        <div className={styles.analyze_frame}>
          <div style={{ flex: 2 }}>
            <div style={{ height: '50%' }}>
              <div className={styles.item_flex}>
                <div className={styles.item_frame}>
                  <div className={styles.item_style}>
                    <div style={{ fontWeight: 800 }}>현재상황</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      <RedoOutlined spin style={{ color: '#1677ff' }} />
                      &ensp;작업중
                    </div>
                  </div>
                </div>
                <div className={styles.item_frame}>
                  <div className={styles.item_style}>
                    <div style={{ fontWeight: 800 }}>
                      보급 현황 / 전체 코일 수
                    </div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      10 / 30 (개)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ height: '50%' }}>
              <div className={styles.item_flex}>
                <div className={styles.item_frame}>
                  <div className={styles.item_style}>
                    <div style={{ fontWeight: 800 }}>작업소요 시간</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      18 : 56 : 16
                    </div>
                  </div>
                </div>
                <div className={styles.item_frame}>
                  <div className={styles.item_style}>
                    <div style={{ fontWeight: 800 }}>Reject 된 코일 수</div>
                    <div style={{ fontSize: '1.4em', fontWeight: 700 }}>
                      1 개
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.type_chart_flex}>
            <div className={styles.type_chart_frame}>
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
