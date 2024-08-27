import { RedoOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Dropdown } from '@postcoil/ui';
import { Button } from '@postcoil/ui/components/atoms/Button';

import styles from './FilterContainer.module.scss';

interface dropDownOptionType {
  value: string;
  // label을 ReactNode로 지정하여 jsx형식 return이 가능케함
  label: React.ReactNode;
  icon?: React.ReactNode;
}

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

  const mockRollUnitName: dropDownOptionType[] = [
    {
      value: '1CAL001A',
      label: (
        <div>
          {/* 아이콘추가 부분 */}
          <RedoOutlined spin style={{ color: '#1677ff' }} />
          <span style={{ marginLeft: 10 }}>{'1CAL001A'}</span>
        </div>
      ),
      icon: <RedoOutlined />,
    },
    {
      value: '1CAL001B',
      label: (
        <div>
          <ClockCircleOutlined style={{ color: '#1677ff' }} />
          <span style={{ marginLeft: 10 }}>{'1CAL001B'}</span>
        </div>
      ),
      icon: <ClockCircleOutlined />,
    },
    {
      value: '1CAL002A',
      label: (
        <div>
          <ClockCircleOutlined style={{ color: '#1677ff' }} />
          <span style={{ marginLeft: 10 }}>{'1CAL002A'}</span>
        </div>
      ),
      icon: <ClockCircleOutlined />,
    },
    {
      value: '1CAL002B',
      label: (
        <div>
          <ClockCircleOutlined style={{ color: '#1677ff' }} />
          <span style={{ marginLeft: 10 }}>{'1CAL002B'}</span>
        </div>
      ),
      icon: <ClockCircleOutlined />,
    },
    {
      value: '1CAL003B',
      label: (
        <div>
          <ClockCircleOutlined style={{ color: '#1677ff' }} />
          <span style={{ marginLeft: 10 }}>{'1CAL003B'}</span>
        </div>
      ),
      icon: <ClockCircleOutlined />,
    },
    // Add more options...
  ];

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown title="공정명" options={mockOptions} />
        {/* TODO: Dropdown 데이터 변경, 함수 받게 */}
      </div>
      <Dropdown title="롤단위명" options={mockRollUnitName} />
      <Button text={'보급요구'} style={true} />
      <Button text={'reject'} style={true} />
      <Button text={'긴급정지'} style={true} />
      {/* <Button type="primary" onClick={handleSearch}>
        조회
      </Button> */}
    </div>
  );
};

export default FilterContainer;
