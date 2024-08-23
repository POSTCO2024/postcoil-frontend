import { Table } from '@postcoil/ui';

import styles from './SchMpage.module.scss';

import {
  priority,
  priorityData,
  constraints,
  constraintsData,
  unInsConstraints,
  unInsConstraintsData,
} from '@/config/management/SchMConfig';
import FilterContainer from '@/pages/fms001/schedule/FilterContainer';
import Result from '@/pages/fms001/schedule/Result';

// TODO: fetch data 후 props 또는 데이터 삽입
// { constraints, unInsConstraints }: PropsType
const SchMPage = () => {
  return (
    <div className={styles.page}>
      <h1>스케줄 기준 관리</h1>
      <FilterContainer />
      <div className={styles.contentContainer}>
        <div style={{ width: '40%' }}>
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '1.2em',
              paddingBottom: '10px',
            }}>
            우선순위
          </p>
          <Table useCheckBox={false} columns={priority} data={priorityData} />
          <Result title="우선순위" data={priorityData} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
          <p>제약조건</p>
          <Table
            useCheckBox={false}
            columns={constraints}
            data={constraintsData}
          />
          <Result title="제약조건" data={constraintsData} />
          <div style={{ height: '11%' }}></div>
          <p>미편성삽입</p>
          <Table
            useCheckBox={false}
            columns={unInsConstraints}
            data={unInsConstraintsData}
          />
          <Result title="미편성삽입조건" data={unInsConstraints} />
        </div>
      </div>
    </div>
  );
};

export default SchMPage;
