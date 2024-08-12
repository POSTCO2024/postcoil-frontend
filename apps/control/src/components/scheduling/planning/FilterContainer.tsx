import { Button, Dropdown, SearchBar } from '@postcoil/ui';
import React from 'react';

import styles from './FilterContainer.module.scss';

const FilterContainer = () => {
  // TODO: implement function
  const handleSearch = () => {};
  const handleFilter = () => {};

  return (
    <div className={styles.filterContainer}>
      <Dropdown title="공정명" />
      {/* TODO: Dropdown 데이터 변경 */}
      <Dropdown title="롤단위명" />
      <Button text="조회" onClick={handleSearch} />
      <SearchBar />
      <Button text="검색" onClick={handleFilter} />
    </div>
  );
};

export default FilterContainer;
