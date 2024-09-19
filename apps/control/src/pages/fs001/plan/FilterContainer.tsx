import { Dropdown } from '@postcoil/ui';

import styles from './FilterContainer.module.scss';

interface OptionType {
  value: string;
  label: string;
}

interface PropsType {
  handleChange: (value?: string[]) => Promise<void>; // Dropdown change event handler function
}

const FilterContainer = ({ handleChange }: PropsType) => {
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

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={mockOptions}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FilterContainer;
