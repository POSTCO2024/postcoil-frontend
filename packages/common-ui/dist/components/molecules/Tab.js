import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
//Tabs change event handler
// const onChange = (key: string) => {
//   console.log(key);
// };
export const Tab = ({ labels, onChange }) => {
    return (_jsx("div", { children: _jsx(Tabs, { onChange: onChange
                ? onChange
                : () => {
                    console.log('Tab Click');
                }, type: "card", items: labels.map((label, i) => {
                const id = String(i + 1);
                return {
                    label: label,
                    key: id,
                };
            }) }) }));
};
export default Tab;
//# sourceMappingURL=Tab.js.map