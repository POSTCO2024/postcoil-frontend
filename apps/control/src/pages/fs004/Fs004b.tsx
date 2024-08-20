import styles from './Fs004b.module.scss';

import ContentContainer from '@/components/scheduling/pending/ContentContainer';
import FilterContainer from '@/components/scheduling/pending/FilterContainer';

const Fs004b: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1>롤단위 조회</h1>
      <FilterContainer />
      <div className={styles.result}>
        <ContentContainer />
      </div>
    </div>
  );
};

export default Fs004b;
