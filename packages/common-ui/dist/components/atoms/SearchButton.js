import { jsx as _jsx } from "react/jsx-runtime";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
export const SearchButton = () => {
    return (_jsx("div", { className: "searchbuttonContainer", children: _jsx(Flex, { wrap: true, gap: "small", children: _jsx(Button, { icon: _jsx(SearchOutlined, {}), href: "" }) }) }));
};
export default SearchButton;
//# sourceMappingURL=SearchButton.js.map