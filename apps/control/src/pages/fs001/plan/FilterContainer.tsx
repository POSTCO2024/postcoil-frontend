import { Dropdown } from '@postcoil/ui';

import styles from './FilterContainer.module.scss';

interface OptionType {
  value: string;
  label: string;
}

const FilterContainer = () => {
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

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown title="공정명" options={mockOptions} />
      </div>
    </div>
  );
};

export default FilterContainer;
