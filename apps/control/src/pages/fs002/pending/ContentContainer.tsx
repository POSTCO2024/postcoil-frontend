import { Table } from '@postcoil/ui';

import styles from './ContentContainer.module.scss';

import { mockcolumns, mockdata } from '@/utils/scheduling/MaterialTableUtils';

// interface PropsType{
//   data?: TODO: props로 데이터 받기
// }

const ContentContainer = () => {
  return (
    <div className={styles.contentContainer}>
      <section className={styles.tableWrapper}>
        <div className={styles.table}>
          <Table columns={mockcolumns} data={mockdata} />
        </div>
      </section>
    </div>
  );
};

export default ContentContainer;
