import styles from './Fs004b.module.scss';

import ContentContainer from '@/components/scheduling/plan/ContentContainer';
import FilterContainer from '@/components/scheduling/plan/FilterContainer';

const Fs004b: React.FC = () => {
  // TODO: Modal 창으로 상세화면 조회!!
  return (
    <div className={styles.page}>
      <h1>롤단위 조회</h1>
      <FilterContainer />
      <ContentContainer />
    </div>
  );
};

export default Fs004b;
