import { SearchBar, Dropdown, Input, SearchButton } from '@postcoil/ui';
import React, { useState } from 'react';

import axios from 'axios';

import styles from './TopBar.module.scss';
import {
  optionsDropdown1,
  optionsDropdown2,
} from '@/config/control/TopBarUtils';
import { transformData } from '@/utils/control/transformData';

interface TopBarProps {
  onProcessChange: (processCode: string) => void;
  onSearch: (searchResults: any[]) => void; // 검색 결과 리스트를 callback
}

export const TopBar: React.FC<TopBarProps> = ({
  onProcessChange,
  onSearch,
}) => {
  const [selectedProcess, setSelectedProcess] = useState<string | string>(
    '1PCM',
  );
  const [selectedSearch, setSelectedSearch] = useState<string | null>(null);

  const [minValue, setMinValue] = useState<string | null>(null);
  const [maxValue, setMaxValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  // 공정 선택
  const handleProcessDropdownChange = (selectedValues: any) => {
    // console.log(e.target.value);
    // 배열이 비어있지 않다면 첫 번째 값을 사용하도록 설정
    if (selectedValues && selectedValues.length > 0) {
      const processCode = selectedValues[0];
      setSelectedProcess(processCode);
      console.log('Selected Process: ' + processCode);

      onProcessChange(processCode); // 선택된 공정명을 부모 컴포넌트로 전달
    } else {
      // setSelectedProcess(null);
      // onProcessChange('1PCM'); // default values
      // console.log('Default Process');
    }
  };

  // 검색 기준(컬럼) 선택
  const handleSearchDropdownChange = (selectedValues: any) => {
    console.log('Selected Search Criteria ', selectedValues);

    if (selectedValues && selectedValues.length > 0) {
      const searchCriteria = selectedValues[0];
      setSelectedSearch(searchCriteria);
    } else {
      setSelectedSearch(null);
    }
  };

  // API 요청을 처리하는 함수
  const handleSearch = async (value?: string) => {
    setSearchValue(value || null); // 검색어 상태 업데이트
    console.log('Search Keyword: ' + value);
    try {
      const url =
        `http://localhost:8086/api/v1/target-materials/normal-by-curr-proc/search?` +
        `currProc=` +
        selectedProcess + // selectedOption이 없으면 1PCM 전달하도록
        `&searchCriteria=` +
        selectedSearch +
        `&searchValue=` +
        value;
      const response = await axios.get(url);
      console.log(url);
      console.log('API Response:', response.data);

      if (response.status == 200) {
        onSearch(transformData(response.data.result));
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
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
      {selectedSearch &&
      (selectedSearch.indexOf('width') > -1 ||
        selectedSearch.indexOf('thickness') > -1) ? (
        <div className={styles.rangeSearchCotainer}>
          {/* <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinValue(e.target.value)} /> */}
          <span> (mm) ~ </span>
          {/* <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxValue(e.target.value)} /> */}
          <span> (mm) </span>
          <SearchButton />
        </div>
      ) : (
        <SearchBar onSearch={handleSearch} />
      )}
    </div>
  );
};
