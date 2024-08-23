import { DatePicker as AntdDatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';

dayjs.extend(customParseFormat);
import styles from './DatePicker.module.scss';

export const DatePicker: React.FC<{
  onChange?: (dateString?: string) => void;
}> = ({ onChange }) => {
  const { RangePicker } = AntdDatePicker;

  const disabledDate = (current: dayjs.Dayjs) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

  const handleRangeChange = (dates: [Dayjs, Dayjs] | null) => {
    if (dates) {
      const startDate = dates[0].toDate(); // Dayjs 객체를 Date 객체로 변환
      const endDate = dates[1].toDate(); // Dayjs 객체를 Date 객체로 변환

      const formattedRange = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
      onChange?.(formattedRange);
    } else {
      onChange?.();
    }
  };

  return (
    <div className={styles.datepickerContainer}>
      <span> 날짜 </span>
      <span className={styles.spacer}></span>
      <RangePicker
        status="error"
        disabledDate={disabledDate}
        onChange={(dates) => handleRangeChange(dates as [Dayjs, Dayjs])}
        className={styles.datepicker}
      // TODO: width !!!
      // style={{
      //   width: '100%',
      //   maxWidth: 200,
      // }}
      />
      <span className={styles.spacer}></span>
    </div>
  );
};

export default DatePicker;
