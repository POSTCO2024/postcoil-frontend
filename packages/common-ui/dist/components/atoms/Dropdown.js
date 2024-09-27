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
export const Dropdown = ({ title, options, onChange, value, }) => {
    return (_jsxs("div", { className: styles.dropdownContainer, children: [_jsxs("span", { children: [" ", title, " "] }), _jsx("span", { className: styles.spacer }), _jsx(Cascader, { options: options, onChange: onChange
                    ? (value) => {
                        // 선택된 값이 없을 때 (x 버튼 클릭 시) onChange에 undefined 전달
                        onChange(value);
                    }
                    : () => {
                        console.log('Dropdown Click');
                    }, placeholder: "\uC120\uD0DD", value: value }), _jsx("span", { className: styles.spacer })] }));
};
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map