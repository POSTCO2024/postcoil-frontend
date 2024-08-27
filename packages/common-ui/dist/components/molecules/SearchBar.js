import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Space } from 'antd';
// import { onChange, onSearch } from './SearchBarConfig'; // Config import
// import { CascaderProps, BaseOptionType } from 'antd/es/cascader';
<<<<<<< HEAD
import styles from './SearchBar.module.css';
=======
import styles from './SearchBar.module.scss';
>>>>>>> aa899f5 (Chore: 빌드 스크립트 수정 및 빌드...)
// info
// searchbar 기준 안에 들어갈 내용은 optionSearch에 구성하여 사용
// props: option으로 구성할 값을 json 형식으로 전달해준다.
// ex) <SearchBar options={optionsSearchBar} />
// commit
// 8/23 수정 필요 (검색바에 버튼을 통일되게 사용하도록 변경하는 작업이 필요할듯)
const { Search } = Input;
// // Dropbar Event
// const onChange: CascaderProps<BaseOptionType>['onChange'] = (value) => {
//   console.log(value);
// };
// // Searchbar Event
// const onSearch = (value: string) => console.log(value);
export const SearchBar = ({ 
// options,
// onChange,
onSearch, }) => {
    return (_jsxs("div", { className: styles.searchbarContainer, children: [_jsx("span", { className: styles.spacer }), _jsx("span", { className: styles.spacer }), _jsx(Space, { direction: "vertical", children: _jsx(Search, { className: styles.searchbar, placeholder: "\uAC80\uC0C9", onSearch: onSearch
                        ? onSearch
                        : () => {
                            console.log('Search Click');
                        } }) })] }));
};
export default SearchBar;
//# sourceMappingURL=SearchBar.js.map