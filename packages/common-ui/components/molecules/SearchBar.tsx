import React from 'react';
import { Input, Space, Cascader } from 'antd';
// import { onChange, onSearch } from './SearchBarConfig'; // Config import
import { CascaderProps, BaseOptionType } from 'antd/es/cascader';

import styles from './SearchBar.module.scss';

// info
// searchbar 기준 안에 들어갈 내용은 optionSearch에 구성하여 사용
// props: option으로 구성할 값을 json 형식으로 전달해준다.
// ex) <SearchBar options={optionsSearchBar} />

const { Search } = Input;

// options
interface SearchBarProps {
  options: OptionType[];
}

interface OptionType {
  value: string;
  label: string;
}

// Dropbar Event
const onChange: CascaderProps<BaseOptionType>['onChange'] = (value) => {
  console.log(value);
};

// Searchbar Event
const onSearch = (value: string) => console.log(value);

export const SearchBar: React.FC<SearchBarProps> = ({ options }) => {
  return (
    <div className={styles.searchbarContainer}>
      <span> 검색 기준 </span>
      <span className="spacer"></span>
      <Cascader options={options} onChange={onChange} placeholder="선택" />
      <span className="spacer"></span>
      <Space direction="vertical">
        <Search className="searchbar" placeholder="검색" onSearch={onSearch} />
      </Space>
    </div>
  );
};

export default SearchBar;
