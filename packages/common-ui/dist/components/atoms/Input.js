import { jsx as _jsx } from "react/jsx-runtime";
import { Input as AntInput, Space } from 'antd';
<<<<<<< HEAD
import styles from './Input.module.css';
=======
import styles from './Input.module.scss';
>>>>>>> aa899f5 (Chore: 빌드 스크립트 수정 및 빌드...)
export const Input = () => {
    return (_jsx(Space.Compact, { className: styles.inputContainer, children: _jsx(AntInput, { className: styles.input }) }));
};
export default Input;
//# sourceMappingURL=Input.js.map