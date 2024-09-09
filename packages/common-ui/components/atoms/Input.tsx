import { Input as AntInput, Space } from 'antd';
import React from 'react';

import styles from './Input.module.scss';

export const Input: React.FC = () => {
  return (
    <Space.Compact className={styles.inputContainer}>
      <AntInput className={styles.input} />
    </Space.Compact>
  );
};

export default Input;
