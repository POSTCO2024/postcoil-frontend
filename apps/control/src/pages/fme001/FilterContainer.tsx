import { Dropdown } from '@postcoil/ui';

import styles from './FilterContainer.module.scss';

interface OptionType {
  value: string;
  label: string;
}

const FilterContainer = ({ progress, handleFilter }: any) => {
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
    {
      value: '2EGL',
      label: '2EGL',
    },
    {
      value: '1CGL',
      label: '1CGL',
    },
    {
      value: '2CGL',
      label: '2CGL',
    },
    // Add more options...
  ];
  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={mockOptions}
          value={progress}
          onChange={handleFilter}
        />
      </div>
    </div>
  );
};

export default FilterContainer;
