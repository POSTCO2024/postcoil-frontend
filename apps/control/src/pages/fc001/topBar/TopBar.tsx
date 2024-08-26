import { SearchBar, Dropdown, Input, SearchButton } from '@postcoil/ui';
import React, { useState } from 'react';

import styles from './TopBar.module.scss';

// Dropdown 임의 데이터
const optionsDropdown1 = [
  {
    value: '1PCM',
    label: '1PCM',
  },
  {
    value: '2PCM',
    label: '2PCM',
  },
  {
    value: '1CAL',
    label: '1CAL',
  },
  {
    value: '2CAL',
    label: '2CAL',
  },
  {
    value: 'EGL',
    label: 'EGL',
  },
  {
    value: 'CGL',
    label: 'CGL',
  },
];

// for Searchbar
const optionsDropdown2 = [
  {
    value: 'coil_number',
    label: '코일 번호',
  },
  {
    value: 'width',
    label: '두께',
  },
  {
    value: 'thickness',
    label: '폭',
  },
];

export const TopBar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleDropdownChange = (selectedValues: any) => {
    // console.log(e.target.value);
    // 배열이 비어있지 않다면 첫 번째 값을 사용하도록 설정
    if (selectedValues && selectedValues.length > 0) {
      setSelectedOption(selectedValues[0]);
      console.log(selectedValues[0]);
    } else {
      setSelectedOption(null);
      console.log('-');
    }
  };

  return (
    <div className={styles.topbarContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title={'공정명'}
          options={optionsDropdown1}
          onChange={handleDropdownChange}
        />
      </div>
      <Dropdown
        title={'검색 기준'}
        options={optionsDropdown2}
        onChange={handleDropdownChange}
      />
      {selectedOption == 'width' || selectedOption == 'thickness' ? (
        <div className={styles.rangeSearchCotainer}>
          <Input />
          <span> (mm) ~ </span>
          <Input />
          <span> (mm) </span>
          <SearchButton />
        </div>
      ) : (
        <SearchBar />
      )}
    </div>
  );
};
