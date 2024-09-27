import { jsx as _jsx } from "react/jsx-runtime";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
export const SearchButton = ({ onClick }) => {
    const handleClick = (e) => {
        e.preventDefault(); // 기본 동작을 막음
        onClick(e); // 클릭 이벤트 처리
    };
    return (_jsx("div", { className: "searchbuttonContainer", children: _jsx(Flex, { wrap: true, gap: "small", children: _jsx(Button, { icon: _jsx(SearchOutlined, {}), href: "", onClick: handleClick }) }) }));
};
export default SearchButton;
//# sourceMappingURL=SearchButton.js.map