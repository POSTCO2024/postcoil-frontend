import { Table } from '@postcoil/ui';

import styles from './ContentContainer.module.scss';

import { mockcolumns, mockdata } from '@/utils/scheduling/MaterialTableUtils';

const ContentContainer = () => {
  return (
    <div className={styles.contentContainer}>
      <section className={styles.result}>
        <div className={styles.table}>
          {/* TODO: common-ui의 Table checkbox fix!!  */}
          <Table useCheckBox={true} columns={mockcolumns} data={mockdata} />
        </div>
      </section>
    </div>
  );
};

export default ContentContainer;
