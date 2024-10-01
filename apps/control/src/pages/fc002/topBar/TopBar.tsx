import { Dropdown, SearchBar, Input, SearchButton } from '@postcoil/ui';
import axios from 'axios';
import React, { useState } from 'react';

import styles from './TopBar.module.scss';

import {
  optionsDropdown1,
  optionsDropdown2,
} from '@/utils/control/topBarUtils';
import { transformData } from '@/utils/control/transformData';

const controlApiUrl = import.meta.env.VITE_CONTROL_API_URL;
const controlBaseUrl = import.meta.env.VITE_CONTROL_BASE_URL;

interface TopBarProps {
  onProcessChange: (processCode: string) => void;
  onSearch: (searchResults: any[]) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onProcessChange,
  onSearch,
}) => {
  // 공정
  const [selectedProcess, setSelectedProcess] = useState<string | string>(
    '1PCM',
  );
  // 검색 기준
  const [selectedSearch, setSelectedSearch] = useState<string | null>(null);
  // 검색 값
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
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
      // setSelectedOption(null);
      // onProcessChange('1PCM'); // default values
      // console.log('-');
    }
  };

  // 검색 기준(컬럼) 선택
  const handleSearchDropdownChange = (selectedValues: any) => {
    console.log('Selected Search Criteria ', selectedValues);

    if (selectedValues && selectedValues.length > 0) {
      const searchCriteria = selectedValues[0];
      setSelectedSearch(searchCriteria);
      // 값 초기화
      setMaxValue('');
      setMinValue('');
    } else {
      setSelectedSearch(null);
    }
  };

  // 범위 검색 시, 입력값(min,max) 처리
  const handleMinValueChange = (value: string) => {
    console.log('min' + value);
    setMinValue(value);
  };
  const handleMaxValueChange = (value: string) => {
    console.log('max' + value);
    setMaxValue(value);
  };

  // API 요청을 처리하는 함수
  const handleSearch = async (value?: string) => {
    setSearchValue(value || null); // 검색어 상태 업데이트
    console.debug(searchValue);
    console.log('Search Keyword: ' + value);
    try {
      const url =
        `${controlApiUrl}${controlBaseUrl}/target-materials/search?currProc=${selectedProcess}` +
        `&searchCriteria=` +
        (selectedSearch || '') +
        `&searchValue=` +
        (value || '') +
        `&minValue=` +
        (minValue || '') +
        `&maxValue=` +
        (maxValue || '') +
        `&isError=` +
        'Y'; // 에러재

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
          value={[selectedProcess]}
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
          <Input onChange={handleMinValueChange} value={minValue} />
          <span> (mm) ~ </span>
          <Input onChange={handleMaxValueChange} value={maxValue} />
          <span> (mm)</span>
          <SearchButton onClick={() => handleSearch()} />
        </div>
      ) : (
        <SearchBar onSearch={handleSearch} />
      )}
    </div>
  );
};
