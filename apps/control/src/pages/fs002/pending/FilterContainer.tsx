import { Dropdown } from '@postcoil/ui';
import { useEffect, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { ScheduleInfoDTO } from '@/config/scheduling/DTO';
import { useScheduleStore, useMaterialStore } from '@/store/fs002store';

interface OptionType {
  value: string;
  label: string;
}

const FilterContainer = () => {
  const scheduleData = useScheduleStore(
    (state) => state.data as ScheduleInfoDTO[],
  ); // Schedule data 세팅
  const cleanScheduleData = useScheduleStore((state) => state.cleanData); // cleanData 함수 추가
  const cleanMaterialData = useMaterialStore((state) => state.cleanData); // cleanData 함수 추가
  const fetchScheduleData = useScheduleStore((state) => state.fetchData); // fetch Schedule data
  const fetchMaterialData = useMaterialStore((state) => state.fetchData); // fetch Material data

  // rollUnitName을 관리할 state 추가
  const [rollUnitOptions, setRollUnitOptions] = useState<OptionType[]>([]);
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

  const handleScheduleId = (value?: string[]) => {
    if (value && value[0] !== '') {
      fetchMaterialData(value[0]); // fetchData 함수 호출
      setSelectedRollUnit(value); // 선택된 롤 단위명 초기화
    } else {
      setSelectedRollUnit([]);
      cleanMaterialData();
    }
  };

  // 스케줄 데이터 변경 시 rollUnitName을 업데이트
  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      const newRollUnitOptions = scheduleData.map(
        (d: { id: string; scheduleNo: string }) => ({
          value: d.id,
          label: d.scheduleNo,
        }),
      );
      setRollUnitOptions(newRollUnitOptions);
    } else {
      setRollUnitOptions([]);
    }
    setSelectedRollUnit([]);
    cleanMaterialData(); // materialData를 null로 변경
  }, [cleanMaterialData, scheduleData]);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={options}
          onChange={handleProcessCode}
        />
      </div>
      <Dropdown
        title="스케줄명"
        options={rollUnitOptions}
        onChange={handleScheduleId}
        value={selectedRollUnit} // 선택된 롤 단위명 값을 Dropdown에 전달
      />
    </div>
  );
};

export default FilterContainer;
