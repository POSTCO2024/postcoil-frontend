import { Input, Space } from 'antd';
import React from 'react';
// import { onChange, onSearch } from './SearchBarConfig'; // Config import
// import { CascaderProps, BaseOptionType } from 'antd/es/cascader';

import styles from './SearchBar.module.scss';

// info
// searchbar 기준 안에 들어갈 내용은 optionSearch에 구성하여 사용
// props: option으로 구성할 값을 json 형식으로 전달해준다.
// ex) <SearchBar options={optionsSearchBar} />

// commit
// 8/23 수정 필요 (검색바에 버튼을 통일되게 사용하도록 변경하는 작업이 필요할듯)

const { Search } = Input;

// options
interface SearchBarProps {
  options?: OptionType[];
  onChange?: (value?: string[]) => void;
  onSearch?: (value?: string) => void;
}

interface OptionType {
  value: string;
  label: string;
}

// // Dropbar Event
// const onChange: CascaderProps<BaseOptionType>['onChange'] = (value) => {
//   console.log(value);
// };

// // Searchbar Event
// const onSearch = (value: string) => console.log(value);

export const SearchBar: React.FC<SearchBarProps> = ({
  // options,
  // onChange,
  onSearch,
}) => {
  return (
    <div className={styles.searchbarContainer}>
      {/* <span> 검색 기준 </span> */}
      <span className={styles.spacer}></span>

      {/* <Cascader
        options={options}
        onChange={
          onChange
            ? onChange
            : () => {
              console.log('Dropdown Click');
            }
        }
        placeholder="선택"
      /> */}
      <span className={styles.spacer}></span>
      <Space direction="vertical">
        <Search
          className={styles.searchbar}
          placeholder="검색"
          onSearch={
            onSearch
              ? onSearch
              : () => {
                  console.log('Search Click');
                }
          }
        />
      </Space>
    </div>
  );
};

export default SearchBar;
