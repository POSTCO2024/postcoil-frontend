import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, ConfigProvider } from 'antd';
import { useState } from 'react';
import styles from './Navigation.module.css';
import { getLevelKeys, items, } from '../../utils/navigationUtils';
const levelKeys = getLevelKeys(items);
export const Navigation = ({ logo, human }) => {
    const [stateOpenKeys, setStateOpenKeys] = useState(['1', '11']);
    const menuTheme = {
        components: {
            Menu: {
                itemBg: '#EFF4FF',
                itemColor: '#09090A',
                itemSelectedBg: '#E0E7FF',
                itemHoverColor: '#09090A',
                subMenuItemBg: '#EFF4FF',
                itemBorderRadius: 15,
                itemMarginInline: 5,
            },
        },
    };
    const onOpenChange = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
            setStateOpenKeys(openKeys
                // remove repeat key
                .filter((_, index) => index !== repeatIndex)
                // remove current level all child
                .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]));
        }
        else {
            // close
            setStateOpenKeys(openKeys);
        }
    };
    return (_jsxs("div", { className: styles.navigation_style, children: [_jsx("div", { style: { display: 'flex', justifyContent: 'center' }, children: _jsx("img", { src: logo, className: styles.logo }) }), _jsx(ConfigProvider, { theme: menuTheme, children: _jsx(Menu, { mode: "inline", defaultSelectedKeys: ['231'], openKeys: stateOpenKeys, onOpenChange: onOpenChange, style: { width: 256, margin: '20px auto auto' }, items: items }) }), _jsx("div", { style: {
                    height: 100,
                    width: '100%',
                }, children: _jsxs("div", { className: styles.login_div, children: [_jsx("img", { src: human }), _jsxs("div", { className: styles.login_info, children: ["\uC2E0\uCC2C\uADDC \uC0AC\uC6D0", _jsx("br", {}), "\uBD80\uC11C : \uAD00\uC81C\uD300"] })] }) })] }));
};
export default Navigation;
//# sourceMappingURL=Navigation.js.map