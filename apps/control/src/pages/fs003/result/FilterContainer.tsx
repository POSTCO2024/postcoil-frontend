import {
  CheckCircleFilled,
  SyncOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Dropdown } from '@postcoil/ui';
// import { Button } from 'antd';

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
      value: '1P1_A0001',
      label: (
        <div>
          {/* 아이콘추가 부분 */}
          <CheckCircleFilled style={{ color: 'green' }} />
          <span style={{ marginLeft: 10 }}>{'1P1_A0001'}</span>
        </div>
      ),
      icon: <CheckCircleFilled />,
    },
    {
      value: '1P1_A0002',
      label: (
        <div>
          <CheckCircleFilled style={{ color: 'green' }} />
          <span style={{ marginLeft: 10 }}>{'1P1_A0002'}</span>
        </div>
      ),
      icon: <CheckCircleFilled />,
    },
    {
      value: '1P1_B0344',
      label: (
        <div>
          <CheckCircleFilled style={{ color: 'green' }} />
          <span style={{ marginLeft: 10 }}>{'1P1_B0344'}</span>
        </div>
      ),
      icon: <CheckCircleFilled />,
    },
    {
      value: '1P1_C0015',
      label: (
        <div>
          <FormOutlined style={{ color: '#1677ff' }} />
          <span style={{ marginLeft: 10 }}>{'1P1_B0001'}</span>
        </div>
      ),
      icon: <SyncOutlined spin />,
    },
    {
      value: '1P1_D0002',
      label: (
        <div>
          <SyncOutlined spin style={{ color: '#1677ff' }} />
          <span style={{ marginLeft: 10 }}>{'1P1_D0002'}</span>
        </div>
      ),
      icon: <SyncOutlined spin />,
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
      {/* <Button type="primary" onClick={handleSearch}>
        조회
      </Button> */}
    </div>
  );
};

export default FilterContainer;
