import { Table } from '@postcoil/ui';
import React from 'react';

import styles from './ContentContainer.module.scss';

const ContentContainer = () => {
  return (
    <div className={styles.contentContainer}>
      <section className={styles.result}>
        {/* TODO: table for 작업대상재DB after filtering*/}
        <p>Schedule 대상재 확인</p>
        <Table />
      </section>
      <section className={styles.standards}>
        {/* TODO: table props datas, contraintsDB - 제약조건*/}
        <p>제약조건</p>
        <Table />
        {/* TODO: table props contraintsDB - 미편성삽입 조건 */}
        <p>미편성삽입조건</p>
        <Table />
      </section>
    </div>
  );
};

export default ContentContainer;
