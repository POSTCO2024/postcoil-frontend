import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, ConfigProvider } from 'antd';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';
import { getLevelKeys, } from '../../utils/navigationUtils';
export const Navigation = ({ logo, human, menuItems, mappingKeys, isOperationSystem, }) => {
    const location = useLocation();
    const levelKeys = getLevelKeys(menuItems);
    const [stateOpenKeys, setStateOpenKeys] = useState(['11']);
    const menuTheme = isOperationSystem
        ? {
            components: {
                Menu: {
                    itemBg: '#f2f6f1',
                    itemColor: '#0A290A',
                    itemSelectedBg: '#C9E7C9',
                    itemHoverColor: '#0A290A',
                    subMenuItemBg: '#f2f6f1',
                    itemBorderRadius: 15,
                    itemMarginInline: 5,
                },
            },
        }
        : {
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
    function getKeyByPath() {
        const pathname = location.pathname;
        const mapping = mappingKeys.find((item) => item.path === pathname);
        return mapping.key;
    }
    const onOpenChange = (openKeys) => {
        console.log(openKeys);
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
    return (_jsxs("div", { className: `${styles.navigationStyle} ${isOperationSystem ? styles.operationColor : ''}`, children: [_jsx("div", { className: styles.logoContainer, children: _jsx("img", { src: logo, className: styles.logo }) }), _jsx(ConfigProvider, { theme: menuTheme, children: _jsx(Menu, { mode: "inline", defaultSelectedKeys: [getKeyByPath()], selectedKeys: [getKeyByPath()], openKeys: stateOpenKeys, onOpenChange: onOpenChange, style: {
                        width: '90%',
                        margin: '20px auto auto',
                        border: 0,
                        maxHeight: '70%',
                        overflowY: 'auto',
                    }, items: menuItems }) }), _jsx("div", { className: styles.loginContainer, children: _jsxs("div", { className: styles.loginDiv, children: [_jsx("img", { src: human }), _jsxs("div", { className: styles.loginInfo, children: ["\uC2E0\uCC2C\uADDC \uC0AC\uC6D0", _jsx("br", {}), "\uBD80\uC11C : \uAD00\uC81C\uD300"] })] }) })] }));
};
export default Navigation;
//# sourceMappingURL=Navigation.js.map