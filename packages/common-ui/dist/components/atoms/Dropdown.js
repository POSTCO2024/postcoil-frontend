import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Cascader } from 'antd';
import styles from './Dropdown.module.css';
// Cascader value
const optionsDropdown = [
    {
        value: '1PCM',
        label: '1PCM',
    },
    {
        value: '2PCM',
        label: '2PCM',
    },
    {
        value: '1CAL',
        label: '1CAL',
    },
];
const onChange = (value) => {
    console.log(value);
};
export const Dropdown = ({ title }) => {
    return (_jsxs("div", { className: styles.dropdownContainer, children: [_jsxs("span", { children: [" ", title, " "] }), _jsx("span", { className: "spacer1" }), _jsx(Cascader, { options: optionsDropdown, onChange: onChange, placeholder: "\uC120\uD0DD" }), _jsx("span", { className: "spacer" })] }));
};
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map