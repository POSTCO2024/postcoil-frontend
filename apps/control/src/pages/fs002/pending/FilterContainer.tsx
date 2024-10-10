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
  // const isFirst = useRef(true);

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
  // useEffect(() => {
  //   return () => {
  //     console.log('페이지 떠나기');
  //     cleanScheduleData();
  //     cleanMaterialData();
  //   };
  // }, []);
  useEffect(() => {
    console.log('---처음 filter 시작----');
    console.log('materialData', materialData);
    console.log('scheduleData', scheduleData);
    console.log('---처음 filter 끝----');
    if (!scheduleData || scheduleData.length === 0) {
      //  기본값 세팅
      const initializeData = async () => {
        setSelectedProcessCode(['1CAL']);
        await fetchScheduleData(['1CAL']);
      };
      initializeData();
      console.log('기본값 세팅');
    }
    // return () => {
    //   console.log('페이지 떠나기');
    //   cleanScheduleData();
    //   cleanMaterialData();
    // };
  }, []); // scheduleData 및 materialData가 변경될 때만 실행

  useEffect(() => {
    console.log(materialData, scheduleData);
    if (scheduleData && scheduleData.length > 0 && !materialData) {
      console.log('scheduleData');
      setRollUnitOptions(
        scheduleData.map((d) => ({ value: d.id, label: d.scheduleNo })),
      );
      setSelectedProcessCode([processCode]);
      setSelectedRollUnit([scheduleData[0].scheduleNo]);
      fetchMaterialData([scheduleData[0].id]);
    } else if (
      scheduleData &&
      scheduleData.length > 0 &&
      materialData &&
      materialData.length > 0
    ) {
      console.log('materialData');
      console.log(processCode, scheduleNo);
      setRollUnitOptions(
        scheduleData.map((d) => ({ value: d.id, label: d.scheduleNo })),
      );
      setSelectedProcessCode([processCode]);
      setSelectedRollUnit([scheduleNo]);
    } else {
      console.log('sch.. 3');
      console.log('materialData', materialData);
      console.log('scheduleData', scheduleData);
      console.log('--------------');
      // setRollUnitOptions([]);
      // setSelectedRollUnit([]);
      // cleanMaterialData();
    }
  }, [scheduleData]); // scheduleData가 변경될 때마다 실행

  useEffect(() => {
    console.log('materialData', materialData);
    // if (materialData && materialData.length > 0) {
    //   console.log('materialData', materialData);
    //   setRollUnitOptions(
    //     materialData.map((d) => ({ value: d.id, label: d.materialName })),
    //   );
    // } else {
    //   setRollUnitOptions([]);
    // }
  }, [materialData]);

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
