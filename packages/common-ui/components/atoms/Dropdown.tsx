import { Cascader } from 'antd';
import React from 'react';
import { optionsDropdown, onChange } from './DropdownConfig';

import styles from './Dropdown.module.scss';

// info
// dropdown 안에 들어갈 내용은 optionsDropdown에 구성하여 사용
// props: dropdown의 값을 구분하는 텍스트를 input으로 전달
// ex) <Dropdown title={dropdownTitle}/>

interface DropdownProps {
  title: string; // dropdown 구분 텍스트
}

export const Dropdown: React.FC<DropdownProps> = ({ title }) => {
  return (
    <div className={styles.dropdownContainer}>
      <span> {title} </span>
      <span className="spacer1"></span>
      <Cascader
        options={optionsDropdown}
        onChange={onChange}
        placeholder="선택"
      />
      <span className="spacer"></span>
    </div>
  );
};

export default Dropdown;
