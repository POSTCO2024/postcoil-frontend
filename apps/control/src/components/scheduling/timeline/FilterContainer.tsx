import { DatePicker, Dropdown } from '@postcoil/ui';

import styles from './FilterContainer.module.scss';

// interface PropsType {
//   process: {
//     title: string; // 공정명
//     options: string[]; // ['1CAL', '2CAL', 'EGL']
//   };

interface OptionType {
  value: string;
  label: string;
}

const FilterContainer = () => {
  // const handleSearch = () => {};
  // const handleFilter = () => {};
  // TODO: filtering

  // TODO: fetch DATA
  const mockOptions: OptionType[] = [
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
    {
      value: '2CAL',
      label: '2CAL',
    },
    {
      value: '1EGL',
      label: '1EGL',
    },
    // Add more options...
  ];
  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown title="공정명" options={mockOptions} />
        {/* TODO: Dropdown 데이터 변경, 함수 받게 */}
      </div>
      <div className={styles.datepicker}>
        <DatePicker />
      </div>
      {/* <Button text="조회" onClick={handleSearch} /> */}
      {/* <SearchBar /> */}
      {/* TODO: searchbar 함수 받게! */}
      {/* <Button text="검색" onClick={handleFilter} /> */}
    </div>
  );
};

export default FilterContainer;
