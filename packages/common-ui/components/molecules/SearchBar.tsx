// import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Cascader } from 'antd';
import { CascaderProps, BaseOptionType } from 'antd/es/cascader';
import React from 'react';
import './SearchBar.scss';

// info
// searchbar 기준 안에 들어갈 내용은 optionSearch에 구성하여 사용

const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: '#1677ff',
//     }}
//   />
// ); // for icon

// Dropbar Event
const onChange: CascaderProps<BaseOptionType>['onChange'] = (value) => {
  console.log(value);
};

// Searchbar Event
const onSearch = (value: string) => console.log(value);

// Data
const optionSearch: BaseOptionType[] = [
  {
    value: 'id',
    label: '코일ID',
  },
  {
    value: 'length',
    label: '두께',
  },
  {
    value: 'width',
    label: '폭',
  },
];

export const SearchBar: React.FC = () => {
  return (
    <div className="searchbar-container">
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
