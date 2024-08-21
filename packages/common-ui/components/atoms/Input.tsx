import { Input as AntInput, Space } from 'antd';
import React from 'react';

// import styles from './Input.modul.scss';

export const Input: React.FC = () => {
  return (
    <Space.Compact>
      <AntInput />
    </Space.Compact>
  );
};

export default Input;
