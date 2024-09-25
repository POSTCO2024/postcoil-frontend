import { Input as AntInput, Space } from 'antd';
import React from 'react';

import styles from './Input.module.scss';

interface InputProps {
  onChange?: (value: string) => void;
  value: string;
}

export const Input: React.FC<InputProps> = ({ onChange, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value; // 입력된 값을 가져옴
    if (onChange) {
      onChange(inputValue); // string으로 콜백 호출
    }
  };

  return (
    <Space.Compact className={styles.inputContainer}>
      <AntInput
        className={styles.input}
        type="number"
        onChange={handleChange}
        value={value}
      />
    </Space.Compact>
  );
};

export default Input;
