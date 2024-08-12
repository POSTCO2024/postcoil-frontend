import React from 'react';

import styles from './SchMpage.module.scss';

import FilterContainer from '@/components/management/schedule/FilterContainer';
import Result from '@/components/management/schedule/Result';

export interface DataType {
  [key: string]: string | number;
}

interface PropsType {
  priorities: DataType;
  constraints: DataType;
}

// TODO: fetch data from API
const priorities: DataType = {
  length: 100,
  width: 50,
};

const constraints: DataType = {
  width: 10,
};

// { priorities, constraints }: PropsType
const SchMPage = () => {
  return (
    <div className={styles.page}>
      <h1>스케줄 기준 관리</h1>
      <FilterContainer />
      <div className={styles.contentContainer}>
        <Result title="제약조건" data={priorities} />
        <Result title="미편성삽입조건" data={constraints} />
      </div>
    </div>
  );
};

export default SchMPage;
