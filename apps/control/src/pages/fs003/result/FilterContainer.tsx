import { RedoOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Dropdown } from '@postcoil/ui';
import { useEffect, useState } from 'react';

import styles from './FilterContainer.module.scss';

import { dropDownOptionType } from '@/config/scheduling/dropdownConfig';
import { ClientDTO } from '@/config/scheduling/dto';
import { useWorkInstructionStore } from '@/store/fs003store';
import { options } from '@/utils/scheduling/dropdownUtils';
import { mockRollUnitName } from '@/utils/scheduling/MockDropdown';

const FilterContainer = () => {
  const fetchData = useWorkInstructionStore((state) => state.fetchData!);
  const selectedProcessCode = useWorkInstructionStore(
    (state) => state.processCode!,
  );
  const setData = useWorkInstructionStore(
    (state) => state.setData!, // processCode 업데이트 함수
  );
  const selectedData = useWorkInstructionStore((state) =>
    selectedProcessCode !== ''
      ? selectedProcessCode === '1CAL'
        ? (state.data as ClientDTO[])
        : (state.data2 as ClientDTO[])
      : null,
  );

  // const prevSelectedProcessCode = useScheduleStore(
  //   (state) => state.processCode!,
  // );

  const [scheduleNoList, setScheduleNoList] = useState<dropDownOptionType[]>(
    [],
  );
  // 선택된 processCode에 따라 fetch 해 온 옵션 생성

  const [processCode, setProcessCode] = useState<string[]>([
    selectedProcessCode !== '' ? selectedProcessCode : '1CAL',
  ]);

  const [selectedRollUnitName, setSelectedRollUnitName] = useState<string[]>(
    [],
  );

  const generateDynamicRollUnitOptions = (
    data: ClientDTO[],
  ): dropDownOptionType[] => {
    return data.map((client) => {
      const scheduleNo = client.workInstructions.scheduleNo;
      const schStatus = client.workInstructions.schStatus;

      return {
        value: scheduleNo,
        label: (
          <div>
            {schStatus === 'IN_PROGRESS' ? (
              <RedoOutlined spin style={{ color: '#1677ff' }} />
            ) : (
              <ClockCircleOutlined style={{ color: '#1677ff' }} />
            )}
            <span style={{ marginLeft: 10 }}>{scheduleNo}</span>
          </div>
        ),
        icon:
          schStatus === 'IN_PROGRESS' ? (
            <RedoOutlined />
          ) : (
            <ClockCircleOutlined />
          ),
      };
    });
  };
  // 처음 렌더링될 때 데이터 fetch 및 WebSocket으로부터 데이터 변경 시 재렌더링
  // useEffect(() => {
  //   if (!selectedData || selectedData.length === 0) {
  //     fetchData(processCode); // 기본 processCode로 fetch
  //   }

  //   return () => {
  //     useWorkInstructionStore.setState((state) => ({
  //       ...state,
  //       processCode: '',
  //       data: null,
  //       data2: null,
  //       workItems: null,
  //     }));
  //   };
  // }, []);

  // // WebSocket이나 fetch 이후 selectedData가 변경되면 필터링 및 렌더링
  // useEffect(() => {
  //   if (selectedData && selectedData.length > 0) {
  //     console.log('selectedData: ', selectedData);
  //     setScheduleNoList(generateDynamicRollUnitOptions(selectedData));
  //     setSelectedRollUnitName([selectedData[0].workInstructions.scheduleNo]);
  //   }
  // }, [selectedData]);

  // ver_241010
  // useEffect(() => {
  //   if (selectedData && selectedData.length > 0) {
  //     console.log('selectedData: ', selectedData);
  //     // setProcessCode([
  //     //   selectedProcessCode !== '' ? selectedProcessCode : '1CAL',
  //     // ]);
  //     setScheduleNoList(generateDynamicRollUnitOptions(selectedData));
  //     setSelectedRollUnitName([selectedData[0].workInstructions.scheduleNo]);
  //   } else if (!selectedData) {
  //     setProcessCode(['1CAL']);
  //     fetchData(['1CAL']);
  //   }
  // }, [selectedData]);

  useEffect(() => {
    if (selectedData && selectedData.length > 0) {
      setProcessCode([
        selectedProcessCode !== '' ? selectedProcessCode : '1CAL',
      ]);
      setScheduleNoList(generateDynamicRollUnitOptions(selectedData));
      setSelectedRollUnitName([selectedData[0].workInstructions.scheduleNo]);
    } else {
      setProcessCode([]);
      setSelectedRollUnitName([]);
    }

    console.log('filtercontainer3', selectedData);
  }, [selectedData]);

  const handleProcessCode = (value?: string[]) => {
    if (value && value[0] !== '') {
      setProcessCode(value);
      setSelectedRollUnitName([]);
      fetchData(value); // fetchData 함수 호출
    } else if (value) {
      setProcessCode(value);
    }
    // setSelectedRollUnitName([]);
  };

  const handleRollUnitChange = (value?: string[]) => {
    if (value && value[0] !== '') {
      setSelectedRollUnitName(value);
      setData(
        selectedData!.filter(
          (item) => item.workInstructions.scheduleNo === value[0],
        )[0],
      );
    } else {
      setSelectedRollUnitName([]);
    }
  };

  // useEffect(() => {
  //   if (selectedData && selectedData.length > 0) {
  //     setProcessCode([
  //       selectedProcessCode !== ''
  //         ? selectedProcessCode
  //         : prevSelectedProcessCode,
  //     ]);
  //     setScheduleNoList(generateDynamicRollUnitOptions(selectedData));
  //     setSelectedRollUnitName([selectedData[0].workInstructions.scheduleNo]);
  //   } else if (!selectedData && selectedData === 0) {
  //     setProcessCode([prevSelectedProcessCode]);
  //     setSelectedRollUnitName([]);
  //   } else {
  //     setProcessCode(['1CAL']);
  //     setSelectedRollUnitName([]);
  //   }

  //   console.log('filtercontainer3', selectedData);
  // }, [selectedData]);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.dropdown}>
        <Dropdown
          title="공정명"
          options={options}
          onChange={handleProcessCode}
          value={processCode}
        />
      </div>
      <Dropdown
        title="스케줄명"
        options={selectedData ? scheduleNoList : mockRollUnitName}
        value={selectedRollUnitName}
        onChange={handleRollUnitChange} // 스케줄 선택 시 데이터 매핑 처리
      />
    </div>
  );
};

export default FilterContainer;
