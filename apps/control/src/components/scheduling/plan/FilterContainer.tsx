import { Button, Dropdown } from '@postcoil/ui';

import styles from './FilterContainer.module.scss';

interface OptionType {
  value: string;
  label: string;
}

const FilterContainer = () => {
  // TODO: implement function
  const handleSearch = () => {};

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
    { value: '1P1_A0001', label: '1P1_A0001' },
    { value: '1P1_A0002', label: '1P1_A0002' },
    { value: '1P1_B0344', label: '1P1_B0344' },
    { value: '1P1_C0015', label: '1P1_C0015' },
    { value: '1P1_D0002', label: '1P1_D0002' },
    // Add more options...
  ];

  return (
    <div className={styles.filterContainer}>
      <Dropdown title="공정명" options={mockOptions} />
      {/* TODO: Dropdown 데이터 변경 */}
      <Dropdown title="롤단위명" options={mockRollUnitName} />
      <Button text="조회" onClick={handleSearch} />
    </div>
  );
};

export default FilterContainer;
