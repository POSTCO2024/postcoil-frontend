import { Cascader } from 'antd';
import React from 'react';

import styles from './Dropdown.module.scss';

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

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  onChange,
}) => {
  return (
    <div className={styles.dropdownContainer}>
      <span> {title} </span>
      <span className="spacer1"></span>
      <Cascader
        options={options}
        onChange={
          onChange
            ? onChange
            : () => {
                console.log('Dropdown Click');
              }
        }
        placeholder="선택"
      />
      <span className="spacer"></span>
    </div>
  );
};

export default Dropdown;
