import { SearchBar, Dropdown } from '@postcoil/ui';
import React from 'react';

import styles from './TopBar.module.scss';

// Dropdown 임의 데이터
const optionsDropdown = [
  {
    value: '1PCM',
    label: '1PCM',
  },
  {
    value: '2PCM',
    label: '2PCM',
  },
  {
    value: '1CAL',
    label: '1CAL',
  },
];

export const TopBar: React.FC = () => {
  return (
    <div className={styles.topbarContainer}>
      <div className={styles.dropdown}>
        <Dropdown title={'공정명'} options={optionsDropdown} />
      </div>
      <SearchBar />
    </div>
  );
};
