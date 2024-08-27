import { jsx as _jsx } from "react/jsx-runtime";
import { Button as AntButton } from 'antd';
import styles from './Button.module.css';
export const Button = ({ text, onClick, style }) => {
    return (_jsx("div", { className: styles.buttonContainer, children: _jsx(AntButton, { className: styles.button, type: "primary", onClick: onClick
                ? onClick
                : () => {
                    console.log(text + ' Click');
                }, style: style ? { width: 90 } : undefined, children: text }) }));
};
export default Button;
//# sourceMappingURL=Button.js.map