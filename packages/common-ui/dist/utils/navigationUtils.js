import { jsx as _jsx } from "react/jsx-runtime";
import { MailOutlined, AppstoreOutlined, SettingOutlined, } from '@ant-design/icons';
import { Link } from 'react-router-dom';
export const items = [
    {
        key: '1',
        icon: _jsx(MailOutlined, {}),
        label: '작업 대상재 편성',
        children: [
            { key: '11', label: _jsx(Link, { to: "/button1", children: "\uACF5\uC815\uBCC4 \uC791\uC5C5 \uB300\uC0C1\uC7AC \uAD00\uB9AC" }) },
            { key: '12', label: _jsx(Link, { to: "/button2", children: "\uACF5\uC815\uBCC4 \uC5D0\uB7EC\uC7AC \uAD00\uB9AC" }) },
            { key: '13', label: '공장별 수급량 관리' },
            { key: '14', label: '공장별 작업대상재 분석' },
        ],
    },
    {
        key: '2',
        icon: _jsx(AppstoreOutlined, {}),
        label: '작업 스케줄 편성',
        children: [
            { key: '21', label: 'Schedule 편성' },
            { key: '22', label: 'Schedule 편성관리' },
            { key: '23', label: 'Schedule 이력관리' },
        ],
    },
    {
        key: '3',
        icon: _jsx(SettingOutlined, {}),
        label: '기준 관리',
        children: [
            { key: '31', label: '대상재 추출기준 관리' },
            { key: '32', label: '스케줄 기준관리' },
        ],
    },
];
export const getLevelKeys = (items1) => {
    const key = {};
    const func = (items2, level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
//# sourceMappingURL=navigationUtils.js.map