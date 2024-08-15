import { SearchBar, Dropdown } from '@postcoil/ui';
import React from 'react';

import styles from './TopBar.module.scss';

export const TopBar: React.FC = () => {
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.dropdown}>
        <Dropdown title="공정" />
      </div>
      <SearchBar />
    </div>
  );
};
