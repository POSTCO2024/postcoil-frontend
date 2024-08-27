import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DatePicker as AntdDatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import styles from './DatePicker.module.css';
export const DatePicker = ({ onChange }) => {
    const { RangePicker } = AntdDatePicker;
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current > dayjs().endOf('day');
    };
    const handleRangeChange = (dates) => {
        if (dates) {
            const startDate = dates[0].toDate(); // Dayjs 객체를 Date 객체로 변환
            const endDate = dates[1].toDate(); // Dayjs 객체를 Date 객체로 변환
            const formattedRange = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            onChange?.(formattedRange);
        }
        else {
            onChange?.();
        }
    };
    return (_jsxs("div", { className: styles.datepickerContainer, children: [_jsx("span", { children: " \uB0A0\uC9DC " }), _jsx("span", { className: styles.spacer }), _jsx(RangePicker, { status: "error", disabledDate: disabledDate, onChange: (dates) => handleRangeChange(dates), className: styles.datepicker }), _jsx("span", { className: styles.spacer })] }));
};
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map