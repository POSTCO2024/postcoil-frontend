import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Cascader } from 'antd';
import styles from './SearchBar.module.css';
// info
// searchbar 기준 안에 들어갈 내용은 optionSearch에 구성하여 사용
const { Search } = Input;
// const suffix = (
//   <AudioOutlined
//     style={{
//       fontSize: 16,
//       color: '#1677ff',
//     }}
//   />
// ); // for icon
// Dropbar Event
const onChange = (value) => {
    console.log(value);
};
// Searchbar Event
const onSearch = (value) => console.log(value);
// Data
const optionSearch = [
    {
        value: 'id',
        label: '코일ID',
    },
    {
        value: 'length',
        label: '두께',
    },
    {
        value: 'width',
        label: '폭',
    },
];
export const SearchBar = () => {
    return (_jsxs("div", { className: styles.searchbarContainer, children: [_jsx("span", { children: " \uAC80\uC0C9 \uAE30\uC900 " }), _jsx("span", { className: "spacer" }), _jsx(Cascader, { options: optionSearch, onChange: onChange, placeholder: "\uC120\uD0DD" }), _jsx("span", { className: "spacer" }), _jsx(Space, { direction: "vertical", children: _jsx(Search, { className: "searchbar", placeholder: "\uAC80\uC0C9", onSearch: onSearch }) })] }));
};
export default SearchBar;
//# sourceMappingURL=SearchBar.js.map