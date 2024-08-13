import { CascaderProps, BaseOptionType } from 'antd/es/cascader';

// Dropbar Event
export const onChange: CascaderProps<BaseOptionType>['onChange'] = (value) => {
  console.log(value);
};

// Searchbar Event
export const onSearch = (value: string) => console.log(value);

// Data
export const optionSearch: BaseOptionType[] = [
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
