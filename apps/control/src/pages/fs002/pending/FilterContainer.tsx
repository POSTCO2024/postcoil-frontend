import { Dropdown } from '@postcoil/ui';
import { useEffect, useRef, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { OptionType } from '@/config/scheduling/dropdownConfig';
import { MaterialDTO, ScheduleInfoDTO } from '@/config/scheduling/dto';
import { useScheduleStore, useMaterialStore } from '@/store/fs002store';
import { options } from '@/utils/scheduling/dropdownUtils';

const FilterContainer = () => {
  const scheduleData = useScheduleStore(
    (state) => state.data as ScheduleInfoDTO[],
  ); // Schedule data 세팅
  const processCode = useScheduleStore((state) => state.processCode!); // processCode 세팅
  const scheduleNo = useMaterialStore((state) => state.scheduleNo!);
  const materialData = useMaterialStore((state) => state.data as MaterialDTO[]); // Schedule data 세팅
  const cleanScheduleData = useScheduleStore((state) => state.cleanData!); // cleanData 함수 추가
  const cleanMaterialData = useMaterialStore((state) => state.cleanData!); // cleanData 함수 추가
  const fetchScheduleData = useScheduleStore((state) => state.fetchData!); // fetch Schedule data
  const fetchMaterialData = useMaterialStore((state) => state.fetchData!); // fetch Material data

  const [rollUnitOptions, setRollUnitOptions] = useState<OptionType[]>([]); // rollUnitName을 관리할 state 추가
  const [selectedRollUnit, setSelectedRollUnit] = useState<string[]>([]); // 선택된 롤 단위명 상태 추가
  const [selectedProcessCode, setSelectedProcessCode] = useState<string[]>([]); // 공정명 선택으로 인한 스케줄명 재세팅을 위한 상태
  // const [isFirst, setIsFirst] = useState(true); // 첫 번째 렌더링인지 확인하기 위한 ref
  const isFirst = useRef(true);

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
    if (isFirst.current) {
      if (scheduleData && scheduleData.length > 0) {
        // Schedule data가 있을 경우
      } else {
        // 기본값 세팅

        const initializeData = async () => {
          setSelectedProcessCode(['1CAL']);
          await fetchScheduleData(['1CAL']);
        };
        initializeData();
      }
    }

    // Cleanup 함수
    return () => {
      cleanScheduleData();
      cleanMaterialData();
      isFirst.current = true;
    };
  }, []); // scheduleData 및 materialData가 변경될 때만 실행

  useEffect(() => {
    if (isFirst && scheduleData && scheduleData.length > 0) {
      const newRollUnitOptions = scheduleData.map((d) => ({
        value: d.id,
        label: d.scheduleNo,
      }));
      setRollUnitOptions(newRollUnitOptions);
      if (materialData && materialData.length > 0) {
        setRollUnitOptions(
          scheduleData.map((d) => ({ value: d.id, label: d.scheduleNo })),
        );
        setSelectedRollUnit([scheduleNo]);
        setSelectedProcessCode([processCode]);
        return;
      } else {
        setSelectedRollUnit([scheduleData[0].scheduleNo]);
        fetchMaterialData([scheduleData[0].id]);
      }

      isFirst.current = false;
    } else if (!isFirst.current && scheduleData && scheduleData.length > 0) {
      if (materialData && materialData.length > 0) {
        setRollUnitOptions(
          scheduleData.map((d) => ({ value: d.id, label: d.scheduleNo })),
        );
      }
    }
  }, [scheduleData]); // scheduleData가 변경될 때마다 실행

  // useEffect(() => {
  //   console.log('useEffect 첫 렌더링시');
  //   if (scheduleData && scheduleData.length > 0) {
  //     if (materialData && materialData.length > 0) {
  //       console.log('Schedule data와 Material data가 모두 있을 경우');
  //       // Schedule data와 Material data가 모두 있을 경우
  //       setRollUnitOptions(
  //         scheduleData.map((d) => ({ value: d.id, label: d.scheduleNo })),
  //       );
  //       console.log('Schedule data', scheduleNo, processCode);
  //       setSelectedRollUnit([scheduleNo]);
  //       setSelectedProcessCode([processCode]);

  //       setIsFirst(false);
  //     }
  //   } else {
  //     // 기본값 세팅
  //     const initializeData = async () => {
  //       setSelectedProcessCode(['1CAL']);
  //       await fetchScheduleData(['1CAL']);
  //     };
  //     initializeData();
  //   }
  //   console.log(scheduleData);

  //   return () => {
  //     cleanScheduleData();
  //     cleanMaterialData();
  //   };
  // }, []); // 컴포넌트 마운트 시 실행

  // useEffect(() => {
  //   if (isFirst) {
  //     if (scheduleData && (!materialData || materialData.length === 0)) {
  //       const newRollUnitOptions = scheduleData.map((d) => ({
  //         value: d.id,
  //         label: d.scheduleNo,
  //       }));
  //       setRollUnitOptions(newRollUnitOptions);
  //       setSelectedRollUnit([scheduleData[0].scheduleNo]);
  //       fetchMaterialData([scheduleData[0].id]);
  //       setIsFirst(false);
  //     }
  //   } else {
  //     setRollUnitOptions([]);
  //     setSelectedRollUnit([]);
  //     cleanMaterialData();
  //   }
  // }, [scheduleData]); // scheduleData가 변경될 때마다 실행

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
