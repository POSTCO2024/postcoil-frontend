import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DatePicker as AntDatePicker, Space } from 'antd';
import styles from './DatePicker.module.css';
// info
// 날짜 지정 조회 시 활용, 버튼은 별도로 사용
const { RangePicker } = AntDatePicker;
export const DatePicker = () => {
    return (_jsxs("div", { className: styles.datepickerContainer, children: [_jsx("span", { children: "\uB0A0\uC9DC" }), _jsx("span", { className: "spacer" }), _jsx(Space, { direction: "vertical", size: 10, children: _jsx(RangePicker, {}) })] }));
};
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map