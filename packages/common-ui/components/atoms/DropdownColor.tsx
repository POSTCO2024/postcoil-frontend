import { CheckCircleFilled, SyncOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';
import type { CascaderProps, GetProp } from 'antd';
import React from 'react';

import styles from './DropdownColor.module.scss';
type DefaultOptionType = GetProp<CascaderProps, 'options'>[number];

// info
// dropdown 안에 들어갈 내용은 optionsDropdown에 구성하여 사용
// props1: dropdown의 값을 구분하는 텍스트를 input으로 전달해준다.
// props2: option으로 구성할 값을 json 형식으로 전달해준다.
// ex) <Dropdown title={dropdownTitle} options={optionsDropdown} />

interface DropdownProps {
  title: string; // dropdown 구분 텍스트
  options: OptionType[];
  onChange?: (value?: string[]) => void;
}

interface OptionType {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

// // Cascader value
// const optionsDropdown: OptionType[] = [
//   {
//     value: '1PCM',
//     label: '1PCM',
//   },
//   {
//     value: '2PCM',
//     label: '2PCM',
//   },
//   {
//     value: '1CAL',
//     label: '1CAL',
//   },
// ];

// const onChange = (value: string[]) => {
//   console.log(value);
// };

export const DropdownColor: React.FC<DropdownProps> = ({
  title,
  options,
  onChange,
}) => {
  // const handleAreaClick = (
  //   e: React.MouseEvent<HTMLAnchorElement>,
  //   label: string,
  //   option: DefaultOptionType,
  // ) => {
  //   e.stopPropagation();
  //   console.log('clicked', label, option);
  // };
  const displayRender: CascaderProps<OptionType>['displayRender'] = (
    labels,
    selectedOptions = [],
  ) =>
    labels.map((label, i) => {
      console.log(labels);
      const option = selectedOptions[i];
      console.log(option);
      if (i === labels.length - 1) {
        return (
          <span key={option.value}>
            {option.icon}
            {label}
            {/* (
            <a onClick={(e) => handleAreaClick(e, label, option)}>
              {option.label}
            </a>
            ) */}
          </span>
        );
      }
      return <span key={option.value}>{label} / </span>;
    });
  return (
    <div className={styles.dropdownContainer}>
      <span> {title} </span>
      <span className={styles.spacer}></span>
      <Cascader
        options={options}
        displayRender={displayRender}
        onChange={
          onChange
            ? onChange
            : () => {
                console.log('Dropdown Click');
              }
        }
        placeholder="선택"
      />
      <span className={styles.spacer}></span>
    </div>
  );
};

export default DropdownColor;
