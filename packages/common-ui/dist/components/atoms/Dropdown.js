import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Cascader } from 'antd';
import styles from './Dropdown.module.css';
// // Cascader value
// const optionsDropdown: OptionType[] = [
//   {
//     value: '1PCM',
//     label: '1PCM',
//   },
//   {
//     value: '2PCM',
//     label: '2PCM',
//   },
//   {
//     value: '1CAL',
//     label: '1CAL',
//   },
// ];
// const onChange = (value: string[]) => {
//   console.log(value);
// };
export const Dropdown = ({ title, options, onChange, }) => {
    return (_jsxs("div", { className: styles.dropdownContainer, children: [_jsxs("span", { children: [" ", title, " "] }), _jsx("span", { className: styles.spacer }), _jsx(Cascader, { options: options, onChange: onChange
                    ? (value) => {
                        onChange(value); // `undefined`를 허용
                    }
                    : () => {
                        console.log('Dropdown Click');
                    }, placeholder: "\uC120\uD0DD" }), _jsx("span", { className: styles.spacer })] }));
};
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map