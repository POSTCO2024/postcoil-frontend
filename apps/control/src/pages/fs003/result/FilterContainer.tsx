import { CheckCircleFilled, SyncOutlined } from '@ant-design/icons';
import { Dropdown } from '@postcoil/ui';
// import { Button } from 'antd';
import { DropdownColor } from '@postcoil/ui';
import { ReactNode } from 'react';

import styles from './FilterContainer.module.scss';

interface OptionType {
  value: string;
  label: string;
  icon?: React.ReactNode;
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
    { value: '1P1_A0001', label: '1P1_A0001', icon: <CheckCircleFilled /> },
    { value: '1P1_A0002', label: '1P1_A0002', icon: <CheckCircleFilled /> },
    { value: '1P1_B0344', label: '1P1_B0344', icon: <CheckCircleFilled /> },
    { value: '1P1_C0015', label: '1P1_C0015', icon: <SyncOutlined spin /> },
    { value: '1P1_D0002', label: '1P1_D0002', icon: <SyncOutlined spin /> },
    // Add more options...
  ];
  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown title="공정명" options={mockOptions} />
        {/* TODO: Dropdown 데이터 변경, 함수 받게 */}
      </div>
      <Dropdown title="롤단위명" options={mockRollUnitName} />
      <DropdownColor title="야호" options={mockRollUnitName} />
      {/* <Button type="primary" onClick={handleSearch}>
        조회
      </Button> */}
    </div>
  );
};

export default FilterContainer;
