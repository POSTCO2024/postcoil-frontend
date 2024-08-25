import { Dropdown } from '@postcoil/ui';
// import { Button } from 'antd';

import styles from './FilterContainer.module.scss';

interface OptionType {
  value: string;
  label: string;
}

const FilterContainer = () => {
  // const handleSearch = () => {
  //   // TODO: API 호출
  // };

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
    // Add more options...
  ];

  const mockRollUnitName: OptionType[] = [
    { value: '1CAL001A', label: '1CAL001A' },
    { value: '1CAL001B', label: '1CAL001B' },
    { value: '1CAL002A', label: '1CAL002A' },
    { value: '1CAL002B', label: '1CAL002B' },
    // Add more options...
  ];
  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown title="공정명" options={mockOptions} />
        {/* TODO: Dropdown 데이터 변경, 함수 받게 */}
      </div>
      <Dropdown title="롤단위명" options={mockRollUnitName} />
      {/* <Button type="primary" onClick={handleSearch}>
        조회
      </Button> */}
    </div>
  );
};

export default FilterContainer;
