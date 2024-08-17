import styles from './SchMpage.module.scss';

import FilterContainer from '@/components/management/schedule/FilterContainer';
import Result from '@/components/management/schedule/Result';

export interface DataType {
  [key: string]: string | number;
}

// interface PropsType {
//   priorities: DataType;
//   constraints: DataType;
// }

// TODO: fetch data from API
const constraints: DataType = {
  length: 100,
  width: 50,
};

const unInsConstraints: DataType = {
  width: 10,
};

// TODO: fetch data 후 props 또는 데이터 삽입
// { constraints, unInsConstraints }: PropsType
const SchMPage = () => {
  return (
    <div className={styles.page}>
      <h1>스케줄 기준 관리</h1>
      <FilterContainer />
      <div className={styles.contentContainer}>
        <Result title="제약조건" data={constraints} />
        <Result title="미편성삽입조건" data={unInsConstraints} />
      </div>
    </div>
  );
};

export default SchMPage;
