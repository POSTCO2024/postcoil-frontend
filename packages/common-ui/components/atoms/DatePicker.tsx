import { DatePicker as AntDatePicker, Space } from 'antd';
import React from 'react';

import styles from './DatePicker.module.scss';

// info
// 날짜 지정 조회 시 활용, 버튼은 별도로 사용

const { RangePicker } = AntDatePicker;

export const DatePicker: React.FC = () => {
  return (
    <div className={styles.datepickerContainer}>
      <span>날짜</span>
      <span className="spacer"></span>
      <Space direction="vertical" size={10}>
        <RangePicker />
      </Space>
    </div>
  );
};

export default DatePicker;
