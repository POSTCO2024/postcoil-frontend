import { Dropdown } from '@postcoil/ui';

import styles from './FilterContainer.module.scss';

import { options } from '@/utils/scheduling/dropdownUtils';

interface PropsType {
  value?: string[];
  handleChange: (value?: string[]) => Promise<void>; // Dropdown change event handler function
}

const FilterContainer = ({ value, handleChange }: PropsType) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={options}
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default FilterContainer;
