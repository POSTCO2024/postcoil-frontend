import { Dropdown } from '@postcoil/ui';
import { useEffect, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { OptionType } from '@/config/scheduling/dropdownConfig';
import { MaterialDTO, ScheduleInfoDTO } from '@/config/scheduling/dto';
import { useScheduleStore, useMaterialStore } from '@/store/fs002store';
import { options } from '@/utils/scheduling/dropdownUtils';

const FilterContainer = () => {
  const scheduleData = useScheduleStore(
    (state) => state.data as ScheduleInfoDTO[],
  ); // Schedule data 세팅
  const scheduleNo = useMaterialStore((state) => state.scheduleNo);
  const materialData = useScheduleStore((state) => state.data as MaterialDTO[]); // Schedule data 세팅
  const processCode = useScheduleStore((state) => state.processCode!); // processCode 세팅
  const cleanScheduleData = useScheduleStore((state) => state.cleanData!); // cleanData 함수 추가
  const cleanMaterialData = useMaterialStore((state) => state.cleanData!); // cleanData 함수 추가
  const fetchScheduleData = useScheduleStore((state) => state.fetchData!); // fetch Schedule data
  const fetchMaterialData = useMaterialStore((state) => state.fetchData!); // fetch Material data

  const [rollUnitOptions, setRollUnitOptions] = useState<OptionType[]>([]); // rollUnitName을 관리할 state 추가
  const [selectedRollUnit, setSelectedRollUnit] = useState<
    string[] | undefined
  >([]); // 선택된 롤 단위명 상태 추가
  const [selectedProcessCode, setSelectedProcessCode] = useState<string[]>([]); // 공정명 선택으로 인한 스케줄명 재세팅을 위한 상태
  const [isFirst, setIsFirst] = useState(true); // 첫 번째 렌더링인지 확인하기 위한 ref

  const handleProcessCode = (value?: string[]) => {
    if (value && value[0] !== '') {
      setRollUnitOptions([]);
      setSelectedRollUnit([]);
      fetchScheduleData(value);
    } else {
      cleanScheduleData();
    }
    setSelectedProcessCode(value!);
    cleanMaterialData();
  };

  const handleScheduleId = (value?: string[]) => {
    if (value && value[0] !== '') {
      fetchMaterialData(value);
      setSelectedRollUnit(value);
    } else {
      setSelectedRollUnit([]);
      cleanMaterialData();
    }
  };

  useEffect(() => {
    // 첫 화면 데이터 세팅 조건
    if (materialData && materialData.length > 0) {
      // fs002에서 Direct 되었을 경우
      const newRollUnitOptions = scheduleData.map((d) => ({
        value: d.id,
        label: d.scheduleNo,
      }));

      setRollUnitOptions(newRollUnitOptions);
      setSelectedProcessCode([processCode]);
      setSelectedRollUnit([scheduleNo!]);
    } else {
      // 처음 렌더링 되었을 경우
      setSelectedProcessCode(['1CAL']);
      fetchScheduleData(['1CAL']);
    }

    return () => {
      cleanScheduleData();
      cleanMaterialData();
    };
  }, []);

  useEffect(() => {
    if (scheduleData && scheduleData.length > 0) {
      const newRollUnitOptions = scheduleData.map(
        (d: { id: string; scheduleNo: string }) => ({
          value: d.id,
          label: d.scheduleNo,
        }),
      );
      setRollUnitOptions(newRollUnitOptions);

      if (isFirst) {
        // 처음 렌더링 했을 경우 기본 값 세팅
        setSelectedRollUnit([scheduleData[0].id]);
        fetchMaterialData([scheduleData[0].id]);
        setIsFirst(false);
      }
    } else {
      setRollUnitOptions([]);
      setSelectedRollUnit([]);
      cleanMaterialData();
    }
  }, [scheduleData]);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={options}
          onChange={handleProcessCode}
          value={selectedProcessCode}
        />
      </div>
      <Dropdown
        title="스케줄명"
        options={rollUnitOptions}
        onChange={handleScheduleId}
        value={selectedRollUnit} // 선택된 스케줄명 값을 Dropdown에 전달
      />
    </div>
  );
};

export default FilterContainer;
