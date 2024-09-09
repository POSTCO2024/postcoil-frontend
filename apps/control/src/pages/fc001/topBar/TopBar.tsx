import { SearchBar, Dropdown, Input, SearchButton } from '@postcoil/ui';
import React, { useState } from 'react';

import styles from './TopBar.module.scss';

// Dropdown 데이터
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

interface TopBarProps {
  onProcessChange: (processCode: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onProcessChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleProcessDropdownChange = (selectedValues: any) => {
    // console.log(e.target.value);
    // 배열이 비어있지 않다면 첫 번째 값을 사용하도록 설정
    if (selectedValues && selectedValues.length > 0) {
      const processCode = selectedValues[0];
      setSelectedOption(processCode);
      console.log(processCode);

      onProcessChange(processCode); // 선택된 공정명을 부모 컴포넌트로 전달
    } else {
      setSelectedOption(null);
      onProcessChange('1PCM'); // default values
      console.log('-');
    }
  };

  const handleSearchDropdownChange = (selectedValues: any) => {
    // 검색 기준에 대한 처리
    console.log('Selected Search Criteria:', selectedValues);
  };

  return (
    <div className={styles.topbarContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title={'공정명'}
          options={optionsDropdown1}
          onChange={handleProcessDropdownChange}
        />
      </div>
      <Dropdown
        title={'검색 기준'}
        options={optionsDropdown2}
        onChange={handleSearchDropdownChange}
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
