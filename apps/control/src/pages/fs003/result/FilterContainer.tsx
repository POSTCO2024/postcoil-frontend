import { RedoOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Dropdown } from '@postcoil/ui';
import { useEffect, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { ScheduleInfoDTO } from '@/config/scheduling/DTO';
import { useScheduleStore } from '@/store/fs003store';

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
  const scheduleData = useScheduleStore(
    (state) => state.data as ScheduleInfoDTO[],
  ); // Schedule data 세팅
  const cleanScheduleData = useScheduleStore((state) => state.cleanData); // cleanData 함수 추가
  const fetchScheduleData = useScheduleStore((state) => state.fetchData); // fetch Schedule data
  // const fetchMaterialData = useMaterialStore((state) => state.fetchData); // fetch Material data

  // rollUnitName을 관리할 state 추가
  const [rollUnitOptions, setRollUnitOptions] = useState<dropDownOptionType[]>(
    [],
  );
  const [selectedRollUnit, setSelectedRollUnit] = useState<
    string[] | undefined
  >([]); // 선택된 롤 단위명 상태 추가

  const options: OptionType[] = [
    {
      value: '1CAL',
      label: '1CAL',
    },
    {
      value: '2CAL',
      label: '2CAL',
    },
  ];

  const handleProcessCode = (value?: string[]) => {
    if (value && value[0] !== '') {
      setRollUnitOptions([]); // rollUnitName 초기화
      fetchScheduleData(value[0]); // fetchData 함수 호출
    } else {
      cleanScheduleData();
    }
  };

  // 스케줄 데이터 변경 시 rollUnitName을 업데이트
  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      const newRollUnitOptions = scheduleData.map(
        (d: { id: string; scheduleNo: string; workStatus?: string }) => {
          let icon = null;
          const color = '#1677ff'; // 공통 색상

          // workStatus에 따라 아이콘 설정
          if (d.workStatus === 'IN_PROGRESS') {
            icon = <RedoOutlined spin style={{ color }} />;
          } else if (d.workStatus === 'PENDING') {
            icon = <ClockCircleOutlined style={{ color }} />;
          }

          return {
            value: d.id,
            label: (
              <div>
                {icon}
                <span style={{ marginLeft: 10 }}>{d.scheduleNo}</span>
              </div>
            ),
            icon,
          };
        },
      );
      setRollUnitOptions(newRollUnitOptions);
    } else {
      setRollUnitOptions([]);
    }
    setSelectedRollUnit([]);
  }, [scheduleData]);

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
        <Dropdown
          title="공정명"
          options={options}
          onChange={handleProcessCode}
        />
        {/* TODO: Dropdown 데이터 변경, 함수 받게 */}
      </div>
      <Dropdown
        title="스케줄명"
        options={rollUnitOptions ? rollUnitOptions : mockRollUnitName}
        value={selectedRollUnit}
      />
    </div>
  );
};

export default FilterContainer;
