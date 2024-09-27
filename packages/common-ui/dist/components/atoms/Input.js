import { jsx as _jsx } from "react/jsx-runtime";
import { Input as AntInput, Space } from 'antd';
import styles from './Input.module.css';
export const Input = ({ onChange, value }) => {
    const handleChange = (e) => {
        const inputValue = e.target.value; // 입력된 값을 가져옴
        if (onChange) {
            onChange(inputValue); // string으로 콜백 호출
        }
    };
    return (_jsx(Space.Compact, { className: styles.inputContainer, children: _jsx(AntInput, { className: styles.input, type: "number", onChange: handleChange, value: value }) }));
};
export default Input;
//# sourceMappingURL=Input.js.map