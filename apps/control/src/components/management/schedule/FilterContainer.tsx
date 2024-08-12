import { Dropdown, SearchBar, Button } from '@postcoil/ui';
import react from 'react';

import styles from './FilterContainer.module.scss';

interface PropsType {
  process: {
    title: string; // 공정명
    options: string[]; // ['1CAL', '2CAL', 'EGL']
  };

  handleSearch: () => void; // function to handle search button click event
}

const FilterContainer = () => {
  const handleSearch = () => {};
  const handleFilter = () => {};

  return (
    <div className={styles.filterContainer}>
      <Dropdown title="공정명" />
      {/* TODO: Dropdown 데이터 변경 */}
      <Button text="조회" onClick={handleSearch} />
      <SearchBar />
      <Button text="검색" onClick={handleFilter} />
    </div>
  );
};

export default FilterContainer;
