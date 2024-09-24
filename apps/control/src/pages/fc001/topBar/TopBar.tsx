import { SearchBar, Dropdown, Input, SearchButton } from '@postcoil/ui';
import React, { useState } from 'react';

import styles from './TopBar.module.scss';
import {
  optionsDropdown1,
  optionsDropdown2,
} from '@/config/control/TopBarUtils';

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

    if (selectedValues && selectedValues.length > 0) {
      const searchCriteria = selectedValues[0];
      setSelectedOption(searchCriteria);
    } else {
      setSelectedOption(null);
    }
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
      {selectedOption &&
      (selectedOption.indexOf('width') > -1 ||
        selectedOption.indexOf('thickness') > -1) ? (
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
