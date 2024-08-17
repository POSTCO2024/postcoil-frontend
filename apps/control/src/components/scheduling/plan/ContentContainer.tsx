import { Table as AntTable } from 'antd';

import styles from './ContentContainer.module.scss';

import { mockcolumns, mockdata } from '@/utils/scheduling/ContentUtils';

const ContentContainer = () => {
  return (
    <div className={styles.contentContainer}>
      <p>Schedule 대상재 확인</p>
      <section className={styles.result}>
        {/* TODO: 데이터 확정시, @postcoil/ui의 Table 로 변경하기 */}
        <div className={styles.table}>
          <AntTable columns={mockcolumns} dataSource={mockdata} />
        </div>
      </section>
    </div>
  );
};

export default ContentContainer;
