import React from 'react';
import { Dropdown, SearchBar } from '@postcoil/ui';
import styles from './TopBar.module.scss';

export const TopBar: React.FC<{}> = () => {
  return (
    <div className={styles.topbarContainer}>
      <Dropdown title="공정" />
      <SearchBar />
    </div>
  );
};
