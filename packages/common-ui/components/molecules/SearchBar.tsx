import React from 'react';
import { Input, Space, Cascader } from 'antd';
import { optionSearch, onChange, onSearch } from './SearchBarConfig'; // Config import
import './SearchBarConfig';

import styles from './SearchBar.module.scss';

// info
// searchbar 기준 안에 들어갈 내용은 optionSearch에 구성하여 사용

const { Search } = Input;

export const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchbarContainer}>
      <span> 검색 기준 </span>
      <span className="spacer"></span>
      <Cascader options={optionSearch} onChange={onChange} placeholder="선택" />
      <span className="spacer"></span>
      <Space direction="vertical">
        <Search className="searchbar" placeholder="검색" onSearch={onSearch} />
      </Space>
    </div>
  );
};

export default SearchBar;
