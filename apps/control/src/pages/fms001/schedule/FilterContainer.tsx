import { Dropdown } from '@postcoil/ui';

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
const rollOptions: OptionType[] = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'B',
    label: 'B',
  },
];

const FilterContainer = () => {
  // const handleSearch = () => {};
  // const handleFilter = () => {};
  // TODO: filtering

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown title="공정명" options={mockOptions} />
        {/* TODO: Dropdown 데이터 변경, 함수 받게 */}
      </div>
      {/* <Button text="조회" onClick={handleSearch} /> */}
      <Dropdown title="롤 단위" options={rollOptions} />
      {/* TODO: searchbar 함수 받게! */}
      {/* <Button text="검색" onClick={handleFilter} /> */}
    </div>
  );
};

export default FilterContainer;
