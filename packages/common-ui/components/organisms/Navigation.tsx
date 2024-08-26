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
}) => {
  const location = useLocation();
  const levelKeys = getLevelKeys(menuItems as LevelKeysProps[]);
  const [stateOpenKeys, setStateOpenKeys] = useState(['11']);
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
    <div className={styles.navigation_style}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={logo} className={styles.logo} />
      </div>
      <ConfigProvider theme={menuTheme}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[getKeyByPath()]}
          selectedKeys={[getKeyByPath()]}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          style={{ width: '90%', margin: '20px auto auto', border: 0 }}
          items={menuItems}
        />
      </ConfigProvider>
      <div
        style={{
          height: 100,
          width: '100%',
        }}>
        <div className={styles.login_div}>
          <img src={human} />
          <div className={styles.login_info}>
            신찬규 사원
            <br />
            부서 : 관제팀
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
