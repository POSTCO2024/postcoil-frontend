import { Table } from '@postcoil/ui';

import styles from './SchMpage.module.scss';

import {
  priority as priorityColumn,
  constraints,
  unInsConstraints,
} from '@/config/management/SchMConfig';
import FilterContainer from '@/pages/fms001/schedule/FilterContainer';
import Result from '@/pages/fms001/schedule/Result';
import { useState } from 'react';
import { PriorityDTO, ConstraintInsertionDTO } from '@/config/management/DTO';
import {
  TransformedConstraintDataType,
  transformedData,
  TransformedPriorityDataType,
} from '@/utils/management/schMUtils';

const SchMPage = () => {
  const [priority, setPriority] = useState<PriorityDTO[]>([]);
  const [constraint, setConstraint] = useState<ConstraintInsertionDTO[]>([]);
  const [insertion, setInsertion] = useState<ConstraintInsertionDTO[]>([]);

  const priorityData = transformedData(
    priority,
  ) as TransformedPriorityDataType[];
  const constraintsData = transformedData(
    constraint,
  ) as TransformedConstraintDataType[];
  const unInsConstraintsData = transformedData(
    insertion,
  ) as TransformedConstraintDataType[];

  return (
    <div className={styles.page}>
      <h1>스케줄 기준 관리</h1>
      <FilterContainer
        setPriority={setPriority}
        setConstraint={setConstraint}
        setInsertion={setInsertion}
      />
      <div className={styles.contentContainer}>
        <div className={styles.priority}>
          <p>우선순위</p>
          <Table columns={priorityColumn} data={priorityData} />
          <Result title="우선순위" data={priorityData} />
        </div>
        <div className={styles.constraints}>
          <div className={styles.constraint}>
            <p>제약조건</p>
            <Table columns={constraints} data={constraintsData} />
            <Result title="제약조건" data={constraintsData} />
          </div>
          <div className={styles.constraint}>
            <p>미편성삽입</p>
            <Table columns={unInsConstraints} data={unInsConstraintsData} />
            <Result title="미편성삽입조건" data={unInsConstraintsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchMPage;
