import React from 'react';

import styles from './ExtMPage.module.scss';

import FilterContainer from '@/components/management/extraction/FilterContainer';
import Result from '@/components/management/extraction/Result';

export interface DataType {
  [key: string]: string | number;
}

interface PropsType {
  priorities: DataType;
  constraints: DataType;
}

// TODO: fetch data from API
const extractions: DataType = {
  공장코드: 100,
  공정코드: 'CAL',
  재료진행상태: '2',
  재료진도: 'D',
};

const outlierCriteria: DataType = {
  width: '1',
  thickness: '1',
};

// { extractions, errorCriteria }: PropsType

const ExtMPage = () => {
  return (
    <div className={styles.page}>
      <h1>작업대상재 기준 관리</h1>
      <FilterContainer />
      <div className={styles.contentContainer}>
        <Result title="추출기준" data={extractions} />
        <Result title="에러기준" data={outlierCriteria} />
      </div>
    </div>
  );
};

export default ExtMPage;
