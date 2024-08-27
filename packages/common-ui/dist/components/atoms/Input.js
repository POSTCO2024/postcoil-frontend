import { jsx as _jsx } from "react/jsx-runtime";
import { Input as AntInput, Space } from 'antd';
import styles from './Input.module.css';
export const Input = () => {
    return (_jsx(Space.Compact, { className: styles.inputContainer, children: _jsx(AntInput, { className: styles.input }) }));
};
export default Input;
//# sourceMappingURL=Input.js.map