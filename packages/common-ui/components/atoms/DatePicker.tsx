import { DatePicker as AntdDatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react';

dayjs.extend(customParseFormat);
import styles from './DatePicker.module.scss';

export const DatePicker: React.FC<{
  dateRangeString?: string | null;
  onChange?: (dateString?: string) => void;
}> = ({ dateRangeString, onChange }) => {
  const { RangePicker } = AntdDatePicker;

  const convertDates = (
    dateRangeString: string | null,
  ): [dayjs.Dayjs | null, dayjs.Dayjs | null] => {
    if (dateRangeString && dateRangeString !== '') {
      const [startStr, endStr] = dateRangeString.split(' - ');
      const startDate = dayjs(startStr); // 문자열을 Dayjs 객체로 변환
      const endDate = dayjs(endStr); // 문자열을 Dayjs 객체로 변환

      return [startDate, endDate];
    } else {
      return [null, null];
    }
  };

  const [dateRangeStr, setDateRangeStr] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >(convertDates(dateRangeString!));

  const disabledDate = (current: dayjs.Dayjs) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

  const handleRangeChange = (dates: [Dayjs, Dayjs] | null) => {
    if (dates) {
      const startDate = dates[0].toDate(); // Dayjs 객체를 Date 객체로 변환
      const endDate = dates[1].toDate(); // Dayjs 객체를 Date 객체로 변환

      const formattedRange = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
      setDateRangeStr(dates);
      onChange?.(formattedRange);
    } else {
      setDateRangeStr([null, null]);
      onChange?.('');
    }
  };

  useEffect(() => {
    setDateRangeStr(convertDates(dateRangeString!));
  }, [dateRangeString]);

  return (
    <div className={styles.datepickerContainer}>
      <span> 날짜 </span>
      <span className={styles.spacer}></span>
      <RangePicker
        disabledDate={disabledDate}
        onChange={(dates) => handleRangeChange(dates as [Dayjs, Dayjs])}
        value={dateRangeStr}
        className={styles.datepicker}
      />
      <span className={styles.spacer}></span>
    </div>
  );
};

export default DatePicker;
