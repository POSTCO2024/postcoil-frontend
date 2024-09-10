import { Button, Dropdown } from '@postcoil/ui';
import React, { useState } from 'react';

import styles from './FilterContainer.module.scss';
import { fetchSchManagementData } from '@/api/fms001Api';
import { ConstraintInsertionDTO, PriorityDTO } from '@/config/management/DTO';

interface PropsType {
  setPriority: React.Dispatch<React.SetStateAction<PriorityDTO[]>>;
  setConstraint: React.Dispatch<React.SetStateAction<ConstraintInsertionDTO[]>>;
  setInsertion: React.Dispatch<React.SetStateAction<ConstraintInsertionDTO[]>>;
}

interface OptionType {
  value: string;
  label: string;
}

// TODO: fetch DATA
const mockOptions: OptionType[] = [
  {
    value: '1CAL',
    label: '1CAL',
  },
  {
    value: '2CAL',
    label: '2CAL',
  },
];
const rollOptions: OptionType[] = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'B',
    label: 'B',
  },
];

const FilterContainer = ({
  setPriority,
  setConstraint,
  setInsertion,
}: PropsType) => {
  const [processCode, setProcessCode] = useState('');
  const [materialUnitCode, setMaterialUnitCode] = useState('');

  const handleSearch = async () => {
    // EX. processCode: '1cal', materialUnitCode: 'A'
    if (processCode !== '' && materialUnitCode !== '') {
      const data = await fetchSchManagementData({
        processCode,
        materialUnitCode,
      });
      console.log(data);

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
      console.log('공정명, 재료 단위를 입력하세요.');
      return;
    }
  };
  // const handleFilter = useState;
  // TODO: filtering

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={mockOptions}
          onChange={(value) => {
            setProcessCode(value ? value[0].toLowerCase() : '');
          }}
        />
        {/* TODO: Dropdown 데이터 변경, 함수 받게 */}
      </div>
      {/* <Button text="조회" onClick={handleSearch} /> */}
      <Dropdown
        title="롤 단위"
        options={rollOptions}
        onChange={(value) => setMaterialUnitCode(value ? value[0] : '')}
      />
      {/* TODO: searchbar 함수 받게! */}
      <Button text="검색" onClick={handleSearch} />
    </div>
  );
};

export default FilterContainer;
