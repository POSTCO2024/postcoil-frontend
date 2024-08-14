import { DatePicker as AntDatePicker, Space } from 'antd';
import React from 'react';

import styles from './DatePicker.module.scss';

// info
// 날짜 지정 조회 시 활용, 버튼은 별도로 사용
// onChange함수로 날짜 전달

export const DatePicker: React.FC<{
  onChange?: (dateString?: string | Date) => {};
}> = ({ onChange }) => {
  return (
    <div className={styles.datepickerContainer}>
      <span>날짜</span>
      <span className="spacer"></span>
      <Space direction="vertical" size={10}>
        <AntDatePicker onChange={onChange} />
      </Space>
    </div>
  );
};

export default DatePicker;
