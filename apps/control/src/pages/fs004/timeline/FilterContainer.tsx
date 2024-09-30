import { DatePicker, Dropdown } from '@postcoil/ui';
import { useState } from 'react';

import styles from './FilterContainer.module.scss';

import { useWorkInstructionStore } from '@/store/fs004store';

// interface PropsType {
//   process: {
//     title: string; // 공정명
//     options: string[]; // ['1CAL', '2CAL', 'EGL']
//   };

interface OptionType {
  value: string;
  label: string;
}

const FilterContainer = () => {
  const selectedProcessCode = useWorkInstructionStore(
    (state) => state.processCode,
  );

  const fetchWorkInstructionData = useWorkInstructionStore(
    (state) => state.fetchData,
  ); // fetch Schedule data

  const [processCode, setProcessCode] = useState<string[] | undefined>();
  const handleProcessCode = (value?: string[]) => {
    if (value && value[0] !== '' && value[0] !== selectedProcessCode) {
      setProcessCode(value);
      fetchWorkInstructionData(value); // fetchData 함수 호출
    } else {
      setProcessCode([]);
    }
  };

  const options: OptionType[] = [
    {
      value: '1CAL',
      label: '1CAL',
    },
    {
      value: '2CAL',
      label: '2CAL',
    },
  ];
  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={options}
          onChange={handleProcessCode}
          value={processCode}
        />
        {/* TODO: Dropdown 데이터 변경, 함수 받게 */}
      </div>
      <div className={styles.datepicker}>
        <DatePicker />
      </div>
      {/* <Button text="조회" onClick={handleSearch} /> */}
      {/* <SearchBar /> */}
      {/* TODO: searchbar 함수 받게! */}
      {/* <Button text="검색" onClick={handleFilter} /> */}
    </div>
  );
};

export default FilterContainer;
