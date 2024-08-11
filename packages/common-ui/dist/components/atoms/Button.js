import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button as AntButton } from 'antd';
import styles from './Button.module.css';
export const Button = ({ text, onClick }) => {
    return (_jsx("div", { className: styles.buttonContainer, children: _jsxs(AntButton, { className: "button", type: "primary", onClick: onClick, children: [' ', text, ' '] }) }));
};
export default Button;
//# sourceMappingURL=Button.js.map