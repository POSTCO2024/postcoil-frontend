import { Dropdown } from '@postcoil/ui';

import styles from './FilterContainer.module.scss';

import { options } from '@/utils/scheduling/dropdownUtils';

interface PropsType {
  handleChange: (value?: string[]) => Promise<void>; // Dropdown change event handler function
}

const FilterContainer = ({ handleChange }: PropsType) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown title="공정명" options={options} onChange={handleChange} />
      </div>
    </div>
  );
};

export default FilterContainer;
