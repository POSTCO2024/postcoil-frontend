import { Table as AntTable } from 'antd';

import styles from './ContentContainer.module.scss';

import { mockcolumns, mockdata } from '@/utils/scheduling/ContentUtils';

// interface PropsType{
//   data?: TODO: props로 데이터 받기
// }

const ContentContainer = () => {
  return (
    <div className={styles.contentContainer}>
      <section className={styles.tableWrapper}>
        {/* TODO: 데이터 확정시, @postcoil/ui의 Table 로 변경하기 */}
        <div className={styles.table}>
          <AntTable
            columns={mockcolumns}
            dataSource={mockdata}
            rowClassName={(record) =>
              record.changed ? `${styles.rowChanged}` : ''
            }
          />
        </div>
      </section>
    </div>
  );
};

export default ContentContainer;
