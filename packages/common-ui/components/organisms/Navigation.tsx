import type { MenuProps } from 'antd';
import { Menu, ConfigProvider } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './Navigation.module.scss';
import {
  NavigationProps,
  LevelKeysProps,
  getLevelKeys,
} from '../../utils/navigationUtils';

export const Navigation: React.FC<NavigationProps> = ({
  logo,
  human,
  menuItems,
  mappingKeys,
  isOperationSystem,
  employeeName = '신찬규',
  teamName = '관제팀',
}) => {
  const location = useLocation();
  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);

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

  function getKeyByPath(): string {
    const pathname = location.pathname;
    const mapping = mappingKeys!.find((item) => item!.path === pathname);
    return mapping!.key;
  }

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1,
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <div
      className={`${styles.navigationStyle} ${isOperationSystem ? styles.operationColor : ''}`}>
      <div className={styles.logoContainer}>
        <img src={logo} className={styles.logo} />
      </div>
      <ConfigProvider theme={menuTheme}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[getKeyByPath()]}
          selectedKeys={[getKeyByPath()]}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          style={{
            width: '90%',
            margin: '20px auto auto',
            border: 0,
            maxHeight: '70%',
            overflowY: 'auto',
          }}
          items={menuItems}
        />
      </ConfigProvider>
      <div className={styles.loginContainer}>
        <div className={styles.loginDiv}>
          <img src={human} />
          <div className={styles.loginInfo}>
            {employeeName} 사원
            <br />
            부서 : {teamName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
