import { Table } from '@postcoil/ui';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import styles from './ContentContainer.module.scss';

import { MaterialDataType } from '@/config/contentConfig';
import { useWorkInstructionStore } from '@/store/fo001store';
import {
  transformedWorkItemData,
  workItemColumnData,
} from '@/utils/tableUtils';

const ContentContainer = () => {
  const materialData = useWorkInstructionStore((state) => state.workItems);

  const [dataSource, setDataSource] = useState<MaterialDataType[]>([]);

  // materialData가 변경될 때마다 dataSource 업데이트 및 재렌더링
  useEffect(() => {
    if (materialData && materialData.length > 0) {
      const transformed = transformedWorkItemData(materialData);
      setDataSource(transformed);
    } else {
      setDataSource([]);
    }
    console.log('Material', materialData);
    console.log('Updated dataSource:', dataSource);
  }, [materialData]); // materialData가 변경될 때마다 실행

  return (
    <div className={styles.contentContainer}>
      <section className={styles.tableWrapper}>
        <div className={styles.table}>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  rowHoverBg: '#f2f6f1',
                },
              },
            }}>
            <Table
              columns={workItemColumnData}
              data={dataSource}
              rowClassName={(record) =>
                record.changed ? `${styles.rowChanged}` : ''
              }
              size="small"
            />
          </ConfigProvider>
        </div>
      </section>
    </div>
  );
};

export default ContentContainer;
