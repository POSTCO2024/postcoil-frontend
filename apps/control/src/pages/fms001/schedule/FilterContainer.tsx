import { Button, Dropdown } from '@postcoil/ui';
import React, { useEffect, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { fetchSchManagementData } from '@/api/scheduleApi';
import { ConstraintInsertionDTO, PriorityDTO } from '@/config/management/dto';
import { options, rollUnitOptions } from '@/utils/scheduling/dropdownUtils';

interface PropsType {
  setPriority: React.Dispatch<React.SetStateAction<PriorityDTO[]>>;
  setConstraint: React.Dispatch<React.SetStateAction<ConstraintInsertionDTO[]>>;
  setInsertion: React.Dispatch<React.SetStateAction<ConstraintInsertionDTO[]>>;
}

const FilterContainer = ({
  setPriority,
  setConstraint,
  setInsertion,
}: PropsType) => {
  const [processCode, setProcessCode] = useState('1CAL');
  const [rollUnit, setRollUnit] = useState('A');

  useEffect(() => {
    const initializeData = async () => {
      const data = await fetchSchManagementData({
        processCode,
        rollUnit,
      });

      setPriority(data.priorities);

      setConstraint(
        data.constraintInsertions.filter(
          (data: ConstraintInsertionDTO) => data.type === 'CONSTRAINT',
        ),
      );
      setInsertion(
        data.constraintInsertions.filter(
          (data: ConstraintInsertionDTO) => data.type === 'INSERTION',
        ),
      );
    };

    initializeData(); // 초기 데이터 세팅 함수 호출
  }, []);

  const handleSearch = async () => {
    // EX. processCode: '1CAL', rollUnit: 'A'
    if (processCode !== '' && rollUnit !== '') {
      console.log('조회 요청 :', processCode, rollUnit);
      const data = await fetchSchManagementData({
        processCode,
        rollUnit,
      });

      console.log('조회 결과 :', data);
      setPriority(data.priorities);

      setConstraint(
        data.constraintInsertions.filter(
          (data: ConstraintInsertionDTO) => data.type === 'CONSTRAINT',
        ),
      );
      setInsertion(
        data.constraintInsertions.filter(
          (data: ConstraintInsertionDTO) => data.type === 'INSERTION',
        ),
      );
    } else {
      console.log('공정명, 롤 단위를 입력하세요.');
      return;
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={options}
          onChange={(value) => {
            setProcessCode(value ? value[0] : '');
          }}
          value={[processCode]}
        />
      </div>
      <Dropdown
        title="롤 단위"
        options={rollUnitOptions}
        onChange={(value) => setRollUnit(value ? value[0] : '')}
        value={[rollUnit]}
      />
      <Button text="조회" onClick={handleSearch} />
    </div>
  );
};

export default FilterContainer;
