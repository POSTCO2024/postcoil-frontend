import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
import styles from './Tab.module.css';
//Tabs change event handler
const onChange = (key) => {
    console.log(key);
};
export const Tab = ({ labels }) => {
    return (_jsx("div", { className: styles.tabContainer, children: _jsx(Tabs, { onChange: onChange, type: "card", items: labels.map((label, i) => {
                const id = String(i + 1);
                return {
                    label: label,
                    key: id,
                };
            }) }) }));
};
export default Tab;
//# sourceMappingURL=Tab.js.map