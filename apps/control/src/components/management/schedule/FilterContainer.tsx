import { Dropdown, SearchBar, Button } from '@postcoil/ui';

import styles from './FilterContainer.module.scss';

interface OptionType {
  value: string;
  label: string;
}

// TODO: fetch DATA
const mockOptions: OptionType[] = [
  {
    value: '1CAL',
    label: '1CAL',
  },
  {
    value: '2CAL',
    label: '2CAL',
  },
];

const FilterContainer = () => {
  const handleSearch = () => {};
  const handleFilter = () => {};
  // TODO: filtering

  return (
    <div className={styles.filterContainer}>
      <Dropdown title="공정명" options={mockOptions} />
      {/* TODO: Dropdown 데이터 변경 */}
      <Button text="조회" onClick={handleSearch} />
      <SearchBar />
      <Button text="검색" onClick={handleFilter} />
    </div>
  );
};

export default FilterContainer;
